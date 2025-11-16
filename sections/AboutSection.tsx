import React from 'react';
import { motion } from 'framer-motion';
// FIX: The import path must be relative.
// This goes UP one level from 'sections' to the root,
// then DOWN into the 'images' folder.
import Profile from '../images/profile.jpg'; 

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariant}
        >
          {/* FIX: Use the imported variable {Profile} in the src attribute. */}
          <img src={Profile} alt="profile" className="rounded-lg shadow-2xl" />
        </motion.div>
        <div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
            transition={{ delay: 0.2 }}
          >
            I am a designer, developer, and strategist with a passion for crafting beautiful, functional, and memorable digital experiences that connect brands with their audiences.
          </motion.p>
          <motion.p
            className="text-lg text-gray-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
            transition={{ delay: 0.4 }}
          >
            From startups to established enterprises, I partner with clients to push boundaries and. Let's create something amazing together.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;