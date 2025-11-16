import React, { useState, useRef } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, useScroll, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';
// Make sure this path is correct
import type { Project } from '../types'; 

// --- Project Data Array ---
// Make sure your 'Project' type includes 'repoUrl: string'
const projects: Project[] = [
  {
    id: 1,
    title: ["FOOD WASTE", "MANAGEMENT", "SYSTEM"],
    client: "OWN PROJECT",
    categories: ["Waste", "Management", "Clean"],
    imageUrl: '/images/fwms.jpg',
    repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem' // <-- ADD YOUR LINK
  },
  {
    id: 2,
    title: ["HOMIE", "RENTAL", "APPLICATION"],
    client: "OWN PROJECT",
    categories: ["Flat", "House", "Rental"],
    imageUrl: '/images/homie-logo.jpg', // Check case: 'Homie Logo.jpg'
    repoUrl: 'https://github.com/FraggyKnowsCode/Homie_Project' // <-- ADD YOUR LINK
  },
  {
    id: 3,
    title: ["AGRI HELP", "AI", "CHATBOT"],
    client: "Own Project",
    categories: ["AI", "Farmer", "Help"],
    imageUrl: '/images/agri-help.png',
    repoUrl: 'https://v0-web-app-chatbot-integration.vercel.app/' // <-- ADD YOUR LINK
  },
  {
    id: 4,
    title: ["MY", "COVERED", "SONGS"],
    client: "My Music Covers",
    categories: ["Songs", "Covers", "Music"],
    imageUrl: '/images/songs-cover.png',
    repoUrl: 'https://github.com/your-username/web-conf-repo' // <-- ADD YOUR LINK
  },
  {
    id: 5,
    title: ["LAND", "MINE", "DETECTOR"],
    client: "OWN PROJECT",
    categories: ["LandMine", "CPI", "Robotics"],
    imageUrl: '/images/land-mine-detector.jpg',
    repoUrl: 'https://github.com/FraggyKnowsCode/Land-Mine-Detector' // <-- ADD YOUR LINK
  },
  // {
  //   id: 6,
  //   title: ["FOOD WASTE", "MANAGEMENT", "SYSTEM"],
  //   client: "OWN PROJECT",
  //   categories: ["Waste", "Management", "Clean"],
  //   imageUrl: '/images/fwms.jpg',
  //   repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem' // <-- ADD YOUR LINK
  // },
  // {
  //   id: 7,
  //   title: ["FOOD WASTE", "MANAGEMENT", "SYSTEM"],
  //   client: "OWN PROJECT",
  //   categories: ["Waste", "Management", "Clean"],
  //   imageUrl: '/images/fwms.jpg',
  //   repoUrl: 'https://github.com/FraggyKnowsCode/FoodWasteManagementSystem' // <-- ADD YOUR LINK
  // },
];

// --- Animation Variants ---

// FIX: Explicitly type titleVariants with Variants.
const titleVariants: Variants = {
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.05 } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3, ease: "easeIn" } 
  },
};

// FIX: Explicitly type letterVariants with Variants.
const letterVariants: Variants = {
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
}

// --- WorkSection Component ---

const WorkSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });
  
  const activeProject = projects[activeIndex];

  return (
    <section id="work" ref={containerRef} className="relative bg-black" style={{ height: `${projects.length * 150}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Left Side: Scroll Indicator & Info */}
        <div className="absolute left-0 top-0 h-full w-2/5 flex items-center pl-10 md:pl-20 z-20 text-white pointer-events-none">
          <div className="flex items-start space-x-8">
            {/* Scroll Indicator */}
            <div className="flex-shrink-0 relative h-72">
              <span 
                className="absolute top-0 left-0 text-xs tracking-[0.3em] uppercase text-gray-500 origin-top-left"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Recent Work
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-8 h-48 w-px bg-gray-700">
                {projects.map((_, index) => (
                  <div 
                    key={`dot-${index}`}
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-700 rounded-full"
                    style={{ top: `${(index / (projects.length - 1)) * 100}%` }}
                  />
                ))}
              </div>
              <motion.div
                className="absolute left-8 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-white"
                style={{ transform: 'translateY(-50%)' }}
                animate={{ top: `${(activeIndex / (projects.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Project Info */}
            <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProject.id}
                        variants={titleVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        className="flex flex-col"
                    >
                        <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                            {activeProject.title.map((line, lineIndex) => (
                                <span key={lineIndex} className="block overflow-hidden">
                                    <motion.span className="block" variants={letterVariants}>{line}</motion.span>
                                </span>
                            ))}
                              <span className="block text-2xl md:text-3xl font-bold normal-case text-gray-200 mt-2">
                                <motion.span className="block" variants={letterVariants}>&gt; {activeProject.client}</motion.span>
                              </span>
                        </motion.h2>
                        <motion.p className="text-gray-400 mt-4" variants={letterVariants}>
                            {activeProject.categories.join(' • ')}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="w-3/5 h-[80vh] absolute right-[5%] top-1/2 -translate-y-1/2">
          <AnimatePresence>
              <motion.div
                  key={activeProject.imageUrl}
                  className="absolute inset-0 w-full h-full group pointer-events-auto"
                  initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
                  exit={{ opacity: 0, scale: 0.9, clipPath: 'inset(0 0 100% 0)' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                  <img 
                      src={activeProject.imageUrl} 
                      alt={activeProject.client} 
                      className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* === UPDATED "Learn More" LINK === */}
                  <a
                    href={activeProject.repoUrl} // Use the dynamic URL
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 z-10"
                  >
                    <motion.div
                      className="w-full h-full bg-white rounded-full flex items-center justify-center text-black text-center font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Learn<br/>More!
                    </motion.div>
                  </a>
                  {/* === END OF UPDATE === */}

              </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom "Discover All" Button */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button className="px-6 py-3 border border-gray-500 rounded-full text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 text-sm">
          DISCOVER ALL PROJECTS &rarr;
        </button>
      </div>
    </section>
  );
};

export default WorkSection;