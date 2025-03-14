import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  offset?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  delay = 0,
  offset = 20,
  className = ''
}: FloatingElementProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.21, 0.45, 0.15, 1]
        }
      }}
      style={{
        scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 