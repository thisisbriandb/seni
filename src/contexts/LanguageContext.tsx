"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultTranslations = {
  fr: {
    hero: {
      badge: "Votre santé, notre priorité",
      title: "Voyagez pour votre santé, nous nous occupons de tout",
      subtitle: "Transport médical international et assistance sanitaire en Afrique"
    },
    footer: {
      description: "SENI est une agence dédiée à l'accompagnement des patients centrafricains vers des pays sûrs pour recevoir des soins médicaux de qualité.",
      rights: "Tous droits réservés.",
      links: {
        company: {
          title: "Notre Entreprise",
          about: "À propos",
          services: "Services",
          team: "Notre équipe",
          contact: "Contact"
        },
        legal: {
          title: "Mentions légales",
          terms: "Conditions d'utilisation",
          privacy: "Politique de confidentialité",
          cookies: "Cookies"
        }
      }
    }
  },
  en: {
    hero: {
      badge: "Your health, our priority",
      title: "Travel for your health, we take care of everything",
      subtitle: "International medical transport and healthcare assistance in Africa"
    },
    footer: {
      description: "SENI is an agency dedicated to accompanying Central African patients to safe countries to receive quality medical care.",
      rights: "All rights reserved.",
      links: {
        company: {
          title: "Our Company",
          about: "About",
          services: "Services",
          team: "Our team",
          contact: "Contact"
        },
        legal: {
          title: "Legal",
          terms: "Terms of use",
          privacy: "Privacy policy",
          cookies: "Cookies"
        }
      }
    }
  },
  ar: {
    hero: {
      badge: "صحتك، أولويتنا",
      title: "سافر من أجل صحتك، نحن نهتم بكل شيء",
      subtitle: "النقل الطبي الدولي والمساعدة الصحية في أفريقيا"
    },
    footer: {
      description: "سيني هي وكالة مخصصة لمرافقة المرضى من جمهورية أفريقيا الوسطى إلى بلدان آمنة لتلقي رعاية طبية عالية الجودة.",
      rights: "جميع الحقوق محفوظة.",
      links: {
        company: {
          title: "شركتنا",
          about: "من نحن",
          services: "الخدمات",
          team: "فريقنا",
          contact: "اتصل بنا"
        },
        legal: {
          title: "قانوني",
          terms: "شروط الاستخدام",
          privacy: "سياسة الخصوصية",
          cookies: "ملفات تعريف الارتباط"
        }
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'fr',
  setLanguage: () => {},
  t: () => '',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('fr');

  useEffect(() => {
    // Charger la langue sauvegardée si elle existe
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    
    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = currentLang;
    
    // Définir la direction du texte pour l'arabe
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  // Fonction de traduction simplifiée
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = defaultTranslations[currentLang];
    
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 