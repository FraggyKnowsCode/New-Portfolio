import React from 'react';
import profileImg from '../images/profile.jpg';
import { motion } from 'framer-motion';

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
        <img src={profileImg} alt="Profile" className="rounded-lg shadow-2xl" />        </motion.div>
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
I engineer compelling experiences, leveraging my skills as a designer, developer, and strategist to build digital solutions that are beautiful, functional, and memorable, forging strong connections between brands and their audiences. My diverse passions, from leading sports teams and singing to dedicating time to volunteer work, enrich my perspective and fuel my collaborative drive to make a positive impact.          </motion.p>
          <motion.p
            className="text-lg text-gray-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
            transition={{ delay: 0.4 }}
          >
            From startups to established enterprises, I partner with clients to push boundaries and create work that not only looks great but also achieves business goals. Let's create something amazing together.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;