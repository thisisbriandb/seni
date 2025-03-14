"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import frTranslations from '@/translations/fr.json';
import enTranslations from '@/translations/en.json';

// Ajout d'un objet pour stocker les traductions par langue
const translationsByLang: Record<string, any> = {
  fr: frTranslations,
  en: enTranslations,
  // Vous pouvez ajouter d'autres langues ici quand elles seront disponibles
  // ar: arTranslations,
};

interface LanguageTransitionProps {
  text: string;
  lang: string;
}

export default function LanguageTransition({ text, lang }: LanguageTransitionProps) {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const getTranslation = (key: string, language: string) => {
      // Utiliser les traductions françaises par défaut si la langue n'est pas disponible
      const translations = translationsByLang[language] || frTranslations;
      
      const keys = key.split('.');
      let current: any = translations;
      
      for (const k of keys) {
        if (current[k] === undefined) {
          console.warn(`Translation missing for key: ${key} in language: ${language}`);
          return key;
        }
        current = current[k];
      }
      
      return current;
    };

    setTranslatedText(getTranslation(text, lang));
  }, [text, lang]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {translatedText}
    </motion.span>
  );
} 