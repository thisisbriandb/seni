"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const partners = [
  {
    id: 'polyclinique',
    name: "Polyclinique Internationale de Rabat",
    location: "Rabat, Maroc",
    image: "/images/partners/polyclinique/principale.jpg",
    specialties: ["Cardiologie", "Neurologie", "Chirurgie"],
    rating: 4.9,
    reviews: 156,
    description: "Structure hospitalière privée de référence au Maroc depuis 1996, certifiée ISO 9001.",
    link: "/partners/polyclinique"
  },
  {
    id: 'littoral',
    name: "Clinique d'oncologie le Littoral",
    location: "Casablanca, Maroc",
    image: "/images/partners/littoral/principale.webp",
    specialties: ["Oncologie", "Radiothérapie", "Chimiothérapie"],
    rating: 4.8,
    reviews: 132,
    description: "Centre spécialisé dans la prévention et le traitement du cancer avec présence dans 5 villes.",
    link: "/partners/littoral"
  },
  {
    id: 'pasteur',
    name: "Hôpital Privé Pasteur",
    location: "Rabat, Maroc",
    image: "/images/partners/hopitalPasteur/pasteur.jpg",
    specialties: ["Cardiologie", "Traumatologie", "Urgences"],
    rating: 4.7,
    reviews: 98,
    description: "Hôpital privé multidisciplinaire offrant des services médicaux de pointe 24H/24.",
    link: "/partners/pasteur"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
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