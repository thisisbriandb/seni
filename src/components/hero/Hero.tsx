"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageTransition from '../language/LanguageTransition';
import InteractiveGlobe from '../map/InteractiveGlobe';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Hero() {
  const { currentLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // URL de la vidéo YouTube
  const videoUrl = "https://www.youtube.com/watch?v=pcev7-kVMGg";

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#004080] overflow-hidden">
        {/* Overlay sombre pour améliorer le contraste - avec ajustement pour se connecter au header */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />
        
        {/* Motif de fond */}
        <div className="absolute inset-0 bg-pattern opacity-5" />
        
        {/* Conteneur principal */}
        <div className="relative z-10 container mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 lg:px-12">
          {/* Section texte */}
          <motion.div 
            className="w-full lg:w-1/2 pt-20 md:pt-24 lg:pt-0 lg:pb-0 space-y-4 md:space-y-6 lg:pr-12 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg mx-auto lg:mx-0"
            >
              <Icon icon="carbon:location-star-filled" className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mr-2" />
              <span className="text-xs md:text-sm font-medium text-white">
                <LanguageTransition text="hero.badge" lang={currentLang} />
              </span>
            </motion.div>
  
            {/* Titre principal */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight sm:leading-tight drop-shadow-2xl mt-4 md:mt-6"
            >
              <LanguageTransition text="hero.title" lang={currentLang} />
            </motion.h1>
  
            {/* Description */}
            <motion.div 
              className="prose prose-sm md:prose-lg text-white/90 max-w-xs md:max-w-xl drop-shadow-lg mx-auto lg:mx-0 mt-4 md:mt-6"
            >
              <LanguageTransition text="hero.subtitle" lang={currentLang} />
            </motion.div>
  
            {/* Boutons d'action */}
            <motion.div
              className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mt-6 md:mt-8"
            >
              <Link href="/contact">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Icon icon="carbon:email" className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Nous contacter</span>
                </motion.button>
              </Link>
              <motion.a
                href={videoUrl} // Redirection vers la vidéo YouTube
                target="_blank" // Ouvre dans un nouvel onglet
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white rounded-full text-sm md:text-base font-semibold backdrop-blur-sm hover:border-white/40 transition-all duration-300 cursor-pointer"
              >
                <Icon icon="carbon:play-filled" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Voir la vidéo</span>
              </motion.a>
            </motion.div>
          </motion.div>
  
          {/* Section Globe (masquée sur mobile) */}
          {!isMobile && ( // Affiche InteractiveGlobe uniquement si ce n'est pas un mobile
            <motion.div 
              className="w-full lg:w-1/2 h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[90%] sm:w-[95%] h-[90%] sm:h-[95%] rounded-full border border-white/10 p-1.5 sm:p-2">
                  <div className="absolute inset-1.5 sm:inset-2">
                    <InteractiveGlobe />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
  
        {/* Indicateur de défilement */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2"
        >
          <span className="text-xs md:text-sm">Découvrir</span>
          <Icon icon="carbon:chevron-down" className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
        </motion.div>
      </section>
    </>
  );
}