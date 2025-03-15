"use client";

import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; label: string }[] = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
];

export default function LanguageSelector() {
  const { currentLang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <Icon icon="carbon:language" className="w-5 h-5" />
        <span className="uppercase">{currentLanguage?.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as Language);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  currentLang === lang.code
                    ? 'bg-primary/10 text-primary-dark'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}