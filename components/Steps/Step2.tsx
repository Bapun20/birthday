import React from 'react';

export const Step2: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="glass-card p-5 md:p-8 rounded-[1.5rem] text-center space-y-4">
      <div className="text-5xl md:text-7xl">🌹</div>
      
      <div className="space-y-2">
        <h1 className="font-playfair text-2xl md:text-4xl font-black text-gradient">Happy Birthday!</h1>
        <p className="text-rose-900/90 text-sm md:text-base leading-snug font-semibold">
          To the person who makes my world brighter. You are truly a masterpiece.
        </p>
      </div>

      <button 
        onClick={onNext}
        className="btn-gradient w-full md:w-auto px-8 py-3 rounded-full text-white font-bold text-sm"
      >
        Let's continue...
      </button>
    </div>
  );
};