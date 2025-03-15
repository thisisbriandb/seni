"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import DestinationStats from '@/components/destinations/DestinationStats';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  specialties: string[];
}

const destinations: Destination[] = [
  {
    id: 'mar',
    name: 'Maroc',
    description: 'Découvrez l\'excellence médicale au Maroc, où la tradition millénaire rencontre la médecine moderne. Nos établissements partenaires offrent des soins de qualité internationale dans un cadre accueillant et culturellement riche.',
    image: '/images/destinations/maroc.jpg',
    specialties: [
      'Chirurgie Esthétique',
      'Dentisterie',
      'Ophtalmologie',
      'Cardiologie',
      'Orthopédie'
    ]
  },
  {
    id: 'tun',
    name: 'Tunisie',
    description: 'La Tunisie, destination prisée pour le tourisme médical, combine expertise médicale et hospitalité légendaire. Profitez de soins de haute qualité dans des cliniques modernes à des tarifs compétitifs.',
    image: '/images/destinations/tunisie.jpg',
    specialties: [
      'Chirurgie Esthétique',
      'Soins Dentaires',
      'Thalassothérapie',
      'Chirurgie Bariatrique',
      'Procréation Médicalement Assistée'
    ]
  },
  {
    id: 'sen',
    name: 'Sénégal',
    description: 'Le Sénégal émerge comme une destination médicale de choix en Afrique de l\'Ouest. Nos partenaires hospitaliers combinent expertise africaine et standards internationaux pour des soins personnalisés.',
    image: '/images/destinations/senegal.jpg',
    specialties: [
      'Médecine Générale',
      'Pédiatrie',
      'Gynécologie',
      'Cardiologie',
      'Médecine Tropicale'
    ]
  }
];

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#003366] to-[#004080]">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Remplacement de l'image par un dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004080] to-[#00509E] z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
          >
            Nos Destinations Médicales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-center max-w-2xl"
          >
            Découvrez nos destinations de choix pour vos soins médicaux, alliant expertise médicale et hospitalité exceptionnelle
          </motion.p>
        </div>
      </div>
  
      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{destination.name}</h3>
                <p className="text-white/80 mb-4">{destination.description}</p>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white mb-2">Spécialités:</h4>
                  {destination.specialties.map((specialty, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-white/80"
                    >
                      <Icon icon="carbon:medicine-pill" className="w-5 h-5 mr-2" />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedDestination(selectedDestination === destination.id ? null : destination.id)}
                  className="mt-6 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                >
                  {selectedDestination === destination.id ? 'Masquer les statistiques' : 'Voir les statistiques'}
                </button>
                {selectedDestination === destination.id && (
                  <DestinationStats
                    destinationId={destination.id}
                    isVisible={true}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}