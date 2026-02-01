import React from 'react';

export const Step1: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="glass-card p-5 md:p-8 rounded-[1.5rem] text-center space-y-4 border-rose-200">
      <div className="text-4xl md:text-6xl flex justify-center space-x-3 animate-bounce">
        <span>🧸</span>
        <span>✨</span>
        <span>🌸</span>
      </div>
      
      <div className="space-y-2">
        <h1 className="font-playfair text-2xl md:text-4xl font-black text-gradient">Hey Dearest,</h1>
        <p className="text-rose-900/90 text-sm md:text-lg leading-snug font-semibold">
          I built this little digital sanctuary just for you. Take a moment to step inside...
        </p>
      </div>

      <button 
        onClick={onNext}
        className="btn-gradient w-full md:w-auto px-8 py-3 rounded-full text-white font-bold text-base uppercase tracking-widest"
      >
        Open My Heart
      </button>
    </div>
  );
};