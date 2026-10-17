import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { impactMetrics } from '../data/portfolioData';

// ─── Count-Up Hook ───────────────────────────────────────────
const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
};

// ─── Section Index Bar ───────────────────────────────────────
const SectionIndexBar: React.FC<{ index: string; title: string; rightLabel: string }> = ({
  index,
  title,
  rightLabel,
}) => (
  <div className="section-index-bar">
    <div className="index-left">
      <span className="accent-square">■</span>
      <span>{index} / {title}</span>
    </div>
    <div className="index-right hidden sm:block">{rightLabel}</div>
  </div>
);

// ─── Smooth Scroll Helper ───────────────────────────────────
const smoothScrollTo = (target: string) => {
  const el = document.querySelector(target);
  el?.scrollIntoView({ behavior: 'smooth' });
};

// ─── Impact Grid Section ────────────────────────────────────
const ImpactGridSection: React.FC = () => {
  const primaryMetric = useCountUp(impactMetrics.primary.value, 2500);
  const secondaryMetrics = impactMetrics.secondary.map((m) => useCountUp(m.value, 1800));

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="impact" className="bg-black">
      <div className="editorial-section">
        {/* Section Index Bar */}
        <SectionIndexBar index="01" title="THE WORK, IN FOCUS" rightLabel="RESEARCH. ENGINEERING. LEADERSHIP." />

        {/* Editorial Split Header Row */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="flex-1">
            <h2
              className="font-serif leading-[1.08]"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 4.5rem)' }}
            >
              <span className="block">{impactMetrics.editorialHeadline.line1}</span>
              <span className="block italic">{impactMetrics.editorialHeadline.line2}</span>
            </h2>
          </div>
          <div className="lg:max-w-xs lg:text-right">
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              "{impactMetrics.editorialTagline}"
            </p>
          </div>
        </motion.div>

        {/* Primary Hero Metric Row */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 pb-12 hairline-border-b"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {/* Left: Giant number */}
          <div ref={primaryMetric.ref} className="flex-shrink-0">
            <span
              className="metric-number count-up-animated"
              style={{ fontSize: 'clamp(5rem, 11vw, 9.5rem)' }}
            >
              {primaryMetric.count.toLocaleString()}
              <span className="accent-suffix">{impactMetrics.primary.suffix}</span>
            </span>
          </div>

          {/* Right: Description */}
          <div className="flex-1 max-w-xl pb-3">
            <h3 className="font-serif text-[28px] md:text-[32px] text-white leading-tight mb-3">
              {impactMetrics.primary.headline}
            </h3>
            <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {impactMetrics.primary.description}
            </p>
            <button
              onClick={() => smoothScrollTo(impactMetrics.primary.ctaTarget)}
              className="action-link"
            >
              {impactMetrics.primary.ctaText}
            </button>
          </div>
        </motion.div>

        {/* Secondary 3-Column Hairline Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Column 1 */}
          <motion.div
            className="py-8 md:pr-8 hairline-border-t md:hairline-border-t-0"
            variants={fadeUp}
          >
            <div ref={secondaryMetrics[0].ref}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="metric-number"
                  style={{ fontSize: 'clamp(3.25rem, 6vw, 5rem)' }}
                >
                  {secondaryMetrics[0].count}
                  <span className="accent-suffix">{impactMetrics.secondary[0].suffix}</span>
                </span>
                {impactMetrics.secondary[0].badge && (
                  <span className="status-badge accepted" style={{ fontSize: '9px', padding: '0.25rem 0.65rem' }}>
                    <span className="status-dot" />
                    {impactMetrics.secondary[0].badge}
                  </span>
                )}
              </div>
            </div>
            <h4 className="text-[15px] font-semibold text-white mb-2">
              {impactMetrics.secondary[0].title}
            </h4>
            <p className="text-[13px] leading-relaxed" style={{ color: '#A3A3A3' }}>
              {impactMetrics.secondary[0].description}
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            className="py-8 md:px-8 hairline-border-t md:hairline-border-l md:hairline-border-t-0"
            variants={fadeUp}
          >
            <div ref={secondaryMetrics[1].ref}>
              <span
                className="metric-number block mb-4"
                style={{ fontSize: 'clamp(3.25rem, 6vw, 5rem)' }}
              >
                {secondaryMetrics[1].count}
                <span className="accent-suffix">{impactMetrics.secondary[1].suffix}</span>
              </span>
            </div>
            <h4 className="text-[15px] font-semibold text-white mb-2">
              {impactMetrics.secondary[1].title}
            </h4>
            <p className="text-[13px] leading-relaxed" style={{ color: '#A3A3A3' }}>
              {impactMetrics.secondary[1].description}
            </p>
          </motion.div>

          {/* Column 3: Pull Quote */}
          <motion.div
            className="py-8 md:pl-8 hairline-border-t md:hairline-border-l md:hairline-border-t-0"
            variants={fadeUp}
          >
            <span className="micro-label block mb-4">THE CORE PHILOSOPHY</span>
            <blockquote
              className="font-serif leading-[1.25]"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              {impactMetrics.pullQuote.map((line, i) => (
                <span key={i} className={`block ${line.italic ? 'italic' : ''}`}>
                  {line.text}
                </span>
              ))}
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactGridSection;
