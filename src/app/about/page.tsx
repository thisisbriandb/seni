"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useContext, useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// Données de l'équipe
const teamMembers = [
  {
    name: "Briand BATAILLON",
    role: "Développeur & Tech Lead",
    specialty: "Plateforme digitale",
    image: "/images/team/briand.jpg",
    social: {
      linkedin: { icon: "ri:linkedin-fill", url: "https://linkedin.com/in/briand-bataillon" },
      github: { icon: "ri:github-fill", url: "https://github.com/briand" }
    },
    color: "from-blue-500 to-cyan-400"
  },
  {
    name: "Daly BEMBA",
    role: "Gestion & Logistique",
    specialty: "Coordination des voyages",
    image: "/images/team/member2.jpg",
    social: {
      linkedin: { icon: "ri:linkedin-fill", url: "https://linkedin.com/in/nom2" },
      twitter: { icon: "ri:twitter-fill", url: "https://twitter.com/nom2" }
    },
    color: "from-purple-500 to-pink-400"
  },
  {
    name: "NAMFEI OGUERE Alban Prestige",
    role: "Relations Médicales",
    specialty: "Mise en relation avec les hôpitaux",
    image: "/images/team/member1.jpg",
    social: {
      linkedin: { icon: "ri:linkedin-fill", url: "https://linkedin.com/in/nom3" },
      twitter: { icon: "ri:twitter-fill", url: "https://twitter.com/nom3" }
    },
    color: "from-emerald-500 to-teal-400"
  }
];

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
    <main ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-[#001F3F] to-[#000C1A]">
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
              className="text-white/80 text-sm capitalize"
            >
              {section}
            </motion.span>
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-white/20 relative ${
                currentSection === index ? 'bg-blue-400 border-blue-400' : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={currentSection === index ? {
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity }
              } : {}}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400"
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
        className="fixed left-0 top-0 h-1 bg-blue-400"
        style={{ width: scrollYProgress.get() * 100 + '%' }}
      />

      {/* Section Notre Mission */}
      <section className="relative min-h-screen flex items-center py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5" />
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl font-bold text-white mb-8">
                  Notre Mission
                </h1>
                <div className="prose prose-lg prose-invert">
                  <p className="text-xl text-white/80 leading-relaxed">
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
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Notre engagement</h3>
                <p className="text-white/90">
                  Assurer un parcours médical fluide et sécurisé pour chaque patient en quête de soins adaptés à son état de santé.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-2xl overflow-hidden group order-1 lg:order-2"
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

      {/* Section Équipe */}
      <section className="relative min-h-screen flex items-center py-32 px-4">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5" />
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              Notre Équipe
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Une équipe passionnée, unie par la vision d'un accès aux soins sans frontières
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl opacity-50" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative grid grid-cols-1 lg:grid-cols-3 gap-20 items-start"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative group ${index === 1 ? 'lg:mt-32' : index === 2 ? 'lg:mt-64' : ''}`}
                >
                  {/* Carte principale */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20"
                    >
                      {/* Image et overlay */}
                      <div className="relative h-80">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b ${member.color} mix-blend-overlay opacity-40`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>

                      {/* Contenu */}
                      <div className="relative p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                        <p className="text-white/80">{member.specialty}</p>
                      </div>
                    </motion.div>

                    {/* Cercle flottant avec les réseaux sociaux */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -right-6 top-1/2 -translate-y-1/2"
                    >
                      <div className="relative w-32 h-32">
                        {Object.entries(member.social).map(([platform, data], socialIndex) => {
                          const angle = (socialIndex / Object.keys(member.social).length) * Math.PI * 2;
                          const x = Math.cos(angle) * 50;
                          const y = Math.sin(angle) * 50;
                          
                          return (
                            <motion.a
                              key={platform}
                              href={data.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute p-3 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                              style={{
                                left: `${x + 50}%`,
                                top: `${y + 50}%`
                              }}
                              whileHover={{
                                backgroundColor: "#ffffff20",
                                scale: 1.2
                              }}
                            >
                              <Icon icon={data.icon} className="w-5 h-5 text-white" />
                            </motion.a>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 