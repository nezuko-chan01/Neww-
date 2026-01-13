
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart } from 'lucide-react';

interface LetterProps {
  onComplete: () => void;
}

const PAGES = [
  {
    title: "To My Dear Didu,",
    content: "Happy Birthday! Today is all about you and the wonderful light you bring into the world. I wanted to create something small but special to celebrate the amazing person you are.",
    decoration: "💖"
  },
  {
    title: "The Joy You Bring",
    content: "Like a dolphin jumping through the waves, your energy is contagious! You have this incredible way of making everything feel more vibrant and fun. Thank you for being such a beautiful soul.",
    decoration: "🐬"
  },
  {
    title: "A Year of Magic",
    content: "May this new year of your life be filled with endless smiles, exciting adventures, and all the cake you can handle! Remember that you're capable of anything you set your heart to.",
    decoration: "✨"
  },
  {
    title: "Always Here",
    content: "Whether it's sharing a laugh or chasing dreams, I'm so glad we're on this journey. You deserve the best day ever, surrounded by love and laughter.",
    decoration: "🎂"
  }
];

const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    if (currentPage < PAGES.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full py-8">
      <div className="relative w-full max-w-[340px] aspect-[3/4] perspective-1000">
        <motion.div 
          className="w-full h-full bg-[#fffcf5] shadow-2xl rounded-sm border-l-8 border-pink-100 p-8 flex flex-col items-center justify-between text-center relative overflow-hidden ring-1 ring-black/5"
          initial={{ rotate: -2 }}
          animate={{ rotate: 0 }}
        >
          {/* Paper texture/lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_1.5rem] opacity-20 pointer-events-none mt-12" />
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="flex-1 flex flex-col items-center justify-center space-y-6 z-10 w-full"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl drop-shadow-sm"
              >
                {PAGES[currentPage].decoration}
              </motion.span>
              
              <h3 className="text-2xl font-handwritten font-bold text-pink-600 border-b-2 border-pink-100 pb-2 w-full">
                {PAGES[currentPage].title}
              </h3>
              
              <p className="font-handwritten text-xl leading-relaxed text-slate-700 italic px-2">
                {PAGES[currentPage].content}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="w-full flex items-center justify-between mt-8 z-10">
            <button 
              onClick={prev}
              disabled={currentPage === 0}
              className={`p-3 rounded-full transition-all active:scale-90 ${currentPage === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-pink-400 hover:bg-pink-50 shadow-sm'}`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {PAGES.map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ scale: i === currentPage ? 1.2 : 1 }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentPage ? 'bg-pink-400 shadow-sm' : 'bg-pink-100'}`} 
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
              {currentPage === PAGES.length - 1 ? <Heart size={20} className="fill-white" /> : <ChevronRight size={24} />}
            </button>
          </div>

          {/* Wax Seal */}
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 12 }}
            className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-600 rounded-full shadow-lg border-4 border-pink-700 flex items-center justify-center z-20 opacity-90 cursor-default"
          >
            <Heart className="text-white" size={24} fill="white" />
          </motion.div>
        </motion.div>
        
        {/* Background page layers for depth */}
        <div className="absolute inset-0 bg-white shadow-xl rounded-sm -z-10 translate-x-1 translate-y-1 rotate-1" />
        <div className="absolute inset-0 bg-white shadow-md rounded-sm -z-20 translate-x-2 translate-y-2 rotate-2" />
      </div>
    </div>
  );
};

export default Letter;
