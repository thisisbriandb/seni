"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Icon } from '@iconify/react';
import LanguageSelector from './LanguageSelector';

const navItems = [
  { name: 'Accueil', path: '/', icon: 'carbon:home' },
  { name: 'Services', path: '/services', icon: 'carbon:service-desk' },
  { name: 'Destinations', path: '/destinations', icon: 'carbon:location' },
  { name: 'À Propos', path: '/about', icon: 'carbon:information' }
];

// Liste de langues pour l'affichage mobile
const langOptions = ['fr', 'en', 'ar'] as const;
type LangCode = typeof langOptions[number];

export default function Header() {
  const { currentLang, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#001F3F]/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-2 md:py-4' 
            : 'bg-gradient-to-b from-black/50 to-transparent py-3 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="relative z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  SENI
                </span>
              </motion.div>
            </Link>

            {/* Navigation desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path}>
                  <motion.div
                    className="relative group"
                    whileHover={{ y: -2 }}
                  >
                    <span className="flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors drop-shadow-lg">
                      <Icon icon={item.icon} className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSelector />

              {/* Bouton Contact */}
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#001F3F] rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Icon icon="carbon:email" className="w-5 h-5" />
                  <span>Contact</span>
                </motion.button>
              </Link>
            </div>

            {/* Bouton menu mobile et LanguageSelector sur mobile*/}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageSelector />
              
              <motion.button
                className="relative z-50 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-5 h-5 md:w-6 md:h-6 flex flex-col justify-center items-center">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-5 md:w-6 h-0.5 bg-white mb-1.5 transform origin-center transition-transform shadow-lg"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 md:w-6 h-0.5 bg-white mb-1.5 shadow-lg"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-5 md:w-6 h-0.5 bg-white transform origin-center transition-transform shadow-lg"
                  />
                </div>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#001F3F]/98 backdrop-blur-lg z-40 lg:hidden pt-16 overflow-y-auto"
          >
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
              <div className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-white hover:text-blue-400 text-xl md:text-2xl font-medium"
                    >
                      <Icon icon={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 md:mt-12"
              >
                <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-3 md:mb-4">
                  Langues
                </h3>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {langOptions.map((langCode) => (
                    <button
                      key={langCode}
                      onClick={() => setLanguage(langCode)}
                      className={`py-2 md:py-3 rounded-xl text-center font-medium transition-all ${
                        currentLang === langCode 
                          ? 'bg-white text-[#001F3F] shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span>{langCode.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 md:mt-12"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-white text-[#001F3F] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Icon icon="carbon:email" className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Nous contacter</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 