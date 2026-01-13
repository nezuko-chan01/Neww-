
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CakeSectionProps {
  onComplete: () => void;
}

const CakeSection: React.FC<CakeSectionProps> = ({ onComplete }) => {
  const [candleLit, setCandleLit] = useState(true);
  const [celebrated, setCelebrated] = useState(false);

  const handleBlow = () => {
    if (candleLit) {
      setCandleLit(false);
      setCelebrated(true);
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFB6C1', '#87CEEB', '#FFFFFF']
      });
      // Allow user some time to enjoy the celebration before auto-transitioning
      setTimeout(() => {
        onComplete();
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-center space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-pink-600 pb-20"
      >
        Make a Wish! 🎂
      </motion.h2>

      <div className="relative mt-32 scale-110 sm:scale-125 flex flex-col items-center">
        {/* Cake Base */}
        <div className="w-40 h-24 bg-[#ffccdc] rounded-t-3xl border-b-8 border-pink-300 relative shadow-inner">
          {/* Frosting Drips */}
          <div className="absolute -top-2 left-0 right-0 flex justify-around px-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-8 bg-white/60 backdrop-blur-sm rounded-b-full shadow-sm" />
            ))}
          </div>

          <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-4">
            <span className="text-xs drop-shadow-md">🍓</span>
            <span className="text-xs drop-shadow-md">🍓</span>
            <span className="text-xs drop-shadow-md">🍓</span>
          </div>

          {/* Candle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3 h-14 bg-white border-x-2 border-pink-100 rounded-sm">
            <div className="absolute top-2 w-full h-1.5 bg-pink-400/20" />
            <div className="absolute top-6 w-full h-1.5 bg-pink-400/20" />
            <div className="absolute top-10 w-full h-1.5 bg-pink-400/20" />

            {/* Wick */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-700" />

            {/* Flame Area */}
            <AnimatePresence>
              {candleLit && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  onClick={handleBlow}
                  className="absolute -top-12 -left-1.5 -translate-x-1/2 cursor-pointer z-20 group"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1.1, 1.3, 1],
                      opacity: [0.8, 1, 0.9, 1, 0.8],
                      y: [0, -2, -1, -3, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-6 h-9 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-200 rounded-full shadow-[0_0_20px_rgba(255,165,0,0.8)]"
                  />
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-orange-500 uppercase tracking-widest animate-bounce cursor-pointer">
                    Tap to Blow 💨
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smoke after blowing */}
            {!candleLit && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.5, 0], y: -40, x: [0, 10, -10, 5] }}
                transition={{ duration: 2 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-8 bg-slate-300/30 rounded-full blur-md"
              />
            )}
          </div>
        </div>
        <div className="w-48 h-10 bg-pink-100 rounded-full mt-[-10px] shadow-xl border-2 border-pink-200" />
      </div>

      <div className="h-24 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {celebrated ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-4xl font-pacifico text-pink-500 rainbow-glow">Hooray! 🎉</h3>
              <p className="text-slate-600 font-medium">May all your dreams come true, Didu!</p>
            </motion.div>
          ) : (
            <motion.p
              key="instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-400 italic font-medium"
            >
              "Close your eyes, make a wish, <br /> and tap the magical flame!"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CakeSection;
