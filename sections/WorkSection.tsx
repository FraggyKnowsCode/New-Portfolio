import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';
import { projectsDataEnhanced } from '../data/portfolioData';

// --- Animation Variants ---
const titleVariants: Variants = {
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const letterVariants: Variants = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const SectionIndexBar: React.FC<{ index: string; title: string; rightLabel: string }> = ({
  index,
  title,
  rightLabel,
}) => (
  <div className="section-index-bar" style={{ margin: '0 0 0.5rem 0' }}>
    <div className="index-left">
      <span className="accent-square">■</span>
      <span>{index} / {title}</span>
    </div>
    <div className="index-right hidden sm:block">{rightLabel}</div>
  </div>
);

// --- WorkSection Component ---
const WorkSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const recentProjects = projectsDataEnhanced.slice(0, 5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.min(recentProjects.length - 1, Math.floor(latest * recentProjects.length));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const activeProject = recentProjects[activeIndex];

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${recentProjects.length * 130}vh` }}
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Top Header Bar Pinned inside Sticky Viewport */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-4 sm:pt-6 px-4 sm:px-8 md:px-16 lg:px-20 pointer-events-none">
          <SectionIndexBar index="03" title="SELECTED WORK" rightLabel="BUILD. SHIP. ITERATE." />
        </div>

        {/* Left Side: Scroll Indicator & Project Info */}
        <div className="absolute left-0 top-0 h-full w-full md:w-2/5 flex items-center pl-4 pr-4 sm:pl-8 sm:pr-8 md:pl-16 md:pr-0 lg:pl-20 z-20 text-white pointer-events-none pt-12 md:pt-0">
          <div className="flex items-start space-x-4 md:space-x-8 w-full max-w-lg md:max-w-md">
            {/* Scroll Indicator */}
            <div className="flex-shrink-0 relative h-72 hidden md:block">
              <span
                className="absolute top-0 left-0 text-xs tracking-[0.3em] uppercase text-gray-500 origin-top-left"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                }}
              >
                Recent Work
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-8 h-48 w-px bg-gray-700">
                {recentProjects.map((_, index) => (
                  <div
                    key={`dot-${index}`}
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-700 rounded-full"
                    style={{ top: `${(index / (recentProjects.length - 1)) * 100}%` }}
                  />
                ))}
              </div>
              <motion.div
                className="absolute left-8 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent"
                style={{ transform: 'translateY(-50%)', borderLeftColor: 'var(--accent-orange)' }}
                animate={{ top: `${(activeIndex / (recentProjects.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Project Info */}
            <div className="overflow-hidden w-full max-w-lg md:max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={titleVariants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  className="flex flex-col pointer-events-auto"
                >
                  {/* Title */}
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {activeProject.title.map((line, lineIndex) => (
                      <span key={lineIndex} className="block overflow-hidden">
                        <motion.span className="block" variants={letterVariants}>
                          {line}
                        </motion.span>
                      </span>
                    ))}
                    <span
                      className="block text-xs sm:text-sm font-bold normal-case mt-1.5 sm:mt-2"
                      style={{
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <motion.span className="block" variants={letterVariants}>
                        {activeProject.categoryTag}
                      </motion.span>
                    </span>
                  </motion.h2>

                  {/* Mobile Project Thumbnail (Prominently visible on mobile screens) */}
                  <motion.div
                    variants={letterVariants}
                    className="block md:hidden w-full aspect-[16/9] max-h-44 sm:max-h-52 my-3 rounded-lg overflow-hidden border relative bg-black/60 shadow-xl"
                    style={{ borderColor: 'var(--border-hairline)' }}
                  >
                    <img
                      src={activeProject.imageUrl}
                      alt={activeProject.client}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    {(activeProject.websiteUrl || activeProject.repoUrl) && (
                      <a
                        href={activeProject.websiteUrl ?? activeProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 px-2.5 py-1 text-[10px] uppercase font-mono font-bold tracking-wider bg-black/85 backdrop-blur-md text-white rounded border flex items-center gap-1 shadow-md"
                        style={{ borderColor: 'var(--border-hairline)' }}
                      >
                        Visit <span>↗</span>
                      </a>
                    )}
                  </motion.div>

                  {/* Categories */}
                  <motion.p
                    className="text-xs sm:text-sm mt-1 sm:mt-3 mb-2 sm:mb-3"
                    style={{ color: 'var(--text-muted)' }}
                    variants={letterVariants}
                  >
                    {activeProject.categories.join(' • ')}
                  </motion.p>

                  {/* 1-Sentence Summary */}
                  <motion.p
                    className="text-[12px] sm:text-[13px] leading-relaxed mb-3 sm:mb-4 max-w-sm sm:max-w-md"
                    style={{ color: 'var(--text-secondary)' }}
                    variants={letterVariants}
                  >
                    {activeProject.summary}
                  </motion.p>

                  {/* 3-Column Metric Strip */}
                  <motion.div
                    className="grid grid-cols-3 gap-0 mb-3 sm:mb-4 max-w-sm sm:max-w-md bg-black/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                    style={{ border: '1px solid var(--border-hairline)' }}
                    variants={letterVariants}
                  >
                    {activeProject.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 sm:py-2 px-2 text-center"
                        style={{
                          borderLeft: idx > 0 ? '1px solid var(--border-hairline)' : undefined,
                        }}
                      >
                        <span
                          className="block text-[11px] sm:text-[13px] font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {metric.value}
                        </span>
                        <span className="micro-label block mt-0.5 line-clamp-1" style={{ fontSize: '7.5px' }}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Tech Stack Badges */}
                  <motion.div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4" variants={letterVariants}>
                    {activeProject.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-badge text-[10px] sm:text-[11px] py-0.5 sm:py-1 px-2">
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Action Links */}
                  <motion.div className="flex gap-4" variants={letterVariants}>
                    {activeProject.websiteUrl && (
                      <a
                        href={activeProject.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link text-[11px] sm:text-[12px]"
                      >
                        Live Demo <span style={{ color: 'var(--accent-orange)' }}>↗</span>
                      </a>
                    )}
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link text-[11px] sm:text-[12px]"
                    >
                      GitHub <span style={{ color: 'var(--accent-orange)' }}>↗</span>
                    </a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop Right Side: Images with Scroll Transitions */}
        <div className="hidden md:flex md:w-3/5 md:h-[60vh] lg:h-[75vh] absolute md:right-[5%] md:top-1/2 md:-translate-y-1/2 overflow-hidden items-center justify-center">
          <AnimatePresence>
            <motion.div
              key={activeProject.imageUrl}
              className="absolute inset-0 w-full h-full group pointer-events-auto"
              initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
              exit={{ opacity: 0, scale: 0.9, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={activeProject.imageUrl}
                alt={activeProject.client}
                className="w-full h-full object-contain object-center opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black/20" />

              {/* Visit Button */}
              <a
                href={activeProject.websiteUrl ?? activeProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 z-10"
              >
                <motion.div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black text-center font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 ease-in-out cursor-pointer text-sm">
                  Visit
                </motion.div>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom "Discover All" Button */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30">
          <a
            href="/projects"
            className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
            style={{
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-secondary)',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-canvas)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            DISCOVER ALL PROJECTS →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;