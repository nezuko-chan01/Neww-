
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center text-center justify-center min-h-[80vh] w-full space-y-10"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 text-pink-200/50"
        >
          <Sparkles size={160} />
        </motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative text-9xl drop-shadow-2xl"
        >
          🎂
        </motion.div>
      </div>

      <div className="space-y-4">
        <motion.h1 
          className="text-6xl font-pacifico text-pink-500 drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Happy Birthday, <br/> <span className="text-blue-400">Didu!</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-500 font-medium max-w-xs mx-auto leading-relaxed"
        >
          A beautiful journey of surprises is waiting for you. Are you ready for some ocean magic? 🐬✨
        </motion.p>
      </div>

      <motion.button
        whileHover={{ scale: 1.08, boxShadow: "0 20px 25px -5px rgb(255 182 193 / 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative bg-white px-12 py-5 rounded-full font-bold text-2xl text-pink-500 shadow-2xl border-b-4 border-pink-200 transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-pink-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        <span className="relative flex items-center gap-3">
          Reveal the Magic <Sparkles className="text-yellow-400" size={24} />
        </span>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-6 pt-8 opacity-60"
      >
        <span className="text-3xl hover:scale-125 transition-transform cursor-default">🎁</span>
        <span className="text-3xl hover:scale-125 transition-transform cursor-default">🐬</span>
        <span className="text-3xl hover:scale-125 transition-transform cursor-default">🍰</span>
        <span className="text-3xl hover:scale-125 transition-transform cursor-default">💌</span>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
