import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

const Loader: React.FC = () => {
  const name = "Fahad".split("");

  // FIX: Explicitly type containerVariants with Variants.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.5
        }
    }
  };

  // FIX: Explicitly type itemVariants with Variants. This resolves the error where 'type: "spring"' was inferred as a generic string.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Continuous floating animation
  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-2xl sm:text-4xl md:text-6xl font-light text-white tracking-wider flex flex-wrap justify-center items-baseline gap-x-2 sm:gap-x-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Render each letter of the name as an animated, bolded span */}
        {name.map((char, index) => (
          <motion.span 
            key={`char-${index}`} 
            variants={itemVariants} 
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              },
            }}
            className="font-bold"
          >
            {char}
          </motion.span>
        ))}
        {/* Render the separator and title as a single animated block, staggered after the name */}
        <motion.span
          key="subtitle"
          variants={itemVariants}
          className="flex items-baseline gap-x-3"
        >
          <span className="font-light text-gray-400">|</span>
          <span className="text-lg sm:text-2xl md:text-4xl font-normal">Tech Developer</span>
        </motion.span>
      </motion.h1>
    </motion.div>
  );
};

export default Loader;