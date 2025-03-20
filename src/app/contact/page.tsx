"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { WHATSAPP_NUMBER } from '@/app/config/env';
import MotionWrapper from '@/components/animations/MotionWrapper';
import ParallaxSection from '@/components/animations/ParallaxSection';
import FloatingElement from '@/components/animations/FloatingElement';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitting(true);
    setNewsletterStatus('idle');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) throw new Error('Échec de l\'abonnement');

      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Bonjour, je souhaite avoir plus d'informations sur vos services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <MotionWrapper>
      <main>
        <ParallaxSection className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FloatingElement>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark text-center mb-2 sm:mb-4">
                  Contactez-nous
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-text-secondary text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
                  Notre équipe est à votre écoute pour répondre à toutes vos questions
                </p>
              </FloatingElement>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                {/* Formulaire de contact */}
                <FloatingElement delay={0.2}>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={isMobile ? 3 : 4}
                          value={formData.message}
                          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0, 119, 182, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-2.5 sm:py-3 md:py-4 rounded-lg font-medium sm:font-semibold text-white text-sm sm:text-base relative overflow-hidden
                          ${
                            isSubmitting
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] shadow-lg hover:shadow-xl'
                          }
                        `}
                      >
                        <span className="relative z-10">
                          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#1d4ed8] to-[#2563eb]"
                          initial={{ x: '100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>

                      {submitStatus === 'success' && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-600 text-xs sm:text-sm text-center font-medium bg-green-50 p-2 sm:p-3 rounded-lg"
                        >
                          Message envoyé avec succès !
                        </motion.p>
                      )}
                      {submitStatus === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-600 text-xs sm:text-sm text-center font-medium bg-red-50 p-2 sm:p-3 rounded-lg"
                        >
                          Une erreur est survenue. Veuillez réessayer.
                        </motion.p>
                      )}
                    </form>
                  </div>
                </FloatingElement>

                {/* Informations de contact et carte */}
                <FloatingElement delay={0.4}>
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* WhatsApp Button */}
                    <motion.button
                      onClick={handleWhatsAppClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 rounded-lg bg-green-500 text-white text-sm sm:text-base font-medium sm:font-semibold shadow-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <Icon icon="ri:whatsapp-fill" className="text-xl sm:text-2xl" />
                      <span>Nous contacter sur WhatsApp</span>
                    </motion.button>

                    {/* Google Maps */}
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl h-[250px] sm:h-[300px] md:h-[400px]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.905358332011!2d18.5440669!3d4.3611111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1056e10a0e2c8eef%3A0x7c3b4b4e1d2d5b0a!2sBangui%2C%20Central%20African%20Republic!5e0!3m2!1sen!2sfr!4v1647356789012!5m2!1sen!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          <Icon icon="ri:map-pin-2-fill" className="text-lg sm:text-xl text-primary" />
                        </div>
                        <span className="text-xs sm:text-sm text-text-secondary">Bangui, République Centrafricaine</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          <Icon icon="ri:phone-fill" className="text-lg sm:text-xl text-primary" />
                        </div>
                        <span className="text-xs sm:text-sm text-text-secondary">{WHATSAPP_NUMBER}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          <Icon icon="ri:mail-fill" className="text-lg sm:text-xl text-primary" />
                        </div>
                        <span className="text-xs sm:text-sm text-text-secondary">contactsenimaroc@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>

              {/* Section Newsletter */}
              <FloatingElement delay={0.6}>
                <div className="mt-12 sm:mt-16 md:mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 md:p-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                      Restez informé
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary mb-6">
                      Abonnez-vous à notre newsletter pour recevoir nos dernières actualités,
                      offres exclusives et conseils utiles directement dans votre boîte mail.
                    </p>

                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-stretch"
                    >
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Entrez votre adresse email"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />

                      <motion.button
                        type="submit"
                        disabled={newsletterSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-medium text-sm sm:text-base hover:bg-primary-dark transition-colors shadow-md"
                      >
                        {newsletterSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <Icon icon="eos-icons:loading" className="text-lg" />
                            Abonnement...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Icon icon="ri:mail-send-line" className="text-lg" />
                            S'abonner
                          </span>
                        )}
                      </motion.button>
                    </form>

                    {newsletterStatus === 'success' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-green-600 text-sm bg-green-50 p-3 rounded-lg"
                      >
                        Merci pour votre abonnement ! 🎉
                      </motion.p>
                    )}

                    {newsletterStatus === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg"
                      >
                        Une erreur est survenue. Veuillez réessayer.
                      </motion.p>
                    )}

                    <p className="mt-4 text-xs text-gray-500">
                      Nous respectons votre vie privée. Aucun spam, jamais.
                    </p>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </div>
        </ParallaxSection>
      </main>
    </MotionWrapper>
  );
}