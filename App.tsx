
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Welcome from './components/Welcome';
import GiftBox from './components/GiftBox';
import CakeSection from './components/CakeSection';
import DolphinSurprise from './components/DolphinSurprise';
import Letter from './components/Letter';
import Ending from './components/Ending';
import BackgroundEffects from './components/BackgroundEffects';

enum Section {
  WELCOME,
  GIFT,
  CAKE,
  DOLPHIN,
  LETTER,
  ENDING
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 30,
    rotateY: 10,
    filter: 'blur(8px)'
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    filter: 'blur(0px)'
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    y: -30,
    rotateY: -10,
    filter: 'blur(8px)'
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 120, // Slightly lower for a smoother, buttery feel
  damping: 20,
  mass: 0.8
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.WELCOME);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger celebration burst on section change
  useEffect(() => {
    if (currentSection !== Section.WELCOME) {
      const colors = ['#ec4899', '#60a5fa', '#fbbf24', '#ffffff'];
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.85 },
        gravity: 0.9,
        scalar: 0.75,
        colors: colors,
        disableForReducedMotion: true
      });
    }
  }, [currentSection]);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const nextSection = () => {
    setCurrentSection((prev) => (prev < Section.ENDING ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev > Section.WELCOME ? prev - 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetJourney = () => {
    setCurrentSection(Section.WELCOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playDolphinSound = useCallback(() => {
    const sound = new Audio('https://www.myinstants.com/media/sounds/dolphin.mp3');
    sound.volume = 0.4;
    sound.play().catch(() => { });
  }, []);

  const playClickSound = useCallback(() => {
    const sound = new Audio('https://www.myinstants.com/media/sounds/pop-sound-effect.mp3');
    sound.volume = 0.15;
    sound.play().catch(() => { });
  }, []);

  const totalSectionsCount = 6;
  const progress = (currentSection / (totalSectionsCount - 1)) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-800 selection:bg-pink-200 perspective-1000">
      <BackgroundEffects />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-pink-100/30 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-pink-600 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>

      {/* Global Music Control */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.12, rotate: 5 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleMusic}
          className="bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-xl text-pink-500 transition-all border border-pink-50 group"
        >
          {isMusicPlaying ? <Volume2 size={24} className="group-hover:animate-pulse" /> : <VolumeX size={24} />}
        </motion.button>
      </div>

      <main className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col items-center px-6 pt-16 pb-36">
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              {currentSection === Section.WELCOME && (
                <Welcome onStart={() => { playClickSound(); nextSection(); }} />
              )}
              {currentSection === Section.GIFT && (
                <GiftBox onComplete={nextSection} onSound={playDolphinSound} />
              )}
              {currentSection === Section.CAKE && (
                <CakeSection onComplete={nextSection} />
              )}
              {currentSection === Section.DOLPHIN && (
                <DolphinSurprise onComplete={nextSection} onInteraction={playDolphinSound} />
              )}
              {currentSection === Section.LETTER && (
                <Letter onComplete={nextSection} />
              )}
              {currentSection === Section.ENDING && (
                <Ending onReset={resetJourney} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <AnimatePresence>
          {currentSection !== Section.WELCOME && (
            <motion.div
              initial={{ y: 80, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: 80, opacity: 0, x: "-50%" }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-5 z-50 bg-white/80 backdrop-blur-3xl p-2.5 rounded-full border border-white/60 shadow-[0_20px_50px_rgba(236,72,153,0.15)] ring-1 ring-pink-500/5"
            >
              <motion.button
                whileHover={{ scale: 1.15, x: -3 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => { playClickSound(); prevSection(); }}
                className={`p-3.5 rounded-full transition-all ${currentSection === Section.GIFT ? 'text-slate-200 cursor-not-allowed' : 'text-pink-400 hover:bg-pink-50 active:bg-pink-100 shadow-sm'}`}
                disabled={currentSection === Section.GIFT}
              >
                <ChevronLeft size={26} />
              </motion.button>

              <div className="flex gap-2.5 px-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i === currentSection ? [1, 1.3, 1] : 1,
                      backgroundColor: i === currentSection ? '#ec4899' : '#fbcfe8',
                      boxShadow: i === currentSection ? '0 0 12px rgba(236,72,153,0.5)' : 'none'
                    }}
                    transition={i === currentSection ? { repeat: Infinity, duration: 2.5 } : {}}
                    className={`h-2.5 rounded-full w-2.5 transition-all duration-500`}
                  />
                ))}
              </div>

              {currentSection !== Section.ENDING ? (
                <motion.button
                  whileHover={{ scale: 1.15, x: 3 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  onClick={() => { playClickSound(); nextSection(); }}
                  className="p-3.5 bg-pink-500 text-white rounded-full shadow-xl hover:bg-pink-600 active:bg-pink-700 transition-all flex items-center justify-center ring-4 ring-pink-500/10"
                >
                  <ChevronRight size={26} />
                </motion.button>
              ) : (
                <div className="w-[52px]" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
