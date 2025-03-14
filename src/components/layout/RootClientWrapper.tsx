"use client";

import { LanguageProvider } from '@/contexts/LanguageContext';
import ClientLayout from './ClientLayout';
import dynamic from 'next/dynamic';

const ThreeWrapper = dynamic(() => import('../three/ThreeWrapper'), { ssr: false });

interface RootClientWrapperProps {
  children: React.ReactNode;
}

export default function RootClientWrapper({ children }: RootClientWrapperProps) {
  return (
    <LanguageProvider>
      <ThreeWrapper>
        <ClientLayout>
          {children}
        </ClientLayout>
      </ThreeWrapper>
    </LanguageProvider>
  );
} 