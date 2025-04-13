import { Partner } from '@/types/partner'

// Données des partenaires
const partners: Partner[] = [
  {
    id: 'polyclinique',
    name: 'Polyclinique Internationale de Rabat',
    shortDesc: 'Structure hospitalière privée de référence au Maroc depuis 1996',
    logo: '/images/partners/polyclinique/principale.jpg',
    image: '/images/partners/polyclinique/principale.jpg',
    location: 'Rabat, Maroc',
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
    image: '/images/partners/littoral/principale.webp',
    location: 'Casablanca, Maroc',
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
    image: '/images/partners/hopitalPasteur/pasteur.jpg',
    location: 'Hay Riad, Rabat, Maroc',
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
]

// Fonction pour récupérer un partenaire par son ID
export function getPartnerById(id: string): Partner | undefined {
  return partners.find(partner => partner.id === id)
}

// Fonction pour récupérer tous les partenaires
export function getAllPartners(): Partner[] {
  return partners
}

// Export des données des partenaires
export { partners } 