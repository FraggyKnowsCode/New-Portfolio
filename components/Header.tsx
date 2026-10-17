import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { navItems, socialLinks } from '../data/portfolioData';

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

// Social icon components
const SocialIcons: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <div className={`flex items-center space-x-4 ${className}`}>
    {/* Facebook */}
    <a
      href={socialLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="Facebook"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    </a>
    {/* Instagram */}
    <a
      href={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="Instagram"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </a>
    {/* LinkedIn */}
    <a
      href={socialLinks.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="LinkedIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </a>
    {/* GitHub */}
    <a
      href={socialLinks.github}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="GitHub"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5.08-1.3-.3-2.5-1-3.5.1-.3.1-1 0-1.4a3.5 3.5 0 0 0-1-2.5c-.2-.1-.5-.1-.8.1-.5.2-1 .4-1.5.7C14.3 2.1 13.2 2 12 2s-2.3.1-3.4.7c-.5-.3-1-.5-1.5-.7-.3-.1-.5-.2-.8-.1a3.5 3.5 0 0 0-1 2.5c-.1.4-.1.9 0 1.4-.7 1-1.1 2.2-1 3.5 0 5 3 6.5 6 6.5-1 1-1 2.5-1 3.5V22" />
      </svg>
    </a>
  </div>
);

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      window.location.href = `/${targetId}`;
      return;
    }

    customSmoothScroll(targetId, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 w-full"
          initial={{ y: '-100%' }}
          animate={{
            y: '0%',
            backgroundColor: scrolled ? 'var(--bg-glass)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4 flex justify-between items-center">
            {/* Left: Logo + Desktop nav */}
            <div className="flex items-center space-x-6 sm:space-x-8 min-w-0">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
                className="text-2xl sm:text-3xl md:text-4xl text-white cursor-pointer whitespace-nowrap font-brand"
                style={{ fontFamily: 'var(--font-brand)' }}
              >
                Fahad Sikder
              </a>

              {/* Desktop nav: now includes all 5 items from portfolioData */}
              <nav className="hidden md:flex items-center space-x-4 sm:space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-white transition-colors duration-300 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right: Social Links */}
            <SocialIcons className="hidden md:flex ml-auto" />

            {/* Mobile burger button */}
            <div className="md:hidden flex items-center flex-shrink-0 ml-3">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="p-1.5 sm:p-2 rounded-md text-white hover:text-white/80 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
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
              className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 p-6"
              style={{ background: 'rgba(0, 0, 0, 0.95)' }}
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

              <a
                href="/"
                onClick={(e) => { e.preventDefault(); window.location.href = '/'; setMenuOpen(false); }}
                className="text-3xl sm:text-4xl text-white font-semibold tracking-wide"
              >
                Home
              </a>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { handleNavClick(e, item.href); setMenuOpen(false); }}
                  className="text-3xl sm:text-4xl text-white font-semibold tracking-wide"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Social Icons */}
              <SocialIcons size={24} className="mt-12" />
            </motion.nav>
          )}
        </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default Header;