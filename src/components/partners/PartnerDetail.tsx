"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Partner } from '@/types/partner';

// Données des partenaires (à déplacer dans un fichier séparé plus tard)
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

interface PartnerDetailProps {
  partner: Partner;
}

export default function PartnerDetail({ partner }: PartnerDetailProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!partner) {
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {partner.name}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Icon icon="mdi:map-marker" className="w-5 h-5 mr-2" />
              <span>{partner.location}</span>
            </div>
          </div>

          {partner.specialties && partner.specialties.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Spécialités
              </h2>
              <div className="flex flex-wrap gap-2">
                {partner.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10"
                  >
                    <Icon icon="mdi:tag" className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {specialty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {partner.description}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact
            </h2>
            {partner.phone && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Icon icon="mdi:phone" className="w-5 h-5 mr-3" />
                <a href={`tel:${partner.phone}`} className="hover:text-primary">
                  {partner.phone}
                </a>
              </div>
            )}
            {partner.website && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Icon icon="mdi:web" className="w-5 h-5 mr-3" />
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {partner.website}
                </a>
              </div>
            )}
            {partner.email && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Icon icon="mdi:email" className="w-5 h-5 mr-3" />
                <a href={`mailto:${partner.email}`} className="hover:text-primary">
                  {partner.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 