
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Camera } from 'lucide-react';
// @ts-ignore
import dolGif from '../assets/dol.gif';

interface DolphinSurpriseProps {
  onComplete: () => void;
  onInteraction: () => void;
}

const DolphinSurprise: React.FC<DolphinSurpriseProps> = ({ onComplete, onInteraction }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 🐬 Cheerful Magical Dolphin GIF
  const dolphinGifUrl = dolGif;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onInteraction();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center min-h-[75vh] w-full text-center space-y-12"
    >
      <div className="space-y-3">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="inline-block"
        >
          <Camera className="text-blue-400 mx-auto mb-2" size={32} />
        </motion.div>
        <h2 className="text-4xl font-pacifico text-blue-600 drop-shadow-sm">A Magic Snapshot</h2>
        <p className="text-slate-500 font-medium italic">"Wait for the splash of joy..."</p>
      </div>

      <div
        className="relative w-80 h-[28rem] perspective-2000 cursor-pointer group"
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 150, damping: 20 }}
          className="w-full h-full relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side: The Dolphin Invitation */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-2xl border-[12px] border-blue-50 flex flex-col items-center justify-center p-10 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative mb-8">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-[120px] filter drop-shadow-2xl"
              >
                🐬
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-6 -right-6"
              >
                <Sparkles className="text-yellow-400" size={48} />
              </motion.div>
            </div>

            <div className="space-y-4">
              <p className="text-blue-500 font-pacifico text-3xl">Flip Me, Didu!</p>
              <div className="h-1 w-20 bg-blue-100 mx-auto rounded-full" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                Tap to Reveal
              </p>
            </div>
          </div>

          {/* Back Side: The Magical Polaroid with GIF */}
          <div
            className="absolute inset-0 w-full h-full bg-[#fdfdfd] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-slate-100 flex flex-col p-5 backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex-1 bg-white shadow-inner flex flex-col relative overflow-hidden group/img">
              <div className="flex-1 overflow-hidden relative bg-blue-50">
                <img
                  src={dolphinGifUrl}
                  alt="Cheerful Dolphin"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-400/10 pointer-events-none" />

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute bottom-4 right-4 text-white drop-shadow-md z-10"
                >
                  <Heart size={28} fill="#f472b6" className="text-pink-400" />
                </motion.div>
              </div>

              <div className="h-24 flex flex-col items-center justify-center bg-white px-2">
                <p className="font-handwritten text-3xl text-blue-600 -rotate-1">
                  Splash of Love! 🌊
                </p>
                <p className="font-handwritten text-lg text-slate-400 italic">
                  "Stay Playful Always"
                </p>
              </div>
            </div>

            {/* Decorative Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-10 bg-pink-300/30 backdrop-blur-md rotate-1 border-x border-white/40 shadow-sm z-20" />
          </div>
        </motion.div>

        {/* Glow Effects */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-blue-400/20 via-pink-400/10 to-blue-400/20 blur-3xl -z-10 rounded-full group-hover:scale-110 transition-transform duration-1000" />
      </div>

      <div className="h-20">
        <AnimatePresence>
          {isFlipped && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="px-12 py-4 bg-blue-500 text-white rounded-full font-bold shadow-2xl transition-all flex items-center gap-3 group"
            >
              <span className="text-xl">Reveal the Surprise</span>
              <Heart size={20} className="fill-white group-hover:animate-ping" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DolphinSurprise;
