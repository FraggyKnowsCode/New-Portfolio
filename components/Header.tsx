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
  const [menuOpen, setMenuOpen] = useState(false);

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
        <>
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
          <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 flex justify-between items-center">
            <a 
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-3xl sm:text-4xl text-white"
              style={{ fontFamily: '"Dr Sugiyama", cursive' }}
            >
              Fahad Sikder
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-4 sm:space-x-8">
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

            {/* Mobile burger button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                  <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile overlay menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center space-y-8 p-6"
              aria-modal="true"
              role="dialog"
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 p-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {navItems.map((item) => {
                const href = `#${item.toLowerCase()}`;
                return (
                  <a
                    key={item}
                    href={href}
                    onClick={(e) => { handleNavClick(e, href); setMenuOpen(false); }}
                    className="text-3xl sm:text-4xl text-white font-semibold tracking-wide"
                  >
                    {item}
                  </a>
                );
              })}

              <a href="#contact" onClick={(e) => { handleNavClick(e, '#contact'); setMenuOpen(false); }} className="mt-6 text-white/80">Get in touch</a>
            </motion.nav>
          )}
        </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default Header;