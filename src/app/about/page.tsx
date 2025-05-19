"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useContext, useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// Données de l'équipe


export default function AboutPage() {
  const { currentLang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['mission', 'team'];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Détecter la section active
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = containerRef.current.querySelectorAll('section');
      
      sectionElements.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour faire défiler jusqu'à une section
  const scrollToSection = (index: number) => {
    const sectionElements = containerRef.current?.querySelectorAll('section');
    if (sectionElements && sectionElements[index]) {
      sectionElements[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Pagination flottante */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      >
        {sections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => scrollToSection(index)}
            className="group relative flex items-center gap-4"
            whileHover={{ x: -8 }}
          >
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-gray-600 dark:text-gray-300 text-sm capitalize"
            >
              {section}
            </motion.span>
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 relative ${
                currentSection === index ? 'bg-[#0D7490] dark:bg-[#3CC7EE] border-[#0D7490] dark:border-[#3CC7EE]' : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={currentSection === index ? {
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity }
              } : {}}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#0D7490] dark:bg-[#3CC7EE]"
                initial={{ scale: 0 }}
                animate={currentSection === index ? { scale: 1.5, opacity: 0 } : { scale: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      {/* Ligne de progression */}
      <motion.div
        className="fixed left-0 top-0 h-1 bg-[#0D7490]"
        style={{ width: scrollYProgress.get() * 100 + '%' }}
      />

      {/* Section Notre Mission */}
      <section className="relative min-h-screen flex items-center py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-[#0D7490]/10 dark:from-[#3CC7EE]/5 to-white dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5" />
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                  Notre Mission
                </h1>
                <div className="prose prose-base md:prose-lg dark:prose-invert">
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    SENI est une agence dédiée à l'accompagnement des patients centrafricains vers des pays sûrs pour recevoir des soins médicaux de qualité.
                    Notre équipe de trois jeunes centrafricains s'engage à faciliter l'accès aux meilleurs traitements médicaux à l'international.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-[#0D7490] dark:text-[#3CC7EE] mb-4">Notre engagement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Assurer un parcours médical fluide et sécurisé pour chaque patient en quête de soins adaptés à son état de santé.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-2xl overflow-hidden group order-1 lg:order-2 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <Image
                src="/images/about/mission.jpg"
                alt="Notre mission"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
