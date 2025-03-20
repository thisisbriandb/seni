"use client";

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// Importation des données des destinations
const destinations = [
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
    ],
    details: {
      overview: 'Le Maroc s\'est imposé comme une destination médicale de premier choix, alliant expertise médicale moderne et hospitalité traditionnelle. Nos établissements partenaires au Maroc sont équipés des dernières technologies et emploient des praticiens hautement qualifiés.',
      facilities: [
        'Cliniques modernes aux normes internationales',
        'Équipements de dernière génération',
        'Chambres privées luxueuses',
        'Service d\'assistance en français',
        'Transport depuis l\'aéroport'
      ],
      location: 'Principales villes : Casablanca, Rabat, Marrakech',
      advantages: [
        'Proximité avec l\'Europe',
        'Climat agréable toute l\'année',
        'Personnel médical multilingue',
        'Tarifs compétitifs',
        'Possibilité de combiner soins et tourisme'
      ]
    }
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
    ],
    details: {
      overview: 'La Tunisie est reconnue internationalement pour la qualité de ses soins médicaux et son expertise en chirurgie esthétique. Le pays dispose d\'infrastructures médicales modernes et d\'un personnel hautement qualifié formé aux dernières techniques.',
      facilities: [
        'Cliniques certifiées aux standards européens',
        'Centres de thalassothérapie luxueux',
        'Suites privées avec vue sur mer',
        'Service de conciergerie médicale',
        'Transferts privés inclus'
      ],
      location: 'Principales villes : Tunis, Sousse, Hammamet',
      advantages: [
        'Excellence en chirurgie esthétique',
        'Rapport qualité-prix exceptionnel',
        'Récupération dans un cadre balnéaire',
        'Cliniques ultramodernes',
        'Accompagnement personnalisé'
      ]
    }
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
    ],
    details: {
      overview: 'Le Sénégal se distingue par son excellence médicale en Afrique de l\'Ouest, offrant des soins de qualité internationale dans un environnement accueillant. Les établissements partenaires allient expertise locale et standards internationaux.',
      facilities: [
        'Hôpitaux modernes aux normes internationales',
        'Centres médicaux spécialisés',
        'Hébergement confortable',
        'Service d\'interprétation',
        'Assistance administrative complète'
      ],
      location: 'Principales villes : Dakar, Saint-Louis',
      advantages: [
        'Personnel médical hautement qualifié',
        'Expertise en médecine tropicale',
        'Accueil chaleureux',
        'Accessibilité depuis l\'Europe et l\'Afrique',
        'Accompagnement personnalisé'
      ]
    }
  }
];

export default function DestinationDetail() {
  const params = useParams();
  const destination = destinations.find(d => d.id === params.id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Destination non trouvée</h1>
          <Link href="/destinations" className="text-[#0D7490] dark:text-[#3CC7EE] hover:underline">
            Retour aux destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" />
        </div>
        <div className="relative h-full container mx-auto px-6 md:px-8 lg:px-12 flex items-center">
          <div className="max-w-3xl">
            <Link 
              href="/destinations"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-gray-900 dark:text-white mb-6 hover:bg-white dark:hover:bg-gray-900 transition-colors"
            >
              <Icon icon="carbon:arrow-left" className="w-4 h-4" />
              Retour aux destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-100 dark:border-gray-800"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                    À propos de la destination
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                    {destination.details.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Nos installations
                  </h3>
                  <ul className="space-y-4 md:space-y-5">
                    {destination.details.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                        <Icon icon="carbon:checkmark" className="w-6 h-6 flex-shrink-0 text-[#0D7490] dark:text-[#3CC7EE]" />
                        <span className="text-base md:text-lg">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Localisation
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
                    {destination.details.location}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Avantages
                  </h3>
                  <ul className="space-y-4 md:space-y-5">
                    {destination.details.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                        <Icon icon="carbon:star" className="w-6 h-6 flex-shrink-0 text-[#0D7490] dark:text-[#3CC7EE]" />
                        <span className="text-base md:text-lg">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 md:p-8 sticky top-24 border border-gray-100 dark:border-gray-800 shadow-lg"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Spécialités médicales
                </h3>
                <div className="space-y-4">
                  {destination.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                      <Icon icon="carbon:medicine" className="w-6 h-6 flex-shrink-0 text-[#0D7490] dark:text-[#3CC7EE]" />
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-200">{specialty}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="block">
                    <button className="w-full px-6 py-4 bg-[#0D7490] dark:bg-[#3CC7EE] text-white text-base md:text-lg font-medium rounded-xl hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3">
                      <Icon icon="carbon:email" className="w-6 h-6" />
                      <span>Nous contacter</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 