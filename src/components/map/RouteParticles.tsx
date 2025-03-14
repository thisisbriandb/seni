import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RouteParticlesProps {
  from: [number, number];
  to: [number, number];
  isActive: boolean;
}

export default function RouteParticles({ from, to, isActive }: RouteParticlesProps) {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      setParticles([0, 1, 2, 3, 4]);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  return (
    <>
      {particles.map((i) => (
        <motion.circle
          key={i}
          r={2}
          fill="#0066CC"
          initial={{ 
            x: from[0],
            y: from[1],
            opacity: 0
          }}
          animate={{
            x: to[0],
            y: to[1],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
} 