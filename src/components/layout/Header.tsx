"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'À Propos', path: '/about' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <Image
              src="/logo.png"
              alt="SENI"
              width={120}
              height={48}
              className="h-8 sm:h-10 w-auto object-contain transition-transform hover:scale-105"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent dark:from-gray-900/10 mix-blend-overlay" />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#0D7490] dark:hover:text-[#3CC7EE] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="dark"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon icon="ri:sun-fill" className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="light"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon icon="ri:moon-fill" className="w-5 h-5 text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Join Us Button */}
            <Link
              href="/join-us"
              className="px-5 py-2.5 bg-primary/10 text-primary dark:text-primary/80 text-sm rounded-full hover:bg-primary/20 transition-all flex items-center gap-2 group"
            >
              <Icon icon="ri:team-line" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Nous rejoindre</span>
            </Link>

            <Link 
              href="/contact"
              className="px-5 py-2 bg-[#0D7490] dark:bg-[#3CC7EE] text-white text-sm rounded-full hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-sm md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-[#0D7490] dark:hover:text-[#3CC7EE] py-2 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-4">
                  {/* Theme Toggle Mobile */}
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
                  >
                    <Icon 
                      icon={theme === 'dark' ? "ri:sun-fill" : "ri:moon-fill"} 
                      className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-500' : 'text-gray-600'}`}
                    />
                    <span>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
                  </button>

                  {/* Join Us Button Mobile */}
                  <Link
                    href="/join-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-primary/10 text-primary dark:text-primary/80 rounded-full hover:bg-primary/20 transition-all"
                  >
                    <Icon icon="ri:team-line" className="w-5 h-5" />
                    <span>Nous rejoindre</span>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-[#0D7490] dark:bg-[#3CC7EE] text-white text-center py-2 rounded-full hover:bg-[#0D7490]/90 dark:hover:bg-[#3CC7EE]/90 transition-all"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 