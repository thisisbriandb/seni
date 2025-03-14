"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageTransition from '../language/LanguageTransition';
import InteractiveGlobe from '../map/InteractiveGlobe';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Hero() {
  const { currentLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#004080] overflow-hidden">
      {/* Overlay sombre pour améliorer le contraste - avec ajustement pour se connecter au header */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />
      
      {/* Motif de fond */}
      <div className="absolute inset-0 bg-pattern opacity-5" />
      
      {/* Conteneur principal */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 lg:px-12">
        {/* Section texte */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 pt-32 pb-10 md:pt-24 lg:pt-0 lg:pb-0 space-y-6 md:space-y-8 lg:pr-12"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
          >
            <Icon icon="carbon:location-star-filled" className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
            <span className="text-xs md:text-sm font-medium text-white">
              <LanguageTransition text="hero.badge" lang={currentLang} />
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl"
          >
            <LanguageTransition text="hero.title" lang={currentLang} />
          </motion.h1>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-sm md:prose-lg text-white/90 max-w-xl drop-shadow-lg"
          >
            <LanguageTransition text="hero.subtitle" lang={currentLang} />
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 md:gap-4 pt-4 md:pt-6"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 md:px-8 py-3 md:py-4 bg-white text-[#003366] rounded-full text-sm md:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Icon icon="carbon:email" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Nous contacter</span>
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white rounded-full text-sm md:text-base font-semibold backdrop-blur-sm hover:border-white/40 transition-all duration-300"
            >
              <Icon icon="carbon:play-filled" className="w-4 h-4 md:w-5 md:h-5" />
              <span>Voir la vidéo</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Section Globe */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] relative mt-0 lg:mt-0"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[95%] h-[95%] rounded-full bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-2">
                <InteractiveGlobe />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: scrolled ? 0 : 1,
          y: scrolled ? 20 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white"
      >
        <span className="text-xs md:text-sm font-medium tracking-wider">Découvrir</span>
        <Icon icon="carbon:chevron-down" className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
      </motion.div>
    </section>
  );
} 