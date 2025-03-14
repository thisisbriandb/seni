"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'ar';

const availableLanguages = [
  { code: 'fr' as Language, name: 'Français', flag: 'emojione:flag-for-france' },
  { code: 'en' as Language, name: 'English', flag: 'emojione:flag-for-united-kingdom' },
  { code: 'ar' as Language, name: 'العربية', flag: 'emojione:flag-for-morocco' },
];

export default function LanguageSelector() {
  const { currentLang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Fermer le menu lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Gestionnaire de clic pour le bouton du sélecteur
  const handleSelectorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  // Gestionnaire de clic pour les options
  const handleLanguageClick = (e: React.MouseEvent, langCode: Language) => {
    e.stopPropagation();
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <motion.button
        onClick={handleSelectorClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
      >
        <Icon 
          icon={availableLanguages.find(lang => lang.code === currentLang)?.flag || availableLanguages[0].flag} 
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
        <span className="hidden sm:inline text-sm font-medium">
          {availableLanguages.find(lang => lang.code === currentLang)?.name || availableLanguages[0].name}
        </span>
        <span className="inline sm:hidden text-xs font-medium">
          {currentLang.toUpperCase()}
        </span>
        <Icon icon="ri:arrow-down-s-line" className="w-3 h-3 sm:w-4 sm:h-4 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 w-32 sm:w-40 py-2 bg-white rounded-lg shadow-xl"
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={(e) => handleLanguageClick(e, lang.code)}
              className={`w-full flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-100 transition-all
                ${currentLang === lang.code ? 'text-primary font-medium' : 'text-gray-600'}
                ${lang.code === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <Icon icon={lang.flag} className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{lang.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
} 