"use client";

import { motion } from 'framer-motion';
import { useContext } from 'react';
import Hero from '@/components/hero/Hero';
import ServiceGrid from '@/components/services/ServiceGrid';
import MotionWrapper from '@/components/animations/MotionWrapper';
import ParallaxSection from '@/components/animations/ParallaxSection';
import FloatingElement from '@/components/animations/FloatingElement';
import LanguageTransition from '@/components/language/LanguageTransition';
import { MedicalService } from '@/types/medical';
import ServiceCard from '@/components/services/ServiceCard';
import { Metadata } from 'next';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Icon } from '@iconify/react';

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

// Témoignages de patients
const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    location: "Bangui",
    testimonial: "SENI a transformé mon parcours médical. Leur équipe professionnelle a organisé mon transfert au Maroc pour une opération complexe. Je suis reconnaissante pour leur soutien continu.",
    avatar: "/images/testimonials/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Jean Kotto",
    location: "Bimbo",
    testimonial: "Après des mois d'incertitude, SENI m'a mis en contact avec un spécialiste en Tunisie qui a diagnostiqué correctement mon état. Le processus était fluide et rassurant.",
    avatar: "/images/testimonials/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Claire Mbeki",
    location: "Bouar",
    testimonial: "L'assistance administrative de SENI a été extraordinaire. Ils ont géré toute la paperasse pour mon visa médical au Sénégal, me permettant de me concentrer uniquement sur ma santé.",
    avatar: "/images/testimonials/avatar-3.jpg"
  }
];

// Destinations médicales
const destinations = [
  {
    id: 1,
    name: "Maroc",
    description: "Un pôle d'excellence médicale en Afrique du Nord, offrant des installations médicales de classe mondiale à des prix accessibles.",
    image: "/images/destinations/maroc.jpg",
    specialties: ["Cardiologie", "Orthopédie", "Oncologie"]
  },
  {
    id: 2,
    name: "Tunisie",
    description: "Reconnue pour ses cliniques spécialisées et son expertise en chirurgie esthétique et soins dentaires avancés.",
    image: "/images/destinations/tunisie.jpg",
    specialties: ["Chirurgie esthétique", "Soins dentaires", "Ophtalmologie"]
  },
  {
    id: 3,
    name: "Sénégal",
    description: "Un centre médical émergent en Afrique de l'Ouest, offrant des installations modernes pour les soins et traitements essentiels.",
    image: "/images/destinations/senegal.jpg",
    specialties: ["Pédiatrie", "Gynécologie", "Médecine générale"]
  }
];

// Hôpitaux partenaires
const hospitals = [
  {
    id: 1,
    name: "Hôpital International de Casablanca",
    country: "Maroc",
    description: "Centre médical d'excellence offrant des soins spécialisés avec les dernières technologies médicales.",
    image: "/images/partners/casablanca.jpg",
    specialties: ["Cardiologie", "Neurologie", "Oncologie"]
  },
  {
    id: 2,
    name: "Medicana Turquie",
    country: "Turquie",
    description: "Réseau hospitalier de premier plan combinant expertise médicale et technologies de pointe pour des résultats optimaux.",
    image: "/images/partners/medicana.jpg",
    specialties: ["Transplantation", "Chirurgie robotique", "Réadaptation"]
  },
  {
    id: 3,
    name: "Clinique Pasteur Tunisie",
    country: "Tunisie",
    description: "Établissement réputé pour l'excellence de ses soins personnalisés et son équipe médicale hautement qualifiée.",
    image: "/images/partners/pasteur.jpg",
    specialties: ["Cardiologie", "Chirurgie esthétique", "Ophtalmologie"]
  }
];

export default function Home() {
  const { currentLang, t } = useLanguage();

  return (
    <MotionWrapper>
      <main style={{ overflow: 'hidden' }}>
        {/* Section Héro */}
        <ParallaxSection decorative>
          <Hero />
        </ParallaxSection>

        {/* Section Services */}
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

        {/* Section Statistiques */}
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
                    className="text-4xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </FloatingElement>
              ))}
            </div>
          </div>
        </ParallaxSection>
        
        {/* Section Témoignages */}
        <ParallaxSection className="py-20 bg-gradient-to-b from-white to-background-alt" decorative>
          <div className="container mx-auto px-4">
            <FloatingElement className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 transform -rotate-1">TÉMOIGNAGES DE PATIENTS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 relative inline-block">
                <span className="relative z-10">Ils nous font confiance</span>
                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-accent/30 transform -rotate-1 z-0"></div>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Découvrez les expériences de patients qui ont bénéficié de nos services d'accompagnement médical international.
              </p>
            </FloatingElement>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <FloatingElement
                  key={testimonial.id}
                  delay={index * 0.2}
                  className="h-full"
                >
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                    className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col relative overflow-hidden group"
                  >
                    {/* Accent de couleur */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent" />
                    
                    {/* Accent géométrique */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-br-3xl transform -translate-x-4 -translate-y-4 group-hover:bg-primary/10 transition-all duration-300" />
                    
                    {/* Icône de citation */}
                    <div className="text-primary-light opacity-10 text-6xl absolute top-4 right-4 group-hover:opacity-15 transition-all duration-300">
                      <Icon icon="ri:double-quotes-l" />
                    </div>
                    
                    <div className="mb-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <Icon icon="ri:user-fill" className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{testimonial.name}</h3>
                        <p className="text-sm text-text-light">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary flex-grow italic">{testimonial.testimonial}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex">
                        <Icon icon="ri:star-fill" className="text-warning" />
                        <Icon icon="ri:star-fill" className="text-warning" />
                        <Icon icon="ri:star-fill" className="text-warning" />
                        <Icon icon="ri:star-fill" className="text-warning" />
                        <Icon icon="ri:star-fill" className="text-warning" />
                      </div>
                      <span className="text-xs text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">Vérifié</span>
                    </div>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          </div>
        </ParallaxSection>
        
        {/* Section Nos Destinations */}
        <ParallaxSection className="py-16" decorative>
          <div className="container mx-auto px-4">
            <FloatingElement className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 transform -rotate-1">DESTINATIONS MÉDICALES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 relative inline-block">
                <span className="relative z-10">Nos destinations d'excellence</span>
                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-primary/30 transform -rotate-1 z-0"></div>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                SENI vous accompagne vers les meilleures destinations médicales, sélectionnées pour leur expertise et leurs infrastructures de qualité.
              </p>
            </FloatingElement>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
              {destinations.map((destination, index) => (
                <FloatingElement
                  key={destination.id}
                  delay={index * 0.2}
                  className="h-full"
                >
                  <motion.div 
                    whileHover={{ y: -8, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                    className="rounded-xl shadow-lg h-full flex flex-col relative overflow-hidden group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div 
                        className="absolute inset-0 bg-primary/40 z-0"
                        style={{
                          backgroundImage: destination.image ? `url(${destination.image})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                        <div className="flex items-center">
                          <Icon icon="ri:map-pin-fill" className="text-white/90 mr-1" />
                          <p className="text-white/90 text-sm">Destination médicale</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white flex-grow flex flex-col">
                      <p className="text-text-secondary mb-6">{destination.description}</p>
                      
                      <div className="mt-auto">
                        <p className="text-sm font-semibold text-primary-dark mb-2">Spécialités médicales :</p>
                        <div className="flex flex-wrap gap-2">
                          {destination.specialties.map((specialty, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 m-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md z-30">
                      <Icon 
                        icon="ri:plane-fill" 
                        className="text-xl text-primary" 
                      />
                    </div>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/destinations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <span>Explorer toutes nos destinations</span>
                  <Icon icon="ri:arrow-right-line" />
                </motion.button>
              </Link>
            </div>
          </div>
        </ParallaxSection>
        
        {/* Section Hôpitaux Partenaires - Carrousel */}
        <ParallaxSection className="py-20 bg-background-alt" decorative>
          <div className="container mx-auto px-4">
            <FloatingElement className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 transform -rotate-1">RÉSEAU INTERNATIONAL</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 relative inline-block">
                <span className="relative z-10">Nos hôpitaux partenaires</span>
                <div className="absolute -bottom-2 left-0 right-0 h-2 bg-accent/30 transform -rotate-1 z-0"></div>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                SENI collabore avec les établissements médicaux les plus prestigieux pour vous garantir des soins d'excellence.
              </p>
            </FloatingElement>
            
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8 py-6"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 20,
                  ease: "linear"
                }}
              >
                {/* Répétez les hôpitaux pour créer un effet de défilement continu */}
                {[...hospitals, ...hospitals].map((hospital, index) => (
                  <motion.div
                    key={`${hospital.id}-${index}`}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="min-w-[320px] md:min-w-[400px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                      <div
                        className="h-full w-full bg-gray-200"
                        style={{
                          backgroundImage: `url(${hospital.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="absolute top-0 left-0 m-4 bg-white/80 backdrop-blur-sm rounded-lg py-1 px-3 z-20">
                        <p className="text-sm font-semibold text-primary">{hospital.country}</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary-dark mb-2">{hospital.name}</h3>
                      <p className="text-text-secondary text-sm mb-4">{hospital.description}</p>
                      
                      <div className="mt-2">
                        <p className="text-xs font-medium text-text-light mb-1">Spécialités :</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto border-t border-gray-100 p-4">
                      <Link href={`/partners/${hospital.id}`}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-sm text-primary font-medium flex items-center gap-1"
                        >
                          <span>En savoir plus</span>
                          <Icon icon="ri:arrow-right-s-line" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link href="/partners">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <span>Découvrir tous nos partenaires</span>
                  <Icon icon="ri:arrow-right-line" />
                </motion.button>
              </Link>
            </div>
          </div>
        </ParallaxSection>
        
        {/* Espace de respiration avant le footer */}
        <div className="h-8"></div>
      </main>
    </MotionWrapper>
  );
} 