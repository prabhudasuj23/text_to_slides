
import React from 'react';
import { Slide, VisualPrompt } from '../types';
import { motion } from 'framer-motion';
import { Eye, Type, Palette, Layout, Lightbulb, Image as ImageIcon, Maximize2 } from 'lucide-react';

interface Props {
  slide: Slide;
  showPrompt?: boolean;
  showImage?: boolean;
  onViewImage?: (url: string) => void;
}

export const SlideCard: React.FC<Props> = ({ slide, showPrompt = false, showImage = false, onViewImage }) => {
  return (
    <motion.div 
      layout
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors shadow-lg flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded">
            #{slide.slide_number}
          </span>
          <h3 className="font-semibold text-slate-100 truncate max-w-[200px]">{slide.title}</h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-500">{slide.type}</span>
      </div>

      <div className="p-4 space-y-4 flex-grow">
        {/* Layer 1: Semantic Content */}
        <div className="space-y-2">
          <p className="text-sm text-slate-300 line-clamp-3">{slide.content}</p>
          {slide.semantic_description && (
            <div className="mt-3 p-3 bg-blue-950/20 border border-blue-900/30 rounded-lg">
               <div className="flex items-start gap-2 mb-1">
                 <Lightbulb className="w-3 h-3 text-blue-400 mt-1" />
                 <span className="text-xs font-semibold text-blue-400">Semantic Rationale</span>
               </div>
               <p className="text-xs text-blue-200/70 italic">"{slide.semantic_description.purpose}"</p>
               <div className="mt-2 flex gap-2 flex-wrap">
                 <span className="text-[10px] px-1.5 py-0.5 bg-blue-900/40 text-blue-300 rounded border border-blue-800/50">
                   {slide.semantic_description.complexity_level}
                 </span>
                 <span className="text-[10px] px-1.5 py-0.5 bg-purple-900/40 text-purple-300 rounded border border-purple-800/50">
                   {slide.semantic_description.color_mood}
                 </span>
               </div>
            </div>
          )}
        </div>

        {/* Layer 2: Visual Prompt */}
        {showPrompt && slide.visual_prompt_data && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-3 border-t border-slate-800"
          >
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Visual Prompt (Layer 2)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-emerald-500/50 pl-3">
              {slide.visual_prompt_data.visual_prompt}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <Layout className="w-3 h-3" /> 
                {slide.visual_prompt_data.prompt_layers.composition}
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <Palette className="w-3 h-3" /> 
                {slide.visual_prompt_data.prompt_layers.style}
              </div>
            </div>
          </motion.div>
        )}

        {/* Layer 3: Final Image */}
        {showImage && slide.image_url && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="pt-3 border-t border-slate-800"
           >
             <div className="flex items-center gap-2 mb-2 text-pink-400">
               <ImageIcon className="w-4 h-4" />
               <span className="text-xs font-bold uppercase tracking-wider">Generated Image (Layer 3)</span>
             </div>
             <div className="aspect-video w-full rounded-lg overflow-hidden relative group">
               <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button 
                  onClick={() => onViewImage && onViewImage(slide.image_url!)}
                  className="bg-white hover:bg-slate-100 text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors transform hover:scale-105"
                 >
                   <Maximize2 className="w-3 h-3" />
                   View Fullscreen
                 </button>
               </div>
             </div>
             <div className="mt-2 flex justify-between items-center text-[10px] text-slate-500">
               <span>Model: {slide.image_model}</span>
               <span className="text-green-500">Completed</span>
             </div>
           </motion.div>
        )}
      </div>
    </motion.div>
  );
};
