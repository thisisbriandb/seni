"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageTransitionProps {
  text: string;
  lang: string;
}

export default function LanguageTransition({ text, lang }: LanguageTransitionProps) {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText(t(text));
  }, [lang, text, t]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={lang + text}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {displayText}
      </motion.span>
    </AnimatePresence>
  );
} 