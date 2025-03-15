"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string; // Add this line to accept className prop
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        delay: delay,
        duration: 0.8
      }}
      className={className} // Use the className prop
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;