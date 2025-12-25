import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  currentStep: string;
}

const steps = [
  { id: 'input', label: 'Input' },
  { id: 'structure', label: 'Structure' },
  { id: 'prompting', label: 'Prompting' },
  { id: 'visualization', label: 'Images' },
];

export const ProgressBar: React.FC<Props> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-800 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isCurrent ? '#2563eb' : '#1e293b',
                  borderColor: isCompleted || isCurrent ? '#3b82f6' : '#334155',
                  scale: isCurrent ? 1.1 : 1,
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                  isCompleted || isCurrent ? 'text-white' : 'text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
              </motion.div>
              <span className={`text-xs font-medium ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};