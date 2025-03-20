"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import MotionWrapper from '@/components/animations/MotionWrapper';
import ParallaxSection from '@/components/animations/ParallaxSection';
import FloatingElement from '@/components/animations/FloatingElement';
import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const statistics = [
  {
    value: "98%",
    label: "Taux de satisfaction",
    icon: "ri:emotion-happy-line"
  },
  {
    value: "2000+",
    label: "Patients accompagnés",
    icon: "ri:group-line"
  },
  {
    value: "45+",
    label: "Partenaires hospitaliers",
    icon: "ri:hospital-line"
  },
  {
    value: "24/7",
    label: "Support disponible",
    icon: "ri:customer-service-line"
  }
];

const faqs = [
  {
    question: "Combien de temps dure le processus de visa médical ?",
    answer: "Le délai moyen d'obtention du visa médical est de 7 à 10 jours ouvrables. Notre équipe s'occupe de toutes les démarches pour optimiser ce délai."
  },
  {
    question: "Comment se déroule la prise en charge à l'arrivée ?",
    answer: "Dès votre arrivée, un membre de notre équipe vous accueille à l'aéroport et vous accompagne vers votre hébergement. Nous organisons ensuite votre transport vers l'établissement médical selon le planning établi."
  },
  {
    question: "Les établissements partenaires parlent-ils français ?",
    answer: "Oui, tous nos établissements partenaires disposent de personnel francophone. De plus, nous fournissons un accompagnateur bilingue si nécessaire."
  },
  {
    question: "Que comprend le service d'hébergement ?",
    answer: "Notre service d'hébergement inclut la réservation d'un logement confortable à proximité de votre lieu de soins, adapté à vos besoins et à ceux de vos accompagnants."
  },
  {
    question: "Comment se passe le suivi post-traitement ?",
    answer: "Nous assurons un suivi régulier après votre traitement, coordonnons les rendez-vous de contrôle et facilitons la communication avec l'équipe médicale jusqu'à votre retour au pays."
  }
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Gestionnaire adaptatif pour les FAQ sur mobile (pour meilleure ergonomie tactile)
  const handleFaqClick = (index: number) => {
    if (isMobile) {
      // Sur mobile, nous permettons uniquement d'ouvrir une FAQ à la fois
      setOpenFaq(openFaq === index ? null : index);
    } else {
      // Sur desktop, comportement normal
      setOpenFaq(openFaq === index ? null : index);
    }
  };

  // Ajuster la hauteur du héro sur mobile pour éviter les problèmes de débordement
  useEffect(() => {
    const adjustHeight = () => {
      if (heroRef.current) {
        const viewportHeight = window.innerHeight;
        // Réduire légèrement la hauteur sur mobile pour éviter le défilement indésirable
        const element = heroRef.current as HTMLElement;
        element.style.minHeight = isMobile ? `${viewportHeight * 0.9}px` : '100vh';
      }
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, [isMobile]);

  return (
    <MotionWrapper>
      <main>
        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="relative flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900"
          style={{ opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-50" />
          
          {/* Hero Content */}
          <motion.div 
            className="container relative z-10 mx-auto px-4 py-20 sm:py-32 text-center"
            style={{ scale }}
          >
            <FloatingElement>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Voyagez pour votre santé,<br className="hidden sm:block" />
                nous nous occupons de tout
              </motion.h1>
            </FloatingElement>

            <FloatingElement delay={0.2}>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Une prise en charge médicale d'excellence au Maroc,<br className="hidden sm:block" />
                avec un accompagnement personnalisé de A à Z
              </motion.p>
            </FloatingElement>

            <FloatingElement delay={0.4}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl inline-flex items-center gap-1 sm:gap-2 group"
              >
                <span>Obtenir une assistance maintenant</span>
                <Icon 
                  icon="ri:arrow-right-line" 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                />
              </motion.button>
            </FloatingElement>
          </motion.div>
        </motion.div>

        {/* Video Section */}
        <ParallaxSection className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800" decorative>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <FloatingElement>
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Découvrez comment nous transformons des vies !
                </motion.h2>
              </FloatingElement>

              <FloatingElement delay={0.2}>
                <motion.div
                  className="relative aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl transform-gpu"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Cinema Effect Top */}
                  <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 md:h-12 bg-gradient-to-b from-black to-transparent z-10" />
                  
                  <iframe
                    src="https://www.youtube.com/embed/pcev7-kVMGg?autoplay=0&rel=0"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Cinema Effect Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 md:h-12 bg-gradient-to-t from-black to-transparent z-10" />
                </motion.div>
              </FloatingElement>

              <FloatingElement delay={0.4}>
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-gray-300 text-center mt-4 sm:mt-6 md:mt-8 max-w-2xl mx-auto px-2 sm:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Regardez comment notre équipe accompagne chaque patient dans son parcours de soins, de l'arrivée au Maroc jusqu'au retour au pays.
                </motion.p>
              </FloatingElement>
            </div>
          </div>
        </ParallaxSection>

        {/* Statistics Section */}
        <ParallaxSection className="py-10 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-900" decorative>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {statistics.map((stat, index) => (
                <FloatingElement key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-md sm:shadow-lg text-center"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#0D7490]/10 dark:bg-[#3CC7EE]/10 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <Icon icon={stat.icon} className="text-lg sm:text-xl md:text-2xl text-[#0D7490] dark:text-[#3CC7EE]" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.8, delay: index * 0.1 }}
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </motion.div>
                </FloatingElement>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* FAQ Section */}
        <ParallaxSection className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900" decorative>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FloatingElement>
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                    Questions fréquentes
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2 sm:px-0">
                    Retrouvez les réponses aux questions les plus courantes sur notre accompagnement médical.
                  </p>
                </div>
              </FloatingElement>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <FloatingElement key={index} delay={index * 0.1}>
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden"
                      initial={false}
                      animate={
                        openFaq === index 
                          ? { 
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                            } 
                          : {}
                      }
                    >
                      <motion.button
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
                        onClick={() => handleFaqClick(index)}
                      >
                        <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white pr-4">{faq.question}</span>
                        <Icon
                          icon="ri:arrow-down-s-line"
                          className={`text-lg sm:text-xl text-[#0D7490] dark:text-[#3CC7EE] transition-transform ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                        />
                      </motion.button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openFaq === index ? 'auto' : 0,
                          opacity: openFaq === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  </FloatingElement>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* Contact Section */}
        <ParallaxSection className="py-10 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-900" decorative>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FloatingElement>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
                  Besoin d'informations supplémentaires ?
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-5 sm:mb-6 md:mb-8 px-2 sm:px-0">
                  Notre équipe est disponible 24/7 pour répondre à toutes vos questions et vous accompagner dans votre démarche.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg inline-flex items-center gap-1 sm:gap-2"
                >
                  <Icon icon="ri:customer-service-2-line" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Contactez-nous</span>
                </motion.button>
              </FloatingElement>
            </div>
          </div>
        </ParallaxSection>
      </main>
    </MotionWrapper>
  );
} 