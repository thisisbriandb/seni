"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// Données des partenaires
const partners = [
  {
    id: 'polyclinique',
    name: 'Polyclinique Internationale de Rabat',
    shortDesc: 'Structure hospitalière privée de référence au Maroc depuis 1996',
    logo: '/images/partners/polyclinique/principale.jpg',
    images: [
      '/images/partners/polyclinique/IMG-20250322-WA0001.jpg',
      '/images/partners/polyclinique/IMG-20250322-WA0002.jpg',
      '/images/partners/polyclinique/IMG-20250322-WA0003.jpg',
      '/images/partners/polyclinique/IMG-20250322-WA0004.jpg',
    ],
    website: 'polycliniquerabat.com',
    description: `La Polyclinique Internationale de Rabat est une structure hospitalière privée, implantée depuis 1996 au cœur de la Capitale du Royaume du Maroc. Première et unique clinique certifiée ISO 9001, version 2000, elle a gagné la confiance des patients nationaux et internationaux grâce à la compétence de ses médecins et son personnel.`,
    specialties: [
      'Neurologie', 'Cardiologie', 'Chimiothérapie', 'Radiothérapie', 'Gastro-Entérologie',
      'Lithotritie', 'Médecine Interne', 'ORL', 'Réanimation', 'Rééducation Fonctionnelle',
      'Urgences Médicales', 'Dialyse', 'Coronographie', 'Médecine de la douleur', 'Traumato-Orthopédie',
      'Ophtalmologie', 'Gynécologie', 'Urologie', 'Pédiatrie', 'Pneumologie'
    ],
    chirurgicalSpecialties: [
      'Neurochirurgie', 'Chirurgie Cancérologique', 'Chirurgie Cardiaque', 'Chirurgie de la Main',
      'Chirurgie Endoscopique', 'Chirurgie Maxillo-Faciale', 'Chirurgie Thoracique',
      'Chirurgie Viscérale', 'Chirurgie Infantile', 'Gynécologie-Obstétrique'
    ],
    quote: {
      text: "Le Patient pour nous est un proche parent dont nous défendons les droits à la santé dans un cadre serein et accueillant.",
      author: "Pr. Abdelmajid SAOURA"
    }
  },
  {
    id: 'littoral',
    name: 'Clinique d\'oncologie le Littoral',
    shortDesc: 'Centre spécialisé dans la prévention et le traitement du cancer',
    logo: '/images/partners/littoral/principale.webp',
    images: [
      '/images/partners/littoral/littoral.webp',
      '/images/partners/littoral/littoral2.webp',
      '/images/partners/littoral/littoral3.webp'
    ],
    website: 'cliniquelelittoral.ma',
    description: 'Spécialisée dans la prévention et le traitement du cancer, la clinique Le Littoral fait partie du groupe Oncorad avec une présence dans 5 villes au Maroc. Le centre s\'étend sur plus de 5500 m2 et dispose d\'équipements de dernière génération.',
    specialties: [
      'Cancer du sein : Sénologie',
      'Chimiothérapie : Oncologie médicale',
      'Curiethérapie',
      'Hématologie',
      'Médecine nucléaire',
      'Radiothérapie',
      'Réanimation',
      'Hôpital du jour',
      'Radiologie'
    ]
  },
  {
    id: 'pasteur',
    name: 'Hôpital Privé Pasteur',
    shortDesc: 'Hôpital privé multidisciplinaire à Hay Riad, Rabat',
    logo: '/images/partners/hopitalPasteur/pasteur.jpg',
    images: [
      '/images/partners/hopitalPasteur/IMG-20250322-WA0004.jpg'
    ],
    website: 'hopitalprivepasteur.com',
    description: 'Situé dans le quartier de Hay Riad à Rabat, cet hôpital privé multidisciplinaire offre des services dans différentes spécialités médico-chirurgicales, un service d\'urgence 24H/24 et un centre de radiologie indépendant.',
    specialties: [
      'Cardiologie',
      'Traumatologie',
      'Pôle mère-enfants',
      'Service d\'urgence 24H/24',
      'Radiologie'
    ],
    highlights: [
      'Services multidisciplinaires',
      'Urgences 24H/24',
      'Centre de radiologie indépendant',
      'Équipes médicales d\'expérience internationale',
      'Environnement sécurisé et confortable'
    ]
  }
];

export default function PartnersPage() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePartnerClick = (partnerId: string) => {
    setSelectedPartner(selectedPartner === partnerId ? null : partnerId);
    setCurrentImageIndex(0);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D7490]/10 dark:from-[#3CC7EE]/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Nos Partenaires de Santé
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Des établissements de santé de renommée internationale, offrant des soins médicaux de haute qualité
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                layout
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6 cursor-pointer" onClick={() => handlePartnerClick(partner.id)}>
                  {/* Image et informations de base */}
                  <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Link
                        href={`/partners/${partner.id}`}
                        className="block group"
                      >
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#3CC7EE] transition-colors">
                          {partner.name}
                        </h3>
                        <p className="text-gray-200 text-sm">{partner.shortDesc}</p>
                      </Link>
                    </div>
                  </div>

                  {/* Aperçu des spécialités */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Spécialités principales
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.specialties.slice(0, 6).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#0D7490]/10 dark:bg-[#3CC7EE]/10 text-[#0D7490] dark:text-[#3CC7EE] text-sm rounded-full"
                          >
                            {specialty.split(':')[0]}
                          </span>
                        ))}
                        {partner.specialties.length > 6 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                            +{partner.specialties.length - 6} autres
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center text-[#0D7490] dark:text-[#3CC7EE]">
                      <Icon icon="ri:global-line" className="w-5 h-5 mr-2" />
                      <a
                        href={`https://${partner.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {partner.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Détails étendus */}
                <AnimatePresence>
                  {selectedPartner === partner.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <div className="p-6">
                        {/* Galerie d'images */}
                        {partner.images.length > 0 && (
                          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                            <Image
                              src={partner.images[currentImageIndex]}
                              alt={`${partner.name} - Image ${currentImageIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                            {partner.images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex((prev) => 
                                      prev === 0 ? partner.images.length - 1 : prev - 1
                                    );
                                  }}
                                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                  <Icon icon="ri:arrow-left-s-line" className="w-6 h-6" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex((prev) => 
                                      prev === partner.images.length - 1 ? 0 : prev + 1
                                    );
                                  }}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                  <Icon icon="ri:arrow-right-s-line" className="w-6 h-6" />
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        {/* Description */}
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                          <p>{partner.description}</p>
                        </div>

                        {/* Citation si disponible */}
                        {partner.quote && (
                          <blockquote className="border-l-4 border-[#0D7490] dark:border-[#3CC7EE] pl-4 my-6 italic">
                            <p className="text-gray-600 dark:text-gray-300">{partner.quote.text}</p>
                            <footer className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              — {partner.quote.author}
                            </footer>
                          </blockquote>
                        )}

                        {/* Toutes les spécialités */}
                        <div className="mt-8">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Toutes les spécialités
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {partner.specialties.map((specialty, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                              >
                                <Icon icon="ri:check-line" className="w-5 h-5 text-[#0D7490] dark:text-[#3CC7EE]" />
                                <span>{specialty}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Spécialités chirurgicales si disponibles */}
                        {partner.chirurgicalSpecialties && (
                          <div className="mt-8">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                              Spécialités chirurgicales
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {partner.chirurgicalSpecialties.map((specialty, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <Icon icon="ri:surgical-mask-line" className="w-5 h-5 text-[#0D7490] dark:text-[#3CC7EE]" />
                                  <span>{specialty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Points forts si disponibles */}
                        {partner.highlights && (
                          <div className="mt-8">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                              Points forts
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {partner.highlights.map((highlight, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                                >
                                  <Icon icon="ri:star-fill" className="w-5 h-5 text-[#0D7490] dark:text-[#3CC7EE]" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 