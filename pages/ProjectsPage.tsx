import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projectsData';
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
  return (
    <div className="bg-black min-h-screen">
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-6">
              All Projects
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore my complete portfolio of projects, from web applications to innovative solutions.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -10 }}
                className="group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title.join(' ')}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                    {project.title.join(' ')}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{project.client}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Button */}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
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
