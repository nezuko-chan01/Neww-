
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
// @ts-ignore
import diduImg from '../assets/Didu.jpg';

interface DolphinRevealProps {
    onComplete: () => void;
}

const DolphinReveal: React.FC<DolphinRevealProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullyRevealed, setIsFullyRevealed] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    // Calculate mask size based on scroll
    // Starts at 20% (small dolphin) and grows to 400% (covering screen)
    const maskSize = useTransform(smoothProgress, [0, 0.8], ["20%", "450%"]);

    // Opacity for the "Scroll" hint
    const hintOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    // SVG Data URI for the dolphin mask
    // Using encodeURIComponent to handle the emoji correctly (btoa fails on unicode)
    const dolphinSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="80">🐬</text>
    </svg>
  `;
    const dolphinUrl = `data:image/svg+xml;utf8,${encodeURIComponent(dolphinSvg)}`;

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (v > 0.85) {
                if (!isFullyRevealed) {
                    setIsFullyRevealed(true);
                    // Trigger celebration
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                setIsFullyRevealed(false);
            }
        });
        return () => unsubscribe();
    }, [smoothProgress, isFullyRevealed]);

    useEffect(() => {
        if (isFullyRevealed) {
            const timer = setInterval(() => {
                const scalar = 2;
                const heart = confetti.shapeFromText({ text: '❤️', scalar });
                const dolphin = confetti.shapeFromText({ text: '🐬', scalar });

                confetti({
                    particleCount: 1,
                    scalar: scalar,
                    shapes: [heart, dolphin],
                    startVelocity: 0,
                    gravity: 0.5,
                    origin: { x: Math.random(), y: 0 },
                    drift: (Math.random() - 0.5) * 2,
                    ticks: 60
                });
            }, 800);
            return () => clearInterval(timer);
        }
    }, [isFullyRevealed]);

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full">
            <div className="sticky top-0 h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-blue-50 z-40">

                {/* The Image with Mask */}
                <motion.div
                    className="absolute inset-0 z-10 w-full h-full"
                    style={{
                        backgroundImage: `url(${diduImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        maskImage: isFullyRevealed ? 'none' : `url('${dolphinUrl}')`,
                        WebkitMaskImage: isFullyRevealed ? 'none' : `url('${dolphinUrl}')`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        maskSize: maskSize,
                        WebkitMaskSize: maskSize,
                        backfaceVisibility: 'hidden',
                        willChange: 'mask-size, -webkit-mask-size'
                    }}
                />

                {/* Placeholder background behind the image (visible before reveal) */}
                {!isFullyRevealed && (
                    <div className="absolute inset-0 bg-blue-50 z-0" />
                )}

                {/* Scroll Hint Overlay */}
                <motion.div
                    style={{ opacity: hintOpacity }}
                    className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none"
                >
                    <p className="text-blue-400 font-pacifico text-2xl mb-2 animate-pulse">Scroll to Reveal</p>
                    <ChevronDown className="text-blue-400 animate-bounce" size={32} />
                </motion.div>

                {/* Decoration Layer (Hearts & Caption) */}
                {isFullyRevealed && (
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                        {/* Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-20 w-full text-center"
                        >
                            <h2 className="text-4xl font-pacifico text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                                A Beautiful Soul ✨
                            </h2>
                        </motion.div>

                        {/* Floating Hearts */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 100, x: Math.random() * 200 - 100 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: -window.innerHeight,
                                    x: Math.random() * 200 - 100
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5 + Math.random() * 5,
                                    delay: Math.random() * 2,
                                    ease: "linear"
                                }}
                                className="absolute bottom-0 left-1/2"
                            >
                                <Heart size={30 + Math.random() * 20} className="text-pink-400 fill-pink-400 drop-shadow-lg" />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Continue Button (appears when fully revealed) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: isFullyRevealed ? 1 : 0,
                        y: isFullyRevealed ? 0 : 20,
                        pointerEvents: isFullyRevealed ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-10 z-30"
                >
                    <button
                        onClick={onComplete}
                        className="px-8 py-3 bg-white/90 backdrop-blur text-pink-500 rounded-full font-bold shadow-xl hover:bg-white hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <span>Continue Journey</span>
                        <ArrowRight size={20} />
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default DolphinReveal;
