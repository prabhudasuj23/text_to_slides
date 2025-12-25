
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, Presentation, Slide, VisualPrompt } from "../types";
import { COGNITIVE_ARCHITECT_INSTRUCTION } from "./systemInstructions";
import { PROMPT_TRAINING_EXAMPLES } from "./promptTrainingData";

// Helper to clean JSON if model returns markdown
const cleanJson = (text: string) => {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
};

// --- Layer 1: Semantic Understanding ---

export const generateStructure = async (input: UserInput, apiKey?: string): Promise<Presentation> => {
  const key = apiKey || process.env.API_KEY;
  if (!key) throw new Error("API Key is missing. Please configure it in Settings.");
  
  const ai = new GoogleGenAI({ apiKey: key });

  // Gemini 3 Pro for complex reasoning
  const modelId = "gemini-3-pro-preview"; 

  const prompt = `
You are an expert presentation strategist and technical content architect. 
Your task: Transform a raw presentation topic into a structured, audience-centric slide blueprint.

INPUT TOPIC: ${input.topic}
TARGET AUDIENCE: ${input.audience}
DESIRED TONE: ${input.tone}
STYLE: ${input.style}
NUMBER OF SLIDES: ${input.numberOfSlides}
ADDITIONAL CONTEXT: ${input.context || 'None'}

CRITICAL REQUIREMENTS:
1. Create EXACTLY ${input.numberOfSlides} slides.
2. Each slide MUST have a semantic_description explaining WHY this visual matters.
3. **If the style is 'Technical' or 'Engineering':**
   - The visuals MUST be **diagrammatic** (e.g., "Exploded view of turbine," "Cross-section of fuselage," "Circuit schematic").
   - Avoid generic descriptions like "A photo of a plane." Be specific: "Side profile cutaway of Boeing 737 fuselage showing pressure bulkheads."
   - Identify specific mechanical or structural components to label.
4. Return ONLY valid JSON.

OUTPUT FORMAT (JSON schema):
{
  "presentation_title": "string",
  "slides": [
    {
      "slide_number": number,
      "title": "string",
      "content": "string (bullet points or paragraph)",
      "type": "title_intro|content|comparison|timeline|summary",
      "semantic_description": {
        "purpose": "string",
        "key_message": "string",
        "audience_relevance": "string",
        "visual_story": "string (Crucial: Describe the exact type of technical diagram required)",
        "color_mood": "string",
        "complexity_level": "simple|moderate|complex"
      },
      "speaker_notes": "string"
    }
  ],
  "visual_guidelines": {
    "primary_color_scheme": ["hex", "hex"],
    "typography_personality": "string",
    "overall_mood": "string",
    "design_philosophy": "string"
  },
  "narrative_flow": "string"
}
`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response.text) throw new Error("No response text from Layer 1");
    
    const data = JSON.parse(cleanJson(response.text));
    
    // Add IDs to slides
    data.slides = data.slides.map((s: any) => ({
      ...s,
      id: crypto.randomUUID(),
    }));

    return data as Presentation;
  } catch (error) {
    console.error("Layer 1 Error:", error);
    throw error;
  }
};

// --- Layer 2: Visual Prompting ---

export const generateVisualPrompt = async (slide: Slide, visualGuidelines: any, apiKey?: string): Promise<VisualPrompt> => {
  const key = apiKey || process.env.API_KEY;
  if (!key) throw new Error("API Key is missing.");
  
  const ai = new GoogleGenAI({ apiKey: key });

  const modelId = "gemini-2.0-flash-exp";
  const fallbackModelId = "gemini-3-pro-preview";

  const paletteString = visualGuidelines.primary_color_scheme?.join(', ') || "Technical blueprint colors (White, Blue, Black)";
  
  // Serialize training data for context
  const trainingContext = JSON.stringify(PROMPT_TRAINING_EXAMPLES.map(ex => ex.prompt_data));

  const prompt = `
${COGNITIVE_ARCHITECT_INSTRUCTION}

### TRAINING DATA (FEW-SHOT EXAMPLES) - DO NOT REPEAT THESE, USE ONLY AS PATTERNS
${trainingContext}

### CURRENT TASK
**Input Context**:
- Title: "${slide.title}"
- Content: "${slide.content}"
- Semantic Goal: ${JSON.stringify(slide.semantic_description?.purpose)}
- Visual Concept: ${JSON.stringify(slide.semantic_description?.visual_story)}
- Required Palette: [${paletteString}]

**Instructions**:
Act as the "Cognitive Infographic Architect". Analyze the Input Context and generate a "master_prompt" following the logic of the training examples.
However, output the result in the following JSON structure required by the application. Map your "master_prompt" to the "visual_prompt" field.

OUTPUT STRICT JSON:
{
  "visual_prompt": "The detailed master_prompt text. Must be highly descriptive, including layout, specific text labels, icon types, and color codes. End with 'High resolution PNG output, sharp text rendering.'",
  "prompt_layers": {
    "scene": "string",
    "subject": "string",
    "style": "string",
    "typography": "string",
    "composition": "string",
    "lighting": "string",
    "mood": "string"
  },
  "model_recommendation": "nanobanan",
  "estimated_quality": "excellent",
  "text_elements": ["List of exact text strings to appear in the image"]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    if (!response.text) throw new Error("No response text from Layer 2");
    return JSON.parse(cleanJson(response.text)) as VisualPrompt;

  } catch (error) {
    console.warn(`Layer 2 Flash (${modelId}) failed, trying fallback (${fallbackModelId}):`, error);
    
    // --- FALLBACK ATTEMPT ---
    try {
        const fallbackResponse = await ai.models.generateContent({
            model: fallbackModelId,
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
            }
        });
        
        if (!fallbackResponse.text) throw new Error("No response text from fallback Layer 2");
        return JSON.parse(cleanJson(fallbackResponse.text)) as VisualPrompt;
        
    } catch (fallbackError) {
        console.error(`Layer 2 Fallback also failed:`, fallbackError);
        
        // --- HARDCODED FALLBACK ---
        return {
          visual_prompt: `Technical infographic: ${slide.title}. White background. Layout: Central concept with labeled parts. Colors: ${paletteString}. High resolution PNG.`,
          prompt_layers: { 
              scene: "Studio white", 
              subject: slide.title, 
              style: "Technical", 
              typography: "Sans-serif", 
              composition: "Centered", 
              lighting: "Studio", 
              mood: "Professional" 
          },
          model_recommendation: 'nanobanan',
          estimated_quality: 'draft',
          text_elements: [slide.title]
        };
    }
  }
};

// --- Layer 3: Image Generation ---

export const generateImage = async (prompt: string, apiKey?: string): Promise<string> => {
  const key = apiKey || process.env.API_KEY;
  if (!key) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey: key });
  
  // Nano Banana Pro (Gemini 3 Pro Image)
  const modelId = "gemini-3-pro-image-preview";

  // Enforce PNG quality via prompt augmentation
  const highResPrompt = `${prompt} . Output in high-resolution PNG format. Ensure clear, sharp text rendering. No compression artifacts.`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [{ text: highResPrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9" 
        }
      }
    });

    // Extract base64 image data
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated by the model.");
  } catch (error) {
    console.error("Layer 3 Image Gen Error:", error);
    throw error;
  }
};
