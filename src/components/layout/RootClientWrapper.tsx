"use client";

import { LanguageProvider } from '@/contexts/LanguageContext';
import ClientLayout from './ClientLayout';

interface RootClientWrapperProps {
  children: React.ReactNode;
}

export default function RootClientWrapper({ children }: RootClientWrapperProps) {
  return (
    <LanguageProvider>
      <ClientLayout>
        {children}
      </ClientLayout>
    </LanguageProvider>
  );
} 