import React, { useState } from 'react';
const base = import.meta.env.BASE_URL;

const personalPhotos = [
  {
    url: `${base}photos/1.jpg`,
    caption: "That smile is pure magic. ✨",
    rotation: -2,
  },
  {
    url: `${base}photos/2.jpg`,
    caption: "Beautiful moments, forever captured. 🏛️💖",
    rotation: 2,
  },
  {
    url: `${base}photos/3.jpg`,
    caption: "You light up my whole world. 🕯️🔥",
    rotation: -1,
  },
];



export const Step4: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % personalPhotos.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="glass-card p-4 md:p-6 rounded-[1.5rem] text-center space-y-3 md:space-y-4 overflow-visible">
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-gradient">Special Memories</h2>
      
      <div 
        className="relative perspective-1000 mx-auto w-48 h-64 md:w-56 md:h-72 transition-transform duration-300 ease-out cursor-pointer active:scale-95"
        style={{ 
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={nextPhoto}
      >
        {personalPhotos.map((photo, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-white p-2 shadow-lg transition-all duration-700 border-rose-50 border-2 rounded photo-stack-item ${
              idx === photoIndex ? 'z-30 opacity-100 scale-100' : 'z-10 opacity-0 scale-90 translate-y-2 pointer-events-none'
            }`}
            style={{ 
              transform: idx === photoIndex ? `rotate(${photo.rotation}deg)` : 'rotate(0deg)'
            }}
          >
            <div className="w-full h-[85%] overflow-hidden bg-rose-50 rounded-sm">
              <img 
                src={photo.url} 
                alt="Personal Memory" 
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
            <div className="h-[15%] flex flex-col items-center justify-center">
              <p className="font-playfair text-rose-800 text-xs md:text-sm italic font-bold truncate px-1">{photo.caption}</p>
              <div className="flex space-x-1 mt-0.5">
                {personalPhotos.map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i === photoIndex ? 'bg-rose-400' : 'bg-rose-100'}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 px-1">
        <p className="text-rose-900/90 text-sm md:text-base font-bold italic leading-tight">
          Every conversation with you is special. I cherish every moment we share.
        </p>
        <p className="text-rose-600/70 text-[10px] uppercase font-bold tracking-widest">
          Tap photos to cycle
        </p>
      </div>

      <button 
        onClick={onNext}
        className="btn-gradient w-full py-2.5 rounded-full text-white font-bold text-sm uppercase tracking-wider"
      >
        The Final Wish
      </button>
    </div>
  );
};
