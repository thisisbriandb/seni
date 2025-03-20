"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const footerLinks = [
  {
    title: 'Liens rapides',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'À propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Maroc', href: '/destinations/mar' },
      { label: 'Tunisie', href: '/destinations/tun' },
      { label: 'Sénégal', href: '/destinations/sen' },
      { label: 'France', href: '/destinations/fra' },
      { label: 'Toutes les destinations', href: '/destinations' },
    ]
  },
  {
    title: 'Légal',
    links: [
      { label: 'CGU', href: '/terms' },
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
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
  { icon: "ri:phone-fill", text: '+212 07 78 79 83 86' },
  { icon: "ri:mail-fill", text: 'contactsenimaroc@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 relative text-white bg-gradient-to-b from-[#0D7490] to-[#083F4D] overflow-hidden mt-auto">
      {/* Motif de fond animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          {/* Logo and description */}
          <div className="space-y-8 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png"
                alt="SENI" 
                width={120} 
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <div className="text-white/80 text-base leading-relaxed max-w-sm">
              SENI est votre partenaire de confiance pour tous vos besoins en transport médical international et assistance sanitaire en Afrique.
            </div>
            
            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 text-base text-white/80 group hover:translate-x-1 transition-transform"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Icon icon={item.icon} className="w-5 h-5 text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Links sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="font-semibold text-lg relative">
                {section.title}
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-white/30" />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="text-white/70 hover:text-white text-base inline-block py-1.5 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />
        
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <div className="text-base text-white/60 text-center md:text-left">
            © {new Date().getFullYear()} SENI. Tous droits réservés.
          </div>
          
          {/* Social links */}
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group hover:scale-110 transition-transform"
              >
                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 transition-colors group-hover:bg-white/20">
                  <Icon icon={social.icon} className="w-5 h-5 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}