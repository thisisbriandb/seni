"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  decorative?: boolean;
}

export default function ParallaxSection({ 
  children, 
  className = "", 
  decorative = false 
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {decorative && (
        <>
          <motion.div 
            style={{ y, opacity: 0.05 }}
            className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </>
      )}
      <motion.div 
        style={{ opacity }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.section>
  );
} 