"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fonction pour démarrer la lecture de la vidéo
  const playVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  };

  useEffect(() => {
    if (isOpen) {
      playVideo(); // Démarre la lecture lorsque la modal est ouverte
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-colors"
              >
                <Icon icon="carbon:close" className="w-6 h-6" />
              </button>
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}`} // Pas de autoplay ici
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                title="YouTube video player"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}