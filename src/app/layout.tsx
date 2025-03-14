import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import RootClientWrapper from '@/components/layout/RootClientWrapper';
import type { Metadata } from 'next';

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
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-primary-darker overflow-x-hidden text-base antialiased">
        <RootClientWrapper>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <main className="flex-grow w-full">
              {children}
            </main>
          </Suspense>
          <Footer />
        </RootClientWrapper>
      </body>
    </html>
  );
}
