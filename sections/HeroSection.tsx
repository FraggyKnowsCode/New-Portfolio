import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { heroPillars } from '../data/portfolioData';
import heroBgVideo from '/images/heroBG.mp4';

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

// --- Typewriter Component ---
const TypewriterText: React.FC<{ words: string[] }> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterWord = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then delete
          setTimeout(() => setIsDeleting(true), pauseAfterWord);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse text-[#F5F2EB]/80 font-light ml-0.5">|</span>
    </span>
  );
};

// --- Reusable TextBlock Component ---
const TextBlock = ({ 
  lines, 
  colorClass, 
  typewriterWords,
  isUppercase = false,
  isWordBased = false,
}: { 
  lines: string[][], 
  colorClass: string,
  typewriterWords?: string[],
  isUppercase?: boolean,
  isWordBased?: boolean,
}) => (
  <motion.h1
    className={`font-bold ${colorClass} ${isUppercase ? 'uppercase' : ''} tracking-tight text-left leading-[0.95] sm:leading-[0.92] select-none max-w-full`}
    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 8vw, 7.5rem)' }}
    variants={sentence}
    initial="hidden"
    animate="visible"
    aria-hidden="true"
  >
    <span className="block">
      {lines[0].map((item, index) => (
        <motion.span 
          key={`l1-${item}-${index}`} 
          variants={letter} 
          className={`inline-block ${isWordBased ? 'mr-2 sm:mr-3 md:mr-4 last:mr-0' : ''}`}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </span>
    <span className="block">
      {lines[1].map((item, index) => (
        <motion.span 
          key={`l2-${item}-${index}`} 
          variants={letter} 
          className={`inline-block ${isWordBased ? 'mr-2 sm:mr-3 md:mr-4 last:mr-0' : ''}`}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </span>
    <span className="block max-w-full overflow-hidden">
      {typewriterWords ? (
        <motion.span variants={letter} className="inline-block whitespace-nowrap">
          <TypewriterText words={typewriterWords} />
        </motion.span>
      ) : (
        lines[2].map((item, index) => (
          <motion.span 
            key={`l3-${item}-${index}`} 
            variants={letter} 
            className={`inline-block ${isWordBased ? 'mr-2 sm:mr-3 md:mr-4 last:mr-0' : ''}`}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        ))
      )}
    </span>
  </motion.h1>
);

// --- HeroSection Component ---

interface HeroSectionProps {
  isLoading?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoading = false }) => {
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);

  const isDesktop = windowSize.width >= 768;

  const setBgVideoRef = (el: HTMLVideoElement | null) => {
    bgVideoRef.current = el;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      el.playsInline = true;
      el.setAttribute('playsinline', '');
      el.setAttribute('webkit-playsinline', '');
      el.setAttribute('x5-playsinline', '');
    }
  };

  const setZoomVideoRef = (el: HTMLVideoElement | null) => {
    zoomVideoRef.current = el;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      el.playsInline = true;
      el.setAttribute('playsinline', '');
      el.setAttribute('webkit-playsinline', '');
      el.setAttribute('x5-playsinline', '');
    }
  };

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

  // Primary video playback setup with mobile & CDN autoplay fallbacks
  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    if (!bgVideo) return;

    bgVideo.defaultMuted = true;
    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.setAttribute('playsinline', '');
    bgVideo.setAttribute('webkit-playsinline', '');
    bgVideo.setAttribute('x5-playsinline', '');

    const tryPlay = () => {
      if (bgVideo && bgVideo.paused) {
        const promise = bgVideo.play();
        if (promise !== undefined) {
          promise.catch((err) => {
            console.log('Hero video autoplay waiting for user interaction:', err);
          });
        }
      }
    };

    // If loader is finished and video is fully visible on screen, trigger playback
    if (!isLoading) {
      tryPlay();
    }

    bgVideo.addEventListener('loadeddata', tryPlay);
    bgVideo.addEventListener('canplay', tryPlay);

    // Continuous user interaction handler:
    const handleUserGesture = () => {
      if (bgVideo && bgVideo.paused) {
        bgVideo.defaultMuted = true;
        bgVideo.muted = true;
        bgVideo.play().then(() => {
          removeGestureListeners();
        }).catch(() => {});
      } else {
        removeGestureListeners();
      }
    };

    const removeGestureListeners = () => {
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('touchend', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('scroll', handleUserGesture);
    };

    window.addEventListener('touchstart', handleUserGesture, { passive: true });
    window.addEventListener('touchend', handleUserGesture, { passive: true });
    window.addEventListener('click', handleUserGesture);
    window.addEventListener('scroll', handleUserGesture, { passive: true });

    const handlePlaying = () => {
      removeGestureListeners();
    };
    bgVideo.addEventListener('playing', handlePlaying);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && !isLoading) {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      bgVideo.removeEventListener('playing', handlePlaying);
      bgVideo.removeEventListener('loadeddata', tryPlay);
      bgVideo.removeEventListener('canplay', tryPlay);
      removeGestureListeners();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isLoading]);

  // Play zoom bubble video in tandem with background video (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const bgVideo = bgVideoRef.current;
    const zoomVideo = zoomVideoRef.current;
    if (!bgVideo || !zoomVideo) return;

    zoomVideo.defaultMuted = true;
    zoomVideo.muted = true;
    zoomVideo.playsInline = true;
    zoomVideo.setAttribute('playsinline', '');
    zoomVideo.setAttribute('webkit-playsinline', '');
    zoomVideo.setAttribute('x5-playsinline', '');

    const handlePlay = () => {
      zoomVideo.play().catch(() => {});
    };

    const handlePause = () => {
      zoomVideo.pause();
    };

    // When background loops or seeks, sync zoom video once
    const handleSeeked = () => {
      if (Math.abs(zoomVideo.currentTime - bgVideo.currentTime) > 0.4) {
        zoomVideo.currentTime = bgVideo.currentTime;
      }
    };

    bgVideo.addEventListener('play', handlePlay);
    bgVideo.addEventListener('pause', handlePause);
    bgVideo.addEventListener('seeked', handleSeeked);

    if (!bgVideo.paused && zoomVideo.paused) {
      zoomVideo.play().catch(() => {});
    }

    return () => {
      bgVideo.removeEventListener('play', handlePlay);
      bgVideo.removeEventListener('pause', handlePause);
      bgVideo.removeEventListener('seeked', handleSeeked);
    };
  }, [isDesktop]);

  const typewriterWords = ['Experiences.','Journeys.', 'Connections.', 'Possibilities.', 'Frontiers.'];

  const englishLines = [
    "I make".split(""),
    "new".split(""),
    []
  ];

  // Intact Bengali words prevent vowel-sign/conjunct detachment
  const banglaLines = [
    ["আমি", "নতুন"],
    ["কিছু"],
    ["তৈরি", "করি!"],
  ];

  const cursorSize = 300;
  const scale = 1.6;
  
  // Calculate translation to keep magnified text centered under cursor
  const tx = -(x - windowSize.width / 2) * (scale - 1);
  const ty = -(y - windowSize.height / 2) * (scale - 1);

  return (
    <section id="home" className="h-screen relative overflow-hidden bg-[#050505]">
      {/* --- 1. Background Video Layer (z-0) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <video
          ref={setBgVideoRef}
          src={heroBgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* --- 2. English Layer (Base) - z-20 --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 sm:px-6 md:px-10 lg:px-12 pb-24 sm:pb-20 md:pb-24 pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 w-full">
          {/* Headline on Far Bottom Left */}
          <div className="pointer-events-auto">
            <TextBlock 
              lines={englishLines} 
              colorClass="text-[#F5F2EB]" 
              typewriterWords={typewriterWords} 
              isUppercase={true}
            />
          </div>

          {/* Subtitle & Explore Work Button on Bottom Right */}
          <div className="pointer-events-auto max-w-sm lg:max-w-md flex flex-col items-start gap-3 sm:gap-4 pb-2">
            <p className="text-xs sm:text-sm md:text-base text-[#DDD8CE] font-normal leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              It is a personal portfolio website led by Fahad Sikder, bridging machine learning, clean full-stack web architectures and cinematic visual storytelling to solve real-world problems.
            </p>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.querySelector('#work');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F5F2EB] text-[#121212] font-semibold text-xs sm:text-sm hover:bg-white hover:scale-105 transition-all shadow-lg group cursor-pointer"
            >
              <span>Explore Work</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#121212] text-[#F5F2EB] flex items-center justify-center text-[10px] sm:text-xs group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* --- 3. Bangla Layer (Clipped & Magnified) - z-30 (Desktop only) --- */}
      {isDesktop && (
        <div
          className="hidden md:block absolute inset-0 z-30 overflow-hidden pointer-events-none"
          style={{
            clipPath: `circle(${cursorSize / 2}px at ${x}px ${y}px)`
          }}
        >
          <motion.div
              className="w-full h-full relative"
              animate={{
                  scale,
                  translateX: tx,
                  translateY: ty,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {/* Zoomed Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
              <video
                ref={setZoomVideoRef}
                src={heroBgVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            
            {/* Zoomed Bangla Content Layer */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-10 lg:px-12 pb-20 md:pb-24">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 w-full">
                {/* Zoomed Bangla Text */}
                <div 
                  className="normal-case"
                  style={{ fontFamily: '"Hind Siliguri", "Noto Sans Bengali", "Noto Serif Bengali", sans-serif' }}
                >
                  <TextBlock 
                    lines={banglaLines} 
                    colorClass="text-[#F5F2EB]" 
                    isWordBased={true}
                  />
                </div>

                {/* Zoomed Right Content */}
                <div className="max-w-sm lg:max-w-md flex flex-col items-start gap-4 pb-2">
                  <p className="text-sm md:text-base text-[#DDD8CE] font-normal leading-relaxed">
                    It is a personal portfolio website led by Fahad Sikder, bridging machine learning, clean full-stack web architectures and cinematic visual storytelling to solve real-world problems.
                  </p>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F5F2EB] text-[#121212] font-semibold text-sm">
                    <span>Explore Work</span>
                    <span className="w-5 h-5 rounded-full bg-[#121212] text-[#F5F2EB] flex items-center justify-center text-xs">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      )}

      {/* --- 4. Bottom Micro-Bar with Identity Pillars - z-25 --- */}
      <div className="hero-pillar-bar">
        <div className="pillar-items">
          {heroPillars.map((pillar, idx) => (
            <span key={idx} className="pillar-item">
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;