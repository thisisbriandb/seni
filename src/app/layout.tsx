import "./globals.css";
import { Outfit, DM_Sans, Playfair_Display } from 'next/font/google';
import RootClientWrapper from '@/components/layout/RootClientWrapper';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Police principale moderne
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

// Police pour les titres élégants
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

// Police pour le contenu
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  title: 'SENI | Votre passerelle médicale',
  description: 'Transport médical international et assistance sanitaire en Afrique',
  keywords: 'médical, transport, international, Afrique, santé',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    shortcut: [
      {
        url: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
  },
  openGraph: {
    title: 'SENI | Votre passerelle médicale',
    description: 'Transport médical international et assistance sanitaire en Afrique',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'SENI Logo',
      }
    ],
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SENI | Votre passerelle médicale',
    description: 'Transport médical international et assistance sanitaire en Afrique',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${playfair.variable} ${dmSans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased font-dm-sans relative transition-colors duration-300">
        {/* Formes géométriques décoratives médicales */}
        <div className="fixed top-20 right-20 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl transition-colors duration-300"></div>
        <div className="fixed bottom-40 left-10 w-48 h-48 bg-secondary/10 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl transition-colors duration-300"></div>
        <div className="fixed top-40 left-1/4 w-24 h-24 bg-accent/10 dark:bg-accent/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl transition-colors duration-300"></div>
        
        <ThemeProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <RootClientWrapper>
              {children}
            </RootClientWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
