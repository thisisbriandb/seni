"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageTransition from '../language/LanguageTransition';
import { Icon } from '@iconify/react';

const footerLinks = [
  {
    title: 'footer.links.company.title',
    links: [
      { label: 'footer.links.company.about', href: '/about' },
      { label: 'footer.links.company.services', href: '/services' },
      { label: 'footer.links.company.team', href: '/about#team' },
      { label: 'footer.links.company.contact', href: '/contact' },
    ]
  },
  {
    title: 'footer.links.destinations.title',
    links: [
      { label: 'Maroc', href: '/destinations/mar' },
      { label: 'Tunisie', href: '/destinations/tun' },
      { label: 'Sénégal', href: '/destinations/sen' },
      { label: 'France', href: '/destinations/fra' },
    ]
  },
  {
    title: 'footer.links.legal.title',
    links: [
      { label: 'footer.links.legal.terms', href: '/terms' },
      { label: 'footer.links.legal.privacy', href: '/privacy' },
      { label: 'footer.links.legal.cookies', href: '/cookies' },
    ]
  }
];

const socialLinks = [
  { icon: "ri:facebook-fill", href: 'https://facebook.com/seni' },
  { icon: "ri:instagram-fill", href: 'https://instagram.com/seni' },
  { icon: "ri:twitter-fill", href: 'https://twitter.com/seni' },
];

const contactInfo = [
  { icon: "ri:map-pin-fill", text: 'Bangui, République Centrafricaine' },
  { icon: "ri:phone-fill", text: '+236 72 00 00 00' },
  { icon: "ri:mail-fill", text: 'contact@seni.cf' },
];

export default function Footer() {
  const { currentLang, t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  console.log("Footer rendering with language:", currentLang);

  return (
    <footer className="w-full pt-12 md:pt-16 pb-8 md:pb-16 relative text-white bg-primary-darker overflow-hidden mt-auto">
      {/* Fond avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-darker to-primary-darker"></div>
      
      {/* Motif de fond animé */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/images/pattern-dark.svg')]"
        />
      </div>

      {/* Cercles décoratifs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-full h-full opacity-10"
      >
        <div className="absolute w-full h-full rounded-full border-2 border-white/20" />
        <div className="absolute w-3/4 h-3/4 top-1/8 left-1/8 rounded-full border-2 border-white/15" />
        <div className="absolute w-1/2 h-1/2 top-1/4 left-1/4 rounded-full border-2 border-white/10" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16"
        >
          {/* Logo et description */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo-white.svg" 
                alt="SENI" 
                width={120} 
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
            <div className="text-white/80 text-xs md:text-sm leading-relaxed">
              <LanguageTransition text="footer.description" lang={currentLang} />
            </div>
            
            {/* Contact info avec animations au survol */}
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/80 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-1.5 md:p-2 rounded-full bg-white/5 group-hover:bg-white/10"
                  >
                    <Icon icon={item.icon} className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                  </motion.div>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Liens avec effet de survol amélioré */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-4 md:space-y-6">
              <h3 className="font-semibold text-base md:text-lg relative">
                <LanguageTransition text={section.title} lang={currentLang} />
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-blue-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  viewport={{ once: true }}
                />
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link href={link.href}>
                      <span className="text-white/70 hover:text-white text-xs md:text-sm inline-block relative group">
                        {link.label.includes('footer') ? (
                          <LanguageTransition text={link.label} lang={currentLang} />
                        ) : (
                          link.label
                        )}
                        <motion.span
                          className="absolute left-0 -bottom-0.5 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Séparateur animé */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6 md:my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Bas de page avec animation des réseaux sociaux */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <motion.div 
            className="text-xs md:text-sm text-white/60 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} SENI. <LanguageTransition text="footer.rights" lang={currentLang} />
          </motion.div>
          
          {/* Réseaux sociaux avec orbite */}
          <motion.div 
            className="flex gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                />
                <div className="relative p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 transition-colors group-hover:bg-white/20">
                  <Icon icon={social.icon} className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 