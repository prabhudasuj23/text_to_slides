
import React, { useState, useEffect } from 'react';
import { AppState, UserInput, Presentation } from './types';
import { InputStage } from './components/InputStage';
import { SlideCard } from './components/SlideCard';
import { ProgressBar } from './components/ProgressBar';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ImageViewer } from './components/ImageViewer';
import { generateStructure, generateVisualPrompt, generateImage } from './services/geminiService';
import { exportToPptx } from './services/pptxService';
import { Loader2, ArrowRight, Download, Wand2, Image as ImageIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: 'input',
    input: {
      topic: '',
      audience: 'Tech Investors',
      tone: 'professional',
      style: 'technical',
      numberOfSlides: 4,
    },
    presentation: null,
    status: 'idle',
    error: null,
    progressMessage: '',
    apiKey: '',
    showSettings: false,
    viewingImage: null,
  });

  // Load API Key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setState(s => ({ ...s, apiKey: storedKey }));
    }
  }, []);

  const handleOpenSettings = () => {
    setState(s => ({ ...s, showSettings: true }));
  };

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setState(s => ({ ...s, apiKey: key, error: null }));
  };

  const handleViewImage = (url: string) => {
    setState(s => ({ ...s, viewingImage: url }));
  };

  const handleCloseImageViewer = () => {
    setState(s => ({ ...s, viewingImage: null }));
  };

  // --- Handlers ---

  const handleStructureGeneration = async () => {
    if (!state.apiKey && !process.env.API_KEY) {
      setState(s => ({ ...s, showSettings: true, error: "Please enter your API Key in Settings to continue." }));
      return;
    }

    setState(s => ({ ...s, status: 'processing', progressMessage: 'Layer 1: Gemini 3 Pro analyzing semantics...' }));
    
    try {
      const structure = await generateStructure(state.input, state.apiKey);
      setState(s => ({ 
        ...s, 
        presentation: structure, 
        step: 'structure', 
        status: 'idle', 
        error: null 
      }));
    } catch (e: any) {
      setState(s => ({ ...s, status: 'failed', error: e.message }));
    }
  };

  const handlePromptGeneration = async () => {
    if (!state.presentation) return;
    setState(s => ({ ...s, status: 'processing', progressMessage: 'Layer 2: Gemini 2.5 Flash engineering prompts...' }));

    try {
      const slides = [...state.presentation.slides];
      const guidelines = state.presentation.visual_guidelines;
      
      // Generate prompts in parallel
      const promptPromises = slides.map(async (slide) => {
         const promptData = await generateVisualPrompt(slide, guidelines, state.apiKey);
         return { ...slide, visual_prompt_data: promptData };
      });

      const updatedSlides = await Promise.all(promptPromises);

      setState(s => ({
        ...s,
        presentation: { ...s.presentation!, slides: updatedSlides },
        step: 'prompting',
        status: 'idle'
      }));

    } catch (e: any) {
      setState(s => ({ ...s, status: 'failed', error: e.message }));
    }
  };

  const handleImageGeneration = async () => {
    if (!state.presentation) return;
    setState(s => ({ ...s, status: 'processing', progressMessage: 'Layer 3: Nano Banana Pro generating visuals...' }));

    try {
      const slides = [...state.presentation.slides];
      
      // Generate images sequentially to show progress update
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        
        if (slide.visual_prompt_data?.visual_prompt) {
          try {
            // Real API call to Gemini 3 Pro Image (Nano Banana Pro)
            const imageUrl = await generateImage(slide.visual_prompt_data.visual_prompt, state.apiKey);
            
            slides[i] = {
              ...slide,
              image_url: imageUrl,
              image_model: 'nano-banana-pro',
              image_status: 'completed'
            };
          } catch (e) {
            console.error(`Failed to generate image for slide ${slide.slide_number}`, e);
            slides[i] = {
              ...slide,
              image_status: 'failed',
            };
          }
          
          // Update state progressively after each image
          setState(s => ({
            ...s,
            presentation: { ...s.presentation!, slides: [...slides] }
          }));
        }
      }

      setState(s => ({
        ...s,
        step: 'visualization',
        status: 'completed',
        progressMessage: 'Presentation Ready'
      }));

    } catch (e: any) {
      setState(s => ({ ...s, status: 'failed', error: e.message }));
    }
  };

  const handleExport = async () => {
    if (!state.presentation) return;
    setState(s => ({ ...s, status: 'processing', progressMessage: 'Generating PowerPoint file...' }));
    
    try {
      await exportToPptx(state.presentation);
      setState(s => ({ ...s, status: 'idle', progressMessage: '' }));
    } catch (e: any) {
      console.error(e);
      setState(s => ({ ...s, status: 'failed', error: 'Failed to export PPTX' }));
    }
  };

  const handleReset = () => {
    setState(s => ({
        ...s,
        step: 'input',
        presentation: null,
        status: 'idle',
        error: null
    }));
  };

  // --- Render Helpers ---

  const renderContent = () => {
    if (state.step === 'input') {
      return (
        <InputStage 
          input={state.input} 
          status={state.status} 
          onChange={(i) => setState(s => ({...s, input: i}))} 
          onSubmit={handleStructureGeneration} 
        />
      );
    }

    if (!state.presentation) return null;

    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{state.presentation.title}</h2>
            <p className="text-slate-400 text-sm">
              {state.step === 'structure' && "Review Semantic Structure"}
              {state.step === 'prompting' && "Review Visual Prompts"}
              {state.step === 'visualization' && "Final Presentation"}
            </p>
          </div>
          
          <div className="flex gap-3">
             {state.step === 'structure' && (
                <button 
                  onClick={handlePromptGeneration}
                  disabled={state.status === 'processing'}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {state.status === 'processing' ? <Loader2 className="animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  Generate Prompts
                </button>
             )}
             {state.step === 'prompting' && (
                <button 
                  onClick={handleImageGeneration}
                  disabled={state.status === 'processing'}
                  className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {state.status === 'processing' ? <Loader2 className="animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  Generate Images
                </button>
             )}
             {state.step === 'visualization' && (
                <div className="flex gap-3">
                    <button onClick={handleReset} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg">
                        New Presentation
                    </button>
                    <button 
                        onClick={handleExport}
                        disabled={state.status === 'processing'}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        {state.status === 'processing' ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
                        Export PPTX
                    </button>
                </div>
             )}
          </div>
        </div>

        {/* Global Visual Guidelines Info (Visible in Structure/Prompt steps) */}
        {state.step !== 'visualization' && state.presentation.visual_guidelines && (
            <div className="mb-6 p-4 bg-slate-900/50 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                    <span className="block font-bold text-slate-300 mb-1">Philosophy</span>
                    {state.presentation.visual_guidelines.design_philosophy}
                </div>
                <div>
                    <span className="block font-bold text-slate-300 mb-1">Mood</span>
                    {state.presentation.visual_guidelines.overall_mood}
                </div>
                <div>
                     <span className="block font-bold text-slate-300 mb-1">Palette</span>
                     <div className="flex gap-2">
                        {state.presentation.visual_guidelines.primary_color_scheme.map((c, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c}></div>
                        ))}
                     </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {state.presentation.slides.map((slide) => (
              <SlideCard 
                key={slide.id} 
                slide={slide} 
                showPrompt={state.step !== 'structure'} 
                showImage={state.step === 'visualization' || (state.step === 'prompting' && false)} 
                onViewImage={handleViewImage}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 p-6 font-sans selection:bg-blue-500/30">
      
      {/* Modals */}
      <ApiKeyModal 
        isOpen={state.showSettings} 
        onClose={() => setState(s => ({ ...s, showSettings: false }))}
        onSave={handleSaveApiKey}
        currentKey={state.apiKey}
      />

      <ImageViewer 
        imageUrl={state.viewingImage}
        onClose={handleCloseImageViewer}
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            VS
          </div>
          <span className="font-bold text-lg tracking-tight">Visual Slides</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleOpenSettings}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${state.apiKey ? 'bg-slate-800 text-green-400 hover:bg-slate-700' : 'bg-blue-600 text-white hover:bg-blue-500 animate-pulse'}`}
            title="Configure API Key"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
            <span>Model Pipeline:</span>
            <span className="text-blue-400">Gemini 3 Pro</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-purple-400">Gemini 2.5 Flash</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-pink-400">Nano Banana Pro</span>
          </div>
        </div>
      </header>

      {state.step !== 'input' && <ProgressBar currentStep={state.step} />}

      <main className="relative z-10">
        {state.status === 'processing' && (
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-medium"
           >
             <Loader2 className="animate-spin w-5 h-5" />
             {state.progressMessage}
           </motion.div>
        )}

        {state.error && (
            <div className="max-w-2xl mx-auto mb-8 bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3">
                <span className="font-bold">Error:</span> {state.error}
            </div>
        )}

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
