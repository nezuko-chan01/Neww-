
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, RefreshCw, Heart } from 'lucide-react';

interface EndingProps {
  onReset: () => void;
}

const Ending: React.FC<EndingProps> = ({ onReset }) => {
  const [wisdom, setWisdom] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchDolphinWisdom = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a short, cute, one-sentence birthday prophecy or 'Dolphin Wisdom' for a girl named Didu. Make it sound magical, aquatic, and sweet.",
        config: {
          systemInstruction: "You are a magical birthday dolphin. Your messages are short, cheerful, and full of aquatic metaphors for a bright future."
        }
      });
      setWisdom(response.text || "May your year be as vast and beautiful as the ocean! 🌊💙");
    } catch (error) {
      setWisdom("The waves whisper that this will be your best year yet! 🐬✨");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolphinWisdom();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center space-y-10 py-12 w-full"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-9xl filter drop-shadow-xl"
        >
          🐬
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute -top-4 -right-8 text-5xl"
        >
          🎈
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 -left-10 text-4xl text-yellow-400"
        >
          ✨
        </motion.div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-pacifico text-pink-500">Happy Birthday, Didu!</h2>
        <p className="text-slate-600 font-medium px-4">
          I hope these little surprises brought a splash of joy to your special day. <br/>
          You're truly fintastic! 💙
        </p>
      </div>

      <motion.div 
        className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(186,230,253,0.3)] border-2 border-blue-100 max-w-xs relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Heart size={80} fill="currentColor" className="text-pink-500" />
        </div>

        <Sparkles className="absolute -top-3 -left-3 text-yellow-400" size={32} />
        <h4 className="text-blue-500 font-bold mb-3 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
          Dolphin Wisdom 🌊
        </h4>
        
        <div className="min-h-[4rem] flex items-center justify-center">
          {loading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="text-blue-300" size={32} />
            </motion.div>
          ) : (
            <p className="text-slate-700 italic font-medium leading-relaxed text-lg">
              "{wisdom}"
            </p>
          )}
        </div>
        
        <button 
          onClick={fetchDolphinWisdom}
          disabled={loading}
          className="mt-6 flex items-center gap-2 mx-auto text-xs font-bold text-blue-400 hover:text-blue-600 transition-colors uppercase tracking-widest active:scale-95"
        >
          <RefreshCw size={12} /> New Prophecy
        </button>
      </motion.div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-10 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-pink-200 transition-all flex items-center gap-2"
      >
        Relive the Magic <Heart size={18} fill="white" />
      </motion.button>

      <footer className="pt-12 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
        Handcrafted with 💖 for Didu
      </footer>
    </motion.div>
  );
};

export default Ending;
