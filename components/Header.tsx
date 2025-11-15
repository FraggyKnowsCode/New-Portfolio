import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Custom Smooth Scroll Implementation ---
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const customSmoothScroll = (targetId: string, duration: number = 1500) => {
  const targetElement = document.querySelector(targetId) as HTMLElement;
  if (!targetElement) {
    console.warn(`Target element not found for id: ${targetId}`);
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
// --- End Custom Smooth Scroll ---

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the header once the user scrolls past the hero section (100vh)
      setIsVisible(window.scrollY < window.innerHeight);

      // Apply a background effect after a small scroll
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Work', 'About', 'Contact'];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    customSmoothScroll(targetId, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-40"
          initial={{ y: '-100%' }}
          animate={{
            y: '0%',
            backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* --- UPDATED LINK --- */}
            <a 
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              // Applied font, increased size, removed bold/tracking
              className="text-4xl text-white" 
              style={{ fontFamily: '"Dr Sugiyama", cursive' }}
            >
              Fahad Sikder
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const href = `#${item.toLowerCase()}`;
                return (
                  <a
                    key={item}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="text-white hover:opacity-75 transition-opacity duration-300"
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;