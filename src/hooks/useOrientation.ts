"use client";

import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';

/**
 * Hook pour détecter l'orientation actuelle de l'écran
 * @returns 'portrait' ou 'landscape' selon l'orientation
 */
export function useOrientation(): Orientation {
  // Initialiser à 'portrait' par défaut pour le SSR
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  useEffect(() => {
    // Vérifier si window est défini (pour éviter les erreurs SSR)
    if (typeof window !== 'undefined') {
      // Fonction pour mettre à jour l'orientation
      const updateOrientation = () => {
        const isPortrait = window.innerHeight > window.innerWidth;
        setOrientation(isPortrait ? 'portrait' : 'landscape');
      };

      // Définir l'orientation initiale
      updateOrientation();

      // Écouter les changements d'orientation
      window.addEventListener('resize', updateOrientation);
      
      // Pour les appareils mobiles qui supportent l'événement orientationchange
      if ('onorientationchange' in window) {
        window.addEventListener('orientationchange', updateOrientation);
      }

      // Nettoyer les écouteurs d'événements
      return () => {
        window.removeEventListener('resize', updateOrientation);
        if ('onorientationchange' in window) {
          window.removeEventListener('orientationchange', updateOrientation);
        }
      };
    }
  }, []);

  return orientation;
} 