import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../images/Fahad BW.png';
import { aboutBio, bentoGrid } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

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

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-black">
      <div className="editorial-section">
        {/* Section Index Bar */}
        <SectionIndexBar
          index="02"
          title="ENGINEER, RESEARCHER & LEADER"
          rightLabel="CODE. INTELLIGENCE. COMMUNITY."
        />

        {/* Lead Bio + Portrait */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Portrait */}
          <motion.div variants={fadeUp} className="relative group">
            <div className="overflow-hidden" style={{ border: '1px solid var(--border-hairline)' }}>
              <img
                src={profileImg}
                alt="Fahad Sikder - B&W Portrait"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(100%) contrast(1.05)' }}
              />
            </div>
            {/* Subtle accent bar under image */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-16 transition-all duration-500 group-hover:w-24"
              style={{ background: 'var(--accent-orange)' }}
            />
          </motion.div>

          {/* Bio Text */}
          <motion.div variants={fadeUp}>
            <h2
              className="font-serif mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              About <span className="italic">Me</span>
            </h2>
            <p
              className="text-[15px] leading-[1.75]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {aboutBio}
            </p>
          </motion.div>
        </motion.div>

        {/* 6-Cell Architectural Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {bentoGrid.map((cell, i) => (
            <motion.div
              key={cell.id}
              variants={fadeUp}
              className="bento-cell group"
              style={{
                borderRight: (i % 3 !== 2) ? '1px solid var(--border-hairline)' : undefined,
                borderBottom: i < 3 ? '1px solid var(--border-hairline)' : undefined,
              }}
            >
              {/* Micro Label */}
              <span className="micro-label block mb-3">{cell.microLabel}</span>

              {/* Title */}
              <h3 className="text-[16px] font-semibold text-white mb-3 leading-tight">
                {cell.title}
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cell.badges.map((badge, idx) => (
                  <span key={idx} className="tech-badge">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {cell.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;