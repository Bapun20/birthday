
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface StepContainerProps {
  step: number;
  children: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({ step, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [step]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
