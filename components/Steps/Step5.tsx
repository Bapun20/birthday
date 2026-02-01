import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Step5Props {
  onCelebrate: () => void;
  isCelebrating: boolean;
}

export const Step5: React.FC<Step5Props> = ({ onCelebrate, isCelebrating }) => {
  const finalMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCelebrating && finalMessageRef.current) {
      gsap.fromTo(finalMessageRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.4 }
      );
    }
  }, [isCelebrating]);

  return (
    <div className="glass-card p-5 md:p-8 rounded-[1.5rem] text-center space-y-4 border-rose-300">
      <div className="text-5xl md:text-7xl animate-pulse">🎂</div>
      
      <div className="space-y-2">
        <h1 className="font-playfair text-xl md:text-3xl font-black text-gradient leading-tight">Always & Forever</h1>
        <p className="text-rose-900/90 text-xs md:text-base font-bold leading-snug">
          I wish for our bond to stay this special through every chapter yet to be written.
        </p>
      </div>

      <div className="relative min-h-[80px] flex items-center justify-center">
        {!isCelebrating ? (
          <button 
            onClick={onCelebrate}
            className="btn-gradient w-full md:w-auto px-8 py-3.5 rounded-full text-white font-black text-lg md:text-xl uppercase"
          >
            CELEBRATE US! 💖
          </button>
        ) : (
          <div ref={finalMessageRef} className="space-y-2">
            <h2 className="font-playfair text-xl md:text-2xl font-black text-gradient leading-tight">
              Happy Birthday! 🧸💖
            </h2>
            <p className="text-rose-600 font-bold text-sm md:text-lg italic leading-tight">
              "You’re someone I want in my life forever."
            </p>
            <p className="text-rose-400 font-bold text-[10px] md:text-sm animate-bounce">Have a magical day. ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
};