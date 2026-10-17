import React from 'react';
import { motion } from 'framer-motion';
import { contactInfo, socialLinks, footerNavItems } from '../data/portfolioData';

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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

// Reusable Social Icons for Footer
const FooterSocialIcons: React.FC = () => (
  <div className="flex space-x-4" style={{ color: 'var(--text-muted)' }}>
    {/* Facebook */}
    <a
      href={socialLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="Facebook"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    </a>
    {/* Instagram */}
    <a
      href={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors duration-300"
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="Instagram"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="LinkedIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      aria-label="GitHub"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5.08-1.3-.3-2.5-1-3.5.1-.3.1-1 0-1.4a3.5 3.5 0 0 0-1-2.5c-.2-.1-.5-.1-.8.1-.5.2-1 .4-1.5.7C14.3 2.1 13.2 2 12 2s-2.3.1-3.4.7c-.5-.3-1-.5-1.5-.7-.3-.1-.5-.2-.8-.1a3.5 3.5 0 0 0-1 2.5c-.1.4-.1.9 0 1.4-.7 1-1.1 2.2-1 3.5 0 5 3 6.5 6 6.5-1 1-1 2.5-1 3.5V22" />
      </svg>
    </a>
  </div>
);

// Map footer nav labels to scroll targets
const navTargetMap: Record<string, string> = {
  WORK: '#work',
  IMPACT: '#impact',
  RESEARCH: '#ml-research',
  ABOUT: '#about',
  CONTACT: '#contact',
};

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    customSmoothScroll(targetId, 1500);
  };

  return (
    <motion.footer
      id="contact"
      className="text-white py-20 px-6 md:px-12 relative"
      style={{ background: 'var(--bg-canvas)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Section Index Bar */}
      <div className="container mx-auto mb-12">
        <div className="section-index-bar">
          <div className="index-left">
            <span className="accent-square">■</span>
            <span>05 / CONTACT</span>
          </div>
          <div className="index-right">CONNECT. COLLABORATE. CREATE.</div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Column 1: Contact Info */}
          <motion.div className="lg:col-span-5" variants={itemVariant}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {contactInfo.heading}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {contactInfo.subtext}
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-lg sm:text-xl md:text-2xl font-medium transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {contactInfo.email} →
            </a>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 2: Address */}
          <motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
            <h3
              className="font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em' }}
            >
              My Address
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {contactInfo.address.line1}<br />
              {contactInfo.address.line2}
            </p>
            <p className="mt-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {contactInfo.address.registered}
            </p>
          </motion.div>

          {/* Column 3: Follow Me */}
          <motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
            <h3
              className="font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em' }}
            >
              Follow Me
            </h3>
            <FooterSocialIcons />
          </motion.div>

          {/* Column 4: Sitemap: Now includes all 5 sections */}
          <motion.div className="lg:col-span-2 text-sm" variants={itemVariant}>
            <h3
              className="font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em' }}
            >
              Sitemap
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="font-bold text-white transition-colors duration-300 cursor-pointer"
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  HOME
                </a>
              </li>
              {footerNavItems.map((item) => (
                <li key={item}>
                  <a
                    href={navTargetMap[item]}
                    onClick={(e) => handleNavClick(e, navTargetMap[item])}
                    className="transition-colors duration-300 cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs"
          style={{ borderTop: '1px solid var(--border-hairline)', color: 'var(--text-muted)' }}
        >
          <p
            className="mb-4 md:mb-0 text-center md:text-left"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
          >
            {contactInfo.copyright}
          </p>
          <button
            onClick={() => customSmoothScroll('#home', 1500)}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;