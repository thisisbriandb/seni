import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  decorative?: boolean;
}

export default function ParallaxSection({ 
  children, 
  className = '', 
  offset = 50,
  decorative = false 
}: ParallaxSectionProps) {
  const ref = useRef(null);
  
  // Utilisation du défilement global de la page
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  // Réduction de l'intensité des effets pour éviter les débordements excessifs
  const y = useTransform(scrollYProgress, [0, 1], [-offset/2, offset/2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.99, 1, 0.99]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <motion.div
        style={{ y, scale, opacity }}
        className="w-full relative"
      >
        {decorative && (
          <>
            {/* Éléments décoratifs plus petits et contenus */}
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
                rotate: useTransform(scrollYProgress, [0, 1], [0, 20])
              }}
              className="absolute -top-10 -left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"
            />
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], [50, -50]),
                rotate: useTransform(scrollYProgress, [0, 1], [20, 0])
              }}
              className="absolute -bottom-10 -right-10 w-20 h-20 bg-accent/5 rounded-full blur-xl pointer-events-none"
            />
            <motion.div
              style={{
                x: useTransform(scrollYProgress, [0, 1], [-25, 25]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9])
              }}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-10 h-10 bg-secondary/5 rounded-full blur-lg pointer-events-none"
            />
          </>
        )}
        <div className="relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 