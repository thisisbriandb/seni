"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const controls = useAnimation();
  const pathname = usePathname();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 0,
        y: 20,
        filter: "blur(5px)",
        transition: { duration: 0.3 }
      });

      await controls.start({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.2
        }
      });
    };

    sequence();
  }, [pathname, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={controls}
      className="w-full"
    >
      {children}
    </motion.div>
  );
} 