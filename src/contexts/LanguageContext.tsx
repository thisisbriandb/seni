"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/translations';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    
    setDirection(currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[currentLang];
      for (const k of keys) {
        value = value[k];
      }
      return value || key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 