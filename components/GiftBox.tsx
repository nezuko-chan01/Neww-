
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
  onComplete: () => void;
  onSound: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onComplete, onSound }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [secretRevealed, setSecretRevealed] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      onSound();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb7b7', '#b7d7ff', '#ffffff']
      });
    }
  };

  const handleTap = () => {
    if (isOpen) {
      const nextCount = tapCount + 1;
      setTapCount(nextCount);
      if (nextCount === 5) {
        setSecretRevealed(true);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center space-y-12"
    >
      <h2 className="text-3xl font-bold text-pink-600">A Gift for You! 🎁</h2>

      <div className="relative perspective-1000">
        <motion.div
          animate={isOpen ? { scale: 0.8, y: 50 } : { y: [0, -10, 0] }}
          transition={isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 2 }}
          onClick={handleOpen}
          className="cursor-pointer"
        >
          {/* Box Bottom */}
          <div className="w-48 h-48 bg-pink-400 rounded-lg shadow-2xl relative">
            <div className="absolute inset-0 bg-pink-500 w-1/4 left-1/2 -translate-x-1/2" /> {/* Ribbon vertical */}
            <div className="absolute inset-0 bg-pink-500 h-1/4 top-1/2 -translate-y-1/2" /> {/* Ribbon horizontal */}
          </div>

          {/* Lid */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ 
                  y: -200, 
                  rotate: 45, 
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeOut" } 
                }}
                className="absolute -top-4 -left-2 w-52 h-12 bg-pink-300 rounded-md shadow-lg z-20 border-b-2 border-pink-400"
              >
                {/* Bow */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 bg-pink-200 rounded-full border-2 border-pink-400 rotate-45" />
                  <div className="w-12 h-12 bg-pink-200 rounded-full border-2 border-pink-400 -rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content inside */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1.2, y: -80 }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="text-6xl mb-2">🐬</div>
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-pink-500 font-bold border border-pink-200">
                  Surprise!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="h-24 flex items-center justify-center">
        {isOpen ? (
          <div className="space-y-4">
            <p className="text-slate-500 font-medium">
              You found a friendly dolphin! 🐬 <br/>
              <span className="text-sm opacity-60">Tap the box 5 times for a secret... ({tapCount}/5)</span>
            </p>
            <button 
              onClick={handleTap}
              className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold active:scale-90 transition-transform"
            >
              Tap Box!
            </button>
          </div>
        ) : (
          <p className="text-slate-400 animate-pulse italic">Tap the box to open it</p>
        )}
      </div>

      <AnimatePresence>
        {secretRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-inner text-blue-700"
          >
            <p className="font-handwritten text-2xl">
              "Didu, you are as bright as the ocean and as playful as a dolphin. Never stop smiling! 💙"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftBox;
