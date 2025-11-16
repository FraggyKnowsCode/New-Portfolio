import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// FIX: Trying a path relative to the project's baseUrl.
import { useMousePosition } from '../hooks/useMousePosition'; 

// DO NOT IMPORT the background image. It's in the public folder.

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
const TextBlock = ({ lines, colorClass }: { 
  lines: string[][], 
  colorClass: string,
}) => (
  <motion.h1
    className={`text-5xl md:text-8xl lg:text-9xl font-bold text-white uppercase tracking-tighter text-center`}
    variants={sentence}
    initial="hidden"
    animate="visible"
    aria-hidden="true"
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

  const cursorSize = 300;
  const scale = 1.6; 
  
  const tx = -(x - windowSize.width / 2) * (scale - 1);
  const ty = -(y - windowSize.height / 2) * (scale - 1);

  return (
    <section id="home" className="h-screen relative overflow-hidden">
      
      {/* --- 1. Background Image Layer (z-0) --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          // FIX: Use the simple string path.
          backgroundImage: `url('/images/hero-bg.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* --- 2. English Layer (Base) - z-20 --- */}
      <div className="absolute inset-0 flex items-center justify-center z-20" role="heading" aria-level={1}>
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
              // FIX: Use the simple string path here too.
              backgroundImage: `url('/images/hero-bg.jpg')`
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          {/* Zoomed Bangla Text */}
          <div 
            className="relative z-10 normal-case" 
            style={{ fontFamily: '"Noto Serif Bengali", serif' }} 
          >
            <TextBlock 
              lines={banglaLines} 
              colorClass="text-white" 
            />
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;