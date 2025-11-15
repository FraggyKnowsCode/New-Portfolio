import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const cursorSize = 20;

  const variants = {
    default: {
      x: x - cursorSize / 2,
      y: y - cursorSize / 2,
      height: cursorSize,
      width: cursorSize,
      backgroundColor: 'white',
    },
  };

  return (
    <motion.div
      variants={variants}
      animate="default"
      transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      style={{ mixBlendMode: 'difference' }}
    />
  );
};

export default CustomCursor;