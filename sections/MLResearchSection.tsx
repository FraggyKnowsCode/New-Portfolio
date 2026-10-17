import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { researchProjects } from '../data/portfolioData';

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

// Pipeline Diagram Component
const PipelineDiagram: React.FC<{ steps: string[] }> = ({ steps }) => (
  <div className="flex flex-col gap-1">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <div className="pipeline-step">
          <span>{step}</span>
        </div>
        {idx < steps.length - 1 && (
          <div className="pipeline-arrow">↓</div>
        )}
      </React.Fragment>
    ))}
  </div>
);

const getBadgeClass = (status: string) => {
  if (status.includes('ACCEPTED')) return 'accepted';
  if (status.includes('COMPLETED') || status.includes('PUBLISHED')) return 'published';
  return 'active';
};

// Research Abstract Card (for in-progress papers)
const AbstractCard: React.FC<{
  abstract: { problem: string; architecture: string; focus: string[] };
  status: string;
}> = ({ abstract, status }) => (
  <div className="research-arch-card">
    {/* Status Badge */}
    <div className="mb-5">
      <span className={`status-badge ${getBadgeClass(status)}`}>
        <span className="status-dot" />
        {status}
      </span>
    </div>

    {/* Problem Statement */}
    <div className="mb-5">
      <span className="micro-label block mb-2">PROBLEM STATEMENT</span>
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {abstract.problem}
      </p>
    </div>

    {/* Proposed Architecture */}
    <div className="mb-5 pt-4 hairline-border-t">
      <span className="micro-label block mb-2">PROPOSED ARCHITECTURE</span>
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {abstract.architecture}
      </p>
    </div>

    {/* Key Focus Areas */}
    <div className="pt-4 hairline-border-t">
      <span className="micro-label block mb-2">KEY FOCUS AREAS</span>
      <div className="flex flex-wrap gap-2">
        {abstract.focus.map((area, idx) => (
          <span key={idx} className="tech-badge" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            {area}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Lightbox Modal for presentation slides
const LightboxModal: React.FC<{ isOpen: boolean; onClose: () => void; src: string }> = ({
  isOpen,
  onClose,
  src,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white text-2xl hover:opacity-70 transition-opacity cursor-pointer"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ✕ CLOSE
          </button>
          <img
            src={src}
            alt="Research Presentation"
            className="w-full h-auto rounded-lg"
            style={{ border: '1px solid var(--border-hairline)' }}
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MLResearchSection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  return (
    <section id="ml-research" className="bg-black">
      <div className="editorial-section">
        <SectionIndexBar
          index="04"
          title="RECENT RESEARCH"
          rightLabel="MODELS. DATA. IMPACT."
        />

        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2
            className="font-serif leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Recent <span className="italic">Research</span>
          </h2>
          <p className="text-[15px] max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Academic deep learning studies spanning climate resilience, cross-domain computer vision and medical imaging generalization.
          </p>
        </motion.div>

        {/* Research Cards */}
        <div className="flex flex-col gap-0">
          {researchProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="hairline-border-t"
              style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                {/* Left: Card Info */}
                <div className="flex-1">
                  {/* Project Number + Category */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[48px] md:text-[64px] font-bold leading-none"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', opacity: 0.3 }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="micro-label block">{project.categoryTag}</span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {project.categories.join(' • ')}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title.join(' ')}
                  </h3>

                  {/* Paper Title */}
                  <p
                    className="font-serif text-[18px] md:text-[20px] italic mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    "{project.paperTitle}"
                  </p>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`status-badge ${getBadgeClass(project.status)}`}>
                      <span className="status-dot" />
                      {project.status}
                    </span>
                  </div>

                  {/* Narrative Summary */}
                  {project.summary && (
                    <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                      {project.summary}
                    </p>
                  )}

                  {/* 2×2 Metadata Grid */}
                  {project.metadata.length > 0 && (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-4"
                      style={{ border: '1px solid var(--border-hairline)' }}
                    >
                      {project.metadata.map((meta, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-4"
                          style={{
                            borderBottom: mIdx < 2 ? '1px solid var(--border-hairline)' : undefined,
                            borderRight: mIdx % 2 === 0 ? '1px solid var(--border-hairline)' : undefined,
                          }}
                        >
                          <span className="micro-label block mb-1">{meta.label}</span>
                          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {meta.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lightbox / Action Links */}
                  {project.repoUrl !== '#' && (
                    <div className="mt-4 flex gap-4">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link text-[12px]"
                      >
                        View Report <span style={{ color: 'var(--accent-orange)' }}>↗</span>
                      </a>
                      {project.imageUrl && (
                        <button
                          onClick={() => openLightbox(project.imageUrl)}
                          className="action-link text-[12px] bg-transparent border-0 cursor-pointer"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          View Presentation Slide <span style={{ color: 'var(--accent-orange)' }}>↗</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Visual Panel */}
                <div className="lg:w-[420px] flex-shrink-0 flex flex-col gap-4">
                  {/* Pipeline Diagram */}
                  {project.hasPipeline && project.pipelineSteps && (
                    <div className="research-arch-card">
                      <div className="flex items-center justify-between mb-4">
                        <span className="micro-label">ARCHITECTURE PIPELINE</span>
                        {project.status.includes('ACCEPTED') && (
                          <span className="status-badge accepted" style={{ fontSize: '9px', padding: '0.2rem 0.55rem' }}>
                            <span className="status-dot" />
                            ACCEPTED AT IEEE
                          </span>
                        )}
                      </div>
                      <PipelineDiagram steps={project.pipelineSteps} />
                    </div>
                  )}

                  {/* Abstract Card */}
                  {project.abstract && (
                    <AbstractCard abstract={project.abstract} status={project.status} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={lightboxSrc}
      />
    </section>
  );
};

export default MLResearchSection;
