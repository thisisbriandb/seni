"use client";

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Header />
      {children}
      <Footer />
    </LanguageProvider>
  );
}