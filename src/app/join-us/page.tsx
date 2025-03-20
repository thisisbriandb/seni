"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CONTACT_EMAIL } from '@/app/config/env';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  city: string;
  message: string;
  cv: File | null;
};

export default function JoinUsPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    city: '',
    message: '',
    cv: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('/api/join-us', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      setSubmitStatus('success');
      // Réinitialiser le formulaire
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        specialty: '',
        experience: '',
        city: '',
        message: '',
        cv: null
      });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <span className="text-primary dark:text-primary/80 text-sm font-medium px-4 py-1.5 bg-primary/10 rounded-full">
              Carrières
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-4"
          >
            Rejoignez notre réseau
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Faites partie de notre réseau international de professionnels de santé et contribuez à offrir des soins d'excellence à nos patients.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spécialité *
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    required
                    value={formData.specialty}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Années d'expérience *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ville d'exercice *
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message (Présentez-vous brièvement) *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CV (PDF) *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                  <div className="space-y-1 text-center">
                    <Icon icon="ri:upload-cloud-line" className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="cv"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      >
                        <span>Télécharger un fichier</span>
                        <input
                          id="cv"
                          name="cv"
                          type="file"
                          required
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF jusqu'à 10MB
                    </p>
                    {formData.cv && (
                      <p className="text-sm text-primary">
                        Fichier sélectionné : {formData.cv.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    isSubmitting ? 'cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="ri:loader-4-line" className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Icon icon="ri:send-plane-fill" className="w-5 h-5" />
                      Envoyer ma candidature
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
                    <Icon icon="ri:checkbox-circle-fill" className="w-5 h-5" />
                    Votre candidature a été envoyée avec succès !
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                    <Icon icon="ri:error-warning-fill" className="w-5 h-5" />
                    Une erreur est survenue. Veuillez réessayer.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Pour toute question, contactez-nous à{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 