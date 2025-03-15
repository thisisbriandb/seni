import "./globals.css";
import { Inter } from 'next/font/google';
import RootClientWrapper from '@/components/layout/RootClientWrapper';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SENI | Votre passerelle médicale',
  description: 'Transport médical international et assistance sanitaire en Afrique',
  keywords: 'médical, transport, international, Afrique, santé',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#0077B6',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-primary-darker overflow-x-hidden text-base antialiased">
        <RootClientWrapper>
          {children}
        </RootClientWrapper>
      </body>
    </html>
  );
}
