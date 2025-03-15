/** @type {import('next').NextConfig} */
const nextConfig = {
  // Options de configuration recommandées
  reactStrictMode: true,
  
  // Configuration des images
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Nouvelle syntaxe pour les packages externes de composants serveur
  serverExternalPackages: [],
  
  // Désactivation de la télémétrie via l'environnement
  env: {
    NEXT_TELEMETRY_DISABLED: '1'
  },
};

module.exports = nextConfig; 