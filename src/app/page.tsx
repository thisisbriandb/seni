"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Hero from '@/components/hero/Hero';
import ServiceGrid from '@/components/services/ServiceGrid';
import MotionWrapper from '@/components/animations/MotionWrapper';
import ParallaxSection from '@/components/animations/ParallaxSection';
import FloatingElement from '@/components/animations/FloatingElement';
import LanguageTransition from '@/components/language/LanguageTransition';
import { MedicalService } from '@/types/medical';
import ServiceCard from '@/components/services/ServiceCard';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';

const sampleServices: MedicalService[] = [
  {
    id: '1',
    title: 'Transport Médical International',
    description: 'Transport sécurisé des patients vers les meilleures installations médicales au Maroc, en Tunisie et au Sénégal.',
    icon: '/icons/ambulance.svg',
    destinations: ['Maroc', 'Tunisie', 'Sénégal'],
    estimatedTime: '24-48h',
    imageUrl: '/images/medical-transport.png'
  },
  {
    id: '2',
    title: 'Consultation Spécialisée',
    description: 'Mise en relation avec des spécialistes de renommée internationale pour des consultations personnalisées.',
    icon: '/icons/doctor.svg',
    destinations: ['Maroc', 'Tunisie'],
    estimatedTime: '1-2 semaines',
    imageUrl: '/images/consultation.png'
  },
  {
    id: '3',
    title: 'Assistance Administrative',
    description: 'Support complet pour les visas médicaux et la documentation nécessaire à l\'expatriation médicale.',
    icon: '/icons/documents.svg',
    destinations: ['Maroc', 'Tunisie', 'Sénégal'],
    estimatedTime: '1-3 semaines',
    imageUrl: '/images/admin-support.png'
  }
];

const stats = [
  { label: "Patients Transférés", value: "2000+" },
  { label: "Partenaires Médicaux", value: "45+" },
  { label: "Pays Desservis", value: "4" },
  { label: "Satisfaction Client", value: "98%" }
];

// Sections Components
const ServicesSection = ({ currentLang }: { currentLang: string }) => (
  <ParallaxSection className="py-20" decorative>
    <div className="container mx-auto px-4">
      <FloatingElement className="text-center mb-12">
        <LanguageTransition
          text="services.title"
          lang={currentLang}
        />
      </FloatingElement>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sampleServices.map((service, index) => (
          <FloatingElement
            key={service.id}
            delay={index * 0.2}
            className="h-full"
          >
            <ServiceCard service={service} />
          </FloatingElement>
        ))}
      </div>
    </div>
  </ParallaxSection>
);

const StatsSection = () => (
  <ParallaxSection className="py-20" decorative>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <FloatingElement
            key={stat.label}
            delay={index * 0.1}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                type: "spring",
                delay: index * 0.1,
                duration: 0.8
              }}
              className="text-4xl font-bold text-primary dark:text-primary/80 mb-2"
            >
              {stat.value}
            </motion.div>
            <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
          </FloatingElement>
        ))}
      </div>
    </div>
  </ParallaxSection>
);

const DestinationsSection = () => (
  <ParallaxSection className="py-16" decorative>
    <div className="container mx-auto px-4">
      <FloatingElement className="text-center mb-12">
        <span className="inline-block px-4 py-1 bg-accent/10 text-accent dark:text-accent/80 rounded-full text-sm font-semibold mb-4 transform -rotate-1">
          DESTINATIONS MÉDICALES
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
          <span className="relative z-10">Nos destinations d'excellence</span>
          <div className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 dark:bg-primary/20 transform -rotate-1 z-0"></div>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          SENI vous accompagne vers les meilleures destinations médicales, sélectionnées pour leur expertise et leurs infrastructures de qualité.
        </p>
      </FloatingElement>
      
      <div className="text-center mt-8">
        <Link href="/destinations">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full font-semibold shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <span>Explorer toutes nos destinations</span>
            <Icon icon="ri:arrow-right-line" />
          </motion.button>
        </Link>
      </div>
    </div>
  </ParallaxSection>
);

export default function Home() {
  const { currentLang } = useLanguage();

  return (
    <MotionWrapper>
      <main style={{ overflow: 'hidden' }}>
        <ParallaxSection decorative>
          <Hero />
        </ParallaxSection>
        
        <ServicesSection currentLang={currentLang} />
        <StatsSection />
        <TestimonialsSection />
        <DestinationsSection />
        <PartnersSection />
        
        <div className="h-8"></div>
      </main>
    </MotionWrapper>
  );
}


