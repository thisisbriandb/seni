"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
];

export default function LanguageSelector() {
  const { currentLang, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      {languages.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => setLanguage(code as 'fr' | 'en' | 'ar')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all
            ${currentLang === code 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
} 