/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver les traces pour éviter les problèmes de permission
  tracing: {
    ignoreRootModule: true
  },
  // Désactiver la télémétrie
  telemetry: { 
    disabled: true 
  },
  // Conserver les configurations existantes
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    // Permet le chargement d'images depuis n'importe quelle source
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig; 