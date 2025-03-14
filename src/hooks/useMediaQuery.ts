"use client";

import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si une media query correspond à la taille d'écran actuelle
 * @param query La media query à tester (ex: '(max-width: 768px)')
 * @returns boolean indiquant si la media query correspond
 */
export function useMediaQuery(query: string): boolean {
  // Initialiser à false par défaut pour le SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Vérifier si window est défini (pour éviter les erreurs SSR)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Définir l'état initial
      setMatches(media.matches);

      // Définir un gestionnaire pour les changements
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Ajouter l'écouteur d'événement
      media.addEventListener('change', listener);

      // Nettoyer l'écouteur d'événement
      return () => {
        media.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
} 