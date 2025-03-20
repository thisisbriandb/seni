"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import DestinationStats from '@/components/destinations/DestinationStats';

// Chargement dynamique du globe interactif
const DynamicGlobe = dynamic(() => import('@/components/map/InteractiveGlobe'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] w-full bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#0D7490]/20 border-t-[#0D7490] rounded-full animate-spin" />
        <span className="text-[#0D7490] font-medium">Chargement de la carte...</span>
      </div>
    </div>
  )
});

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
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#0D7490]/10 dark:from-[#3CC7EE]/5 to-white dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-8 shadow-sm">
              <Icon icon="carbon:location" className="w-5 h-5 text-[#0D7490] dark:text-[#3CC7EE]" />
              <span className="text-sm font-medium text-[#0D7490] dark:text-[#3CC7EE]">Réseau international</span>
            </span>
            
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8 leading-tight">
              Nos destinations médicales
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Un réseau de centres médicaux d'excellence sélectionnés avec soin pour garantir votre bien-être et votre satisfaction
            </p>
          </motion.div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-16 bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-8 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Notre réseau international
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Découvrez nos établissements partenaires à travers le monde
              </p>
            </div>
            <div className="w-full h-[600px] relative overflow-hidden">
              <DynamicGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
              Explorez nos destinations de choix
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Des établissements médicaux d'excellence sélectionnés pour leur expertise et leur qualité de service
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-56">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-semibold text-white">
                    {destination.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {destination.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Spécialités:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.specialties.slice(0, 3).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-[#0D7490]/5 dark:bg-[#3CC7EE]/10 text-[#0D7490] dark:text-[#3CC7EE] font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                      {destination.specialties.length > 3 && (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                          +{destination.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/destinations/${destination.id}`} className="block">
                    <button className="w-full px-6 py-3 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg">
                      <span>En savoir plus</span>
                      <Icon icon="carbon:arrow-right" className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'carbon:hospital', value: '10+', label: 'Centres médicaux' },
              { icon: 'carbon:earth', value: '3', label: 'Pays couverts' },
              { icon: 'carbon:person-favorite', value: '24/7', label: 'Support médical' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#0D7490]/5 dark:bg-[#3CC7EE]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon icon={stat.icon} className="w-6 h-6 text-[#0D7490] dark:text-[#3CC7EE]" />
                </div>
                <div className="text-3xl font-medium text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6">
              Besoin d'assistance médicale ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Notre équipe est disponible 24/7 pour répondre à vos besoins
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-[#0D7490] dark:bg-[#3CC7EE] text-white rounded-full hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all">
                Contactez-nous
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}