import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// FIX: Changed to root-relative paths.
import { useMousePosition } from '../hooks/useMousePosition'; // Make sure this path is correct
import heroBg from '/images/hero-bg.jpg'; // Make sure this path is correct

// --- Text Animation Variants ---

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// --- Reusable TextBlock Component ---
// (No changes to this component)
const TextBlock = ({ lines, colorClass }: { 
  lines: string[][], 
  colorClass: string,
}) => (
  <motion.h1
    className={`text-5xl md:text-8xl lg:text-9xl font-bold text-white uppercase tracking-tighter text-center`}
    variants={sentence}
    initial="hidden"
    animate="visible"
    aria-hidden="true" // Hide from screen readers to avoid duplication
  >
    <span className="block">
      {lines[0].map((char, index) => (
        <motion.span key={`l1-${char}-${index}`} variants={letter}>
          {char}
        </motion.span>
      ))}
    </span>
    <span className={`block ${colorClass}`}>
      {lines[1].map((char, index) => (
        <motion.span key={`l2-${char}-${index}`} variants={letter}>
          {char}
        </motion.span>
      ))}
    </span>
    <span className="block">
      {lines[2].map((char, index) => (
        <motion.span key={`l3-${char}-${index}`} variants={letter}>
          {char}
        </motion.span>
      ))}
    </span>
  </motion.h1>
);

// --- HeroSection Component ---

const HeroSection: React.FC = () => {
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const englishLines = [
    "I make".split(""),
    "new".split(""),
    "experiences.".split(""),
  ];

  const banglaLines = [
    "আমি নতুন".split(""),
    "কিছু".split(""),
    "তৈরি করি!".split(""),
  ];

  const cursorSize = windowSize.width < 768 ? 150 : 300; // Adjust bubble size for mobile
  const scale = windowSize.width < 768 ? 1.2 : 1.6; // Adjust zoom factor for mobile
  
  // Calculate translation to keep magnified text centered under cursor
  const tx = -(x - windowSize.width / 2) * (scale - 1);
  const ty = -(y - windowSize.height / 2) * (scale - 1);

  return (
    <section id="home" className="h-screen relative overflow-hidden">
      {/* --- 1. Background Image Layer (z-0) --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* --- 2. English Layer (Base) - z-20 --- */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4 md:px-0">
         <TextBlock lines={englishLines} colorClass="text-white" />
      </div>

      {/* --- 3. Bangla Layer (Clipped & Magnified) - z-30 --- */}
      <div
        className="absolute inset-0 flex items-center justify-center z-30 overflow-hidden"
        style={{
          clipPath: `circle(${cursorSize / 2}px at ${x}px ${y}px)`
        }}
      >
        <motion.div
            className="w-full h-full flex items-center justify-center relative z-10"
            animate={{
                scale,
                translateX: tx,
                translateY: ty,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Zoomed Background */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBg})`
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          {/* --- UPDATED BLOCK START --- */}
          {/* Zoomed Bangla Text */}
          <div 
            className="relative z-10 normal-case px-4 md:px-0"
            style={{ fontFamily: '"Noto Serif Bengali", serif' }}
          >
            <TextBlock 
              lines={banglaLines} 
              colorClass="text-white" 
            />
          </div>
          {/* --- UPDATED BLOCK END --- */}
          
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;