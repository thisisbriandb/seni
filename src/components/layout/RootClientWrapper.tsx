"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}