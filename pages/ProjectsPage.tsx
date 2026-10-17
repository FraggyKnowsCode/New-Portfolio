import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsDataEnhanced } from '../data/portfolioData';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const ProjectsPage: React.FC = () => {
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
              All Projects
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Explore the complete portfolio of full-stack platforms, ML systems and hardware builds.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {projectsDataEnhanced.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group relative overflow-hidden"
                style={{ border: '1px solid var(--border-hairline)' }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title.join(' ')}
                    className="w-full h-full object-contain md:object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                </div>

                {/* Project Info */}
                <div style={{ padding: 'var(--cell-padding-desktop)' }}>
                  {/* Category Tag */}
                  <span className="micro-label block mb-2">{project.categoryTag}</span>

                  <h3
                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title.join(' ')}
                  </h3>

                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {project.summary}
                  </p>

                  {/* 3-Column Metric Strip */}
                  <div
                    className="grid grid-cols-3 gap-0 mb-4"
                    style={{ border: '1px solid var(--border-hairline)' }}
                  >
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="py-2 px-2 text-center"
                        style={{
                          borderLeft: idx > 0 ? '1px solid var(--border-hairline)' : undefined,
                        }}
                      >
                        <span
                          className="block text-[12px] font-semibold text-white"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {metric.value}
                        </span>
                        <span className="micro-label block mt-0.5" style={{ fontSize: '7.5px' }}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Links */}
                  <div className="flex gap-4">
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link text-[12px]"
                      >
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link text-[12px]"
                    >
                      GitHub
                    </a>
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

export default ProjectsPage;
