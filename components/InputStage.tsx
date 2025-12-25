import React from 'react';
import { UserInput, GenerationStatus } from '../types';
import { STYLES, TONES } from '../constants';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  input: UserInput;
  status: GenerationStatus;
  onChange: (input: UserInput) => void;
  onSubmit: () => void;
}

export const InputStage: React.FC<Props> = ({ input, status, onChange, onSubmit }) => {
  const isProcessing = status === 'processing';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Visual Slides Generator
        </h1>
        <p className="text-slate-400">Layer 1: Semantic Understanding & Structure</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Presentation Topic</label>
          <textarea
            value={input.topic}
            onChange={(e) => onChange({ ...input, topic: e.target.value })}
            placeholder="e.g., The Future of Quantum Computing in Banking"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
            disabled={isProcessing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
            <input
              type="text"
              value={input.audience}
              onChange={(e) => onChange({ ...input, audience: e.target.value })}
              placeholder="e.g., Tech Executives"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Slide Count: {input.numberOfSlides}</label>
            <input
              type="range"
              min="3"
              max="12"
              value={input.numberOfSlides}
              onChange={(e) => onChange({ ...input, numberOfSlides: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              disabled={isProcessing}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3</span>
              <span>12</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {TONES.map((tone) => (
                <button
                  key={tone.value}
                  onClick={() => onChange({ ...input, tone: tone.value })}
                  className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                    input.tone === tone.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                  disabled={isProcessing}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Visual Style</label>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map((style) => (
                <button
                  key={style.value}
                  onClick={() => onChange({ ...input, style: style.value })}
                  className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                    input.style === style.value
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                  disabled={isProcessing}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={!input.topic || isProcessing}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Analyzing Semantics...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Structure</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};