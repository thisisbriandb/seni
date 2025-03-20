"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'fr' | 'en' | 'ar';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export default function LanguageSelector() {
  const { currentLang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-3 py-1.5 bg-[#005f73]/5 border border-[#005f73]/20 rounded-sm font-space-mono text-[#333333] hover:bg-[#005f73]/10 hover:border-[#005f73]/30 transition-all duration-200"
      >
        <span className="text-base">
          {currentLanguage?.flag}
        </span>
        <span className="hidden md:block text-xs font-medium uppercase tracking-wide">
          {currentLanguage?.code}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3.5 h-3.5 opacity-50"
        >
          <Icon icon="carbon:chevron-down" className="w-full h-full" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-44 bg-white border border-[#005f73]/20 rounded-sm shadow-lg z-50 overflow-hidden"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setLanguage(lang.code as Language);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 transition-colors duration-200 ${
                  currentLang === lang.code 
                    ? 'bg-[#005f73]/10 text-[#333333]' 
                    : 'text-[#444444] hover:bg-[#005f73]/5 hover:text-[#333333]'
                }`}
              >
                <span className="text-base">
                  {lang.flag}
                </span>
                <div className="flex flex-col">
                  <span className="font-space-mono text-xs font-medium uppercase tracking-wide">
                    {lang.code}
                  </span>
                  <span className="text-xs text-gray-500">
                    {lang.name}
                  </span>
                </div>
                
                {currentLang === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <Icon icon="carbon:checkmark" className="w-3.5 h-3.5 text-[#2a9d8f]" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}