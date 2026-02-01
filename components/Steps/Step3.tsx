import React from 'react';

export const Step3: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="space-y-3 px-1">
      <h2 className="font-playfair text-xl md:text-3xl font-bold text-gradient text-center">Things I Adore</h2>
      
      <div className="grid grid-cols-1 gap-2">
        <div className="glass-card p-3 md:p-5 rounded-xl border-rose-100">
          <h3 className="text-rose-600 font-bold text-base md:text-lg mb-0.5">✨ Your Soul</h3>
          <p className="text-rose-900/80 font-medium text-xs md:text-sm italic leading-tight">It’s rare to find someone as warm as you. You amaze me every day.</p>
        </div>
        
        <div className="glass-card p-3 md:p-5 rounded-xl border-rose-100">
          <h3 className="text-rose-600 font-bold text-base md:text-lg mb-0.5">🧸 Your Smile</h3>
          <p className="text-rose-900/80 font-medium text-xs md:text-sm leading-tight">My absolute favorite sight. It lights up everything around you.</p>
        </div>

        <div className="glass-card p-3 md:p-5 rounded-xl border-rose-100">
          <h3 className="text-rose-600 font-bold text-base md:text-lg mb-0.5">🌟 The "Magic"</h3>
          <p className="text-rose-900/80 font-medium text-xs md:text-sm leading-tight">There's just something special about you that I can't explain.</p>
        </div>
      </div>

      <div className="flex justify-center pt-1">
        <button 
          onClick={onNext}
          className="btn-gradient w-full md:w-auto px-8 py-2.5 rounded-full text-white font-bold text-sm"
        >
          Something special?
        </button>
      </div>
    </div>
  );
};