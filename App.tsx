import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Background } from './components/Background';
import { ProgressBar } from './components/ProgressBar';
import { StepContainer } from './components/StepContainer';
import { Step1 } from './components/Steps/Step1';
import { Step2 } from './components/Steps/Step2';
import { Step3 } from './components/Steps/Step3';
import { Step4 } from './components/Steps/Step4';
import { Step5 } from './components/Steps/Step5';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalSteps = 5;

  useEffect(() => {
    audioRef.current = document.getElementById('bg-music') as HTMLAudioElement;
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      // Auto-play music when they start the journey if not playing
      if (currentStep === 1 && !isPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const triggerCelebrate = useCallback(() => {
    setIsCelebrating(true);
    
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        colors: ['#fb7185', '#fda4af', '#fef3c7', '#be123c'],
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        colors: ['#fb7185', '#fda4af', '#fef3c7', '#be123c'],
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount: 8,
        scalar: 2.5,
        shapes: ['circle'],
        colors: ['#ffb7c5', '#ffd700'],
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Background isCelebrating={isCelebrating} />
      
      <ProgressBar current={currentStep} total={totalSteps} />

      {/* Floating Music Control */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 music-btn w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
        aria-label="Toggle Music"
      >
        {isPlaying ? '🎵' : '🔇'}
      </button>

      <main className="relative z-10 w-full max-w-2xl px-4">
        <StepContainer step={currentStep}>
          {currentStep === 1 && <Step1 onNext={handleNext} />}
          {currentStep === 2 && <Step2 onNext={handleNext} />}
          {currentStep === 3 && <Step3 onNext={handleNext} />}
          {currentStep === 4 && <Step4 onNext={handleNext} />}
          {currentStep === 5 && <Step5 onCelebrate={triggerCelebrate} isCelebrating={isCelebrating} />}
        </StepContainer>
      </main>
    </div>
  );
};

export default App;