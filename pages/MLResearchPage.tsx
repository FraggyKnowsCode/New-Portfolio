import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { researchProjects } from '../data/portfolioData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const getBadgeClass = (status: string) => {
  if (status.includes('ACCEPTED')) return 'accepted';
  if (status.includes('COMPLETED') || status.includes('PUBLISHED')) return 'published';
  return 'active';
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const MLResearchPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ background: 'var(--bg-canvas)' }} className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ML & Research
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Academic deep learning studies spanning climate resilience, cross-domain computer vision and medical imaging generalization.
            </p>
          </motion.div>

          {/* Research Cards */}
          <div className="flex flex-col gap-0">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group relative overflow-hidden hairline-border-t"
                style={{ padding: '3rem 0' }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Info */}
                  <div className="flex-1">
                    {/* Category */}
                    <span className="micro-label block mb-2">{project.categoryTag}</span>
                    <span className="text-[11px] block mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {project.categories.join(' • ')}
                    </span>

                    <h3
                      className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title.join(' ')}
                    </h3>

                    <p className="font-serif text-[18px] italic mb-4" style={{ color: 'var(--text-secondary)' }}>
                      "{project.paperTitle}"
                    </p>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`status-badge ${getBadgeClass(project.status)} inline-flex`}>
                        <span className="status-dot" />
                        {project.status}
                      </span>
                    </div>

                    {/* Narrative Summary */}
                    {project.summary && (
                      <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {project.summary}
                      </p>
                    )}

                    {/* Metadata Grid */}
                    {project.metadata.length > 0 && (
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-4"
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

                    {/* Action Links */}
                    {project.repoUrl !== '#' && (
                      <div className="mt-4">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link text-[12px]"
                        >
                          View Report
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right: Abstract or Pipeline */}
                  <div className="lg:w-[400px] flex-shrink-0">
                    {project.abstract && (
                      <div className="research-arch-card">
                        <div className="mb-5">
                          <span className="micro-label block mb-2">PROBLEM STATEMENT</span>
                          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {project.abstract.problem}
                          </p>
                        </div>
                        <div className="mb-5 pt-4 hairline-border-t">
                          <span className="micro-label block mb-2">PROPOSED ARCHITECTURE</span>
                          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {project.abstract.architecture}
                          </p>
                        </div>
                        <div className="pt-4 hairline-border-t">
                          <span className="micro-label block mb-2">KEY FOCUS AREAS</span>
                          <div className="flex flex-wrap gap-2">
                            {project.abstract.focus.map((area, idx) => (
                              <span key={idx} className="tech-badge" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {project.hasPipeline && project.pipelineSteps && (
                      <div className="research-arch-card">
                        <span className="micro-label block mb-4">ARCHITECTURE PIPELINE</span>
                        <div className="flex flex-col gap-1">
                          {project.pipelineSteps.map((step, idx) => (
                            <React.Fragment key={idx}>
                              <div className="pipeline-step">
                                <span>{step}</span>
                              </div>
                              {idx < project.pipelineSteps!.length - 1 && (
                                <div className="pipeline-arrow">↓</div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MLResearchPage;
