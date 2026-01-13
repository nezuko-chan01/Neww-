
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Bubble: React.FC<{ size: number; delay: number; left: string; duration: number }> = ({ size, delay, left, duration }) => {
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.5, 0.5, 0],
        x: ['-20px', '20px', '-10px']
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute rounded-full border border-white/40 shadow-inner"
      style={{
        width: size,
        height: size,
        left: left,
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(173, 216, 230, 0.2) 60%, rgba(255, 182, 193, 0.3))`
      }}
    />
  );
};

const BackgroundEffects: React.FC = () => {
  const bubbles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 10,
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 10
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#fff5f7] via-[#f0f9ff] to-[#fff5f7]">
      {bubbles.map(b => (
        <Bubble key={b.id} {...b} />
      ))}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
    </div>
  );
};

export default BackgroundEffects;
