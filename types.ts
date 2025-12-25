
export type PresentationStyle = 'corporate' | 'minimal' | 'artistic' | 'technical';
export type PresentationTone = 'professional' | 'conversational' | 'technical' | 'creative';
export type GenerationStatus = 'idle' | 'processing' | 'completed' | 'failed';

export interface UserInput {
  topic: string;
  audience: string;
  tone: PresentationTone;
  style: PresentationStyle;
  numberOfSlides: number;
  context?: string;
}

export interface SemanticDescription {
  purpose: string;
  key_message: string;
  audience_relevance: string;
  visual_story: string;
  color_mood: string;
  data_to_visualize?: {
    type: string;
    elements: string[];
  };
  complexity_level: string;
}

export interface VisualPrompt {
  visual_prompt: string; // The paragraph
  prompt_layers: {
    scene: string;
    subject: string;
    style: string;
    typography: string;
    composition: string;
    lighting: string;
    mood: string;
  };
  model_recommendation: 'nanobanan' | 'imagen4' | 'either';
  estimated_quality: string;
  text_elements: string[];
}

export interface Slide {
  id: string;
  slide_number: number;
  title: string;
  content: string;
  type: string;
  semantic_description?: SemanticDescription;
  visual_prompt_data?: VisualPrompt;
  image_url?: string;
  image_model?: string;
  image_status?: GenerationStatus;
  speaker_notes?: string;
}

export interface Presentation {
  title: string;
  slides: Slide[];
  visual_guidelines?: {
    primary_color_scheme: string[];
    typography_personality: string;
    overall_mood: string;
    design_philosophy: string;
  };
  narrative_flow?: string;
}

export interface AppState {
  step: 'input' | 'structure' | 'prompting' | 'visualization';
  input: UserInput;
  presentation: Presentation | null;
  status: GenerationStatus;
  error: string | null;
  progressMessage: string;
  apiKey: string;
  showSettings: boolean;
  viewingImage: string | null;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
