
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface Props {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageViewer: React.FC<Props> = ({ imageUrl, onClose }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setScale(1);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `slide-visual-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 bg-black/40 border-b border-white/10 z-10">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleZoomOut}
                className="p-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-slate-400 w-12 text-center">{Math.round(scale * 100)}%</span>
              <button 
                onClick={handleZoomIn}
                className="p-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button 
                onClick={handleReset}
                className="p-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-lg transition-colors ml-2"
                title="Reset Zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-800/50 hover:bg-red-500/20 hover:text-red-400 text-white rounded-lg transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-8 cursor-grab active:cursor-grabbing">
            <motion.div
              style={{ scale }}
              className="relative shadow-2xl shadow-black"
            >
              <img 
                src={imageUrl} 
                alt="Full View" 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
                draggable={false}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
