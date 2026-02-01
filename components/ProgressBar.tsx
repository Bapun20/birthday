
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 w-48 h-1.5 glass-card rounded-full overflow-hidden z-50">
      <div 
        className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-700 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
