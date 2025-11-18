import React from 'react';
import { motion } from 'framer-motion';

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MonopoLogo: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
        <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="2"/>
        <circle cx="13" cy="20" r="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="27" cy="20" r="2" stroke="white" strokeWidth="1.5"/>
        <path d="M15 20C15 17.2386 17.2386 15 20 15C22.7614 15 25 17.2386 25 20" stroke="white" strokeWidth="1.5"/>
        <path d="M15 20C15 22.7614 17.2386 25 20 25C22.7614 25 25 22.7614 25 20" stroke="white" strokeWidth="1.5"/>
    </svg>
);

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


const Footer: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      customSmoothScroll(targetId, 1500);
    };

    const handleScrollToTop = () => {
        customSmoothScroll('#home', 1500);
    };

  return (
    <motion.footer 
        id="contact" 
        className="bg-black text-white py-20 px-6 md:px-12 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Column 1: Contact Info */}
          <motion.div className="lg:col-span-5" variants={itemVariant}>
            <MonopoLogo />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              I would love to hear from you.
            </h2>
            <p className="text-gray-400 mb-8">
              Feel free to reach out if you want to collaborate with me, or simply have a chat.
            </p>
            <a href="mailto:fahadsikder29@gmail.com" className="text-lg sm:text-xl md:text-2xl font-medium hover:opacity-75 transition-opacity">
              fahadsikder29@gmail.com &rarr;
            </a>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Column 2: Address */}
          <motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
            <h3 className="font-bold uppercase tracking-wider mb-4">My Address</h3>
            <p className="text-gray-400 leading-relaxed">
              14 No Building, Govt CGS Colony<br />
              Agrabad Access Road, Agrabad<br />
              ChittagongF<br />
              Bangladesh
            </p>
            <p className="text-gray-400 mt-6 leading-relaxed">
                Registered in Chittagong, Bangladesh
            </p>
          </motion.div>

          {/* Column 3: Follow Me */}
<motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
  <h3 className="font-bold uppercase tracking-wider mb-4">Follow Me</h3>
  
  {/* --- Icon Links --- */}
  <div className="flex space-x-4 text-gray-400 mb-6">
    
    {/* Facebook Icon */}
    <a 
      href="https://www.facebook.com/FSikder.25/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-white transition-colors"
      aria-label="Facebook"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    </a>
    
    {/* Instagram Icon */}
    <a 
      href="https://www.instagram.com/ig.fraggy" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-white transition-colors"
      aria-label="Instagram"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    </a>
    
    {/* LinkedIn Icon */}
    <a 
      href="https://www.linkedin.com/in/fsikder25/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-white transition-colors"
      aria-label="LinkedIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>

    {/* === GITHUB ICON (NEW) === */}
    <a 
      href="https://github.com/FraggyKnowsCode" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-white transition-colors"
      aria-label="GitHub"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5.08-1.3-.3-2.5-1-3.5.1-.3.1-1 0-1.4a3.5 3.5 0 0 0-1-2.5c-.2-.1-.5-.1-.8.1-.5.2-1 .4-1.5.7C14.3 2.1 13.2 2 12 2s-2.3.1-3.4.7c-.5-.3-1-.5-1.5-.7-.3-.1-.5-.2-.8-.1a3.5 3.5 0 0 0-1 2.5c-.1.4-.1.9 0 1.4-.7 1-1.1 2.2-1 3.5 0 5 3 6.5 6 6.5-1 1-1 2.5-1 3.5V22"></path>
      </svg>
    </a>

  </div>

  
</motion.div>

          {/* Column 4: Sitemap */}
          <motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
             <ul className="space-y-2 text-gray-300">
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-white font-bold text-white transition-colors"><span className="mr-2"></span>HOME</a></li>
                <li><a href="#work" onClick={(e) => handleNavClick(e, '#work')} className="hover:text-white transition-colors">WORK</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">ABOUT</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">CONTACT</a></li>
             </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p className="mb-4 md:mb-0 text-center md:text-left">&copy; MD FAHAD SIKDER 2025 All rights reserved</p>
            <button 
                onClick={handleScrollToTop}
                className="w-20 h-20 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Scroll to top"
            >
                TOP &uarr;
            </button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;