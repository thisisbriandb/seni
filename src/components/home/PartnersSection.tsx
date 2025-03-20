"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const partners = [
  {
    id: 1,
    name: "Hopital International de Casablanca",
    location: "Rabat, Maroc",
    image: "/images/partners/casablanca.jpeg",
    specialties: ["Cardiologie", "Neurologie", "Oncologie"],
    rating: 4.8,
    reviews: 124,
    description: "Centre médical de pointe offrant des soins spécialisés avec des équipements de dernière génération.",
    link: "/partners/casablanca"
  },
  {
    id: 2,
    name: "Hôpital Américain de Paris",
    location: "Paris, France",
    image: "/images/partners/hopital-americain.jpg",
    specialties: ["Chirurgie", "Radiologie", "Pédiatrie"],
    rating: 4.9,
    reviews: 156,
    description: "Institution médicale renommée combinant expertise française et standards américains.",
    link: "/partners/hopital-americain"
  },
  {
    id: 3,
    name: "Clinique La Soukra",
    location: "Tunis, Tunisie",
    image: "/images/partners/clinique-soukra.jpg",
    specialties: ["Orthopédie", "Ophtalmologie", "Urologie"],
    rating: 4.7,
    reviews: 98,
    description: "Établissement médical moderne spécialisé dans les interventions chirurgicales de pointe.",
    link: "/partners/clinique-soukra"
  },
  {
    id: 4,
    name: "Hôpital Principal de Dakar",
    location: "Dakar, Sénégal",
    image: "/images/partners/hopital-dakar.jpg",
    specialties: ["Traumatologie", "Gynécologie", "Cardiologie"],
    rating: 4.6,
    reviews: 87,
    description: "Centre hospitalier de référence en Afrique de l'Ouest avec une expertise reconnue.",
    link: "/partners/hopital-dakar"
  }
];

export default function PartnersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary/80 rounded-full text-sm font-semibold mb-4">
            NOS PARTENAIRES DE CONFIANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hôpitaux et Cliniques Partenaires
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nous collaborons avec les meilleurs établissements médicaux pour vous garantir des soins d'excellence et un accompagnement personnalisé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {partner.name}
                </h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <Icon icon="mdi:location" className="mr-1" />
                  <span className="text-sm">{partner.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {partner.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary/80 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="mdi:star"
                          className={`w-4 h-4 ${
                            i < Math.floor(partner.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ({partner.reviews})
                    </span>
                  </div>
                  <Link
                    href={partner.link}
                    className="text-primary dark:text-primary/80 hover:underline text-sm font-medium"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/partners">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full font-semibold shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>Voir tous nos partenaires</span>
              <Icon icon="ri:arrow-right-line" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
} 