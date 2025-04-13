"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Hero() {
  const { currentLang } = useLanguage();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Fond subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30" />

      {/* Conteneur principal */}
      <div className="relative container mx-auto px-6 md:px-8 lg:px-12 min-h-screen flex flex-col justify-center items-center text-center py-20 md:py-24">
        {/* Badge de localisation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-full">
            <Icon icon="carbon:location" className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Transport médical en Afrique</span>
            </div>
          </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-medium mb-6 md:mb-8 tracking-tight text-gray-900 dark:text-white leading-tight"
          >
            Votre santé<br />
            <span className="text-4xl md:text-5xl lg:text-7xl">au-delà des frontières</span>
            </motion.h1>

          {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
            Solutions de transport médical international adaptées à vos besoins en Centrafrique et en Afrique
            </motion.p>

          {/* Boutons d'action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all duration-300 font-medium">
                Commencer maintenant
              </button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-3 font-medium">
                Découvrir nos services
                <Icon icon="carbon:arrow-right" className="w-5 h-5" />
              </button>
            </Link>
        </motion.div>

          {/* Badges d'information */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 py-3 md:py-4 px-4 md:px-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              <Icon icon="carbon:airport-location" className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Présence dans 5 pays</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-3 md:py-4 px-4 md:px-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              <Icon icon="carbon:user-certification" className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Personnel qualifié</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-3 md:py-4 px-4 md:px-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm">
              <Icon icon="carbon:time" className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Service 24/7</span>
          </div>
        </motion.div>
      </div>

        {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}