"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeMethods } from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useOrientation } from '@/hooks/useOrientation';

interface Location {
  name: string;
  lat: number;
  lng: number;
  country: string;
  size: number;
  color: string;
  flag: string;
}

const locations: Location[] = [
  {
    name: 'Bangui',
    lat: 4.3947,
    lng: 18.5582,
    country: 'RCA',
    size: 1.2,
    color: '#0077B6',
    flag: '/flags/cf.svg'
  },
  {
    name: 'Casablanca',
    lat: 33.5731, // Coordonnée corrigée
    lng: -7.5898, // Coordonnée corrigée
    country: 'Maroc',
    size: 1.5,
    color: '#00A8E8',
    flag: '/flags/ma.svg'
  },
  {
    name: 'Tunis',
    lat: 36.8065, // Coordonnée corrigée
    lng: 10.1815, // Coordonnée corrigée
    country: 'Tunisie',
    size: 1.5,
    color: '#00A8E8',
    flag: '/flags/tn.svg'
  },
  {
    name: 'Dakar',
    lat: 14.7167, // Coordonnée corrigée
    lng: -17.4677, // Coordonnée corrigée
    country: 'Sénégal',
    size: 1.5,
    color: '#00A8E8',
    flag: '/flags/sn.svg'
  },
  {
    name: 'Paris',
    lat: 70.8566, 
    lng: 4.3522, 
    country: '',
    size: 1.5,
    color: '#00A8E8',
    flag: '/flags/fr.svg'
  },
];

const arcs = locations.slice(1).map(dest => ({
  startLat: locations[0].lat,
  startLng: locations[0].lng,
  endLat: dest.lat,
  endLng: dest.lng,
  color: 'rgba(0, 119, 182, 0.8)',
}));

const DynamicGlobe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function InteractiveGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [isInitialView, setIsInitialView] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const orientation = useOrientation();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Données pour les labels des pays
  const countries = [
    { name: 'Central African Republic', lat: 6.6111, lng: 20.9394 },
    { name: 'Morocco', lat: 31.7917, lng: -7.0926 },
    { name: 'Tunisia', lat: 33.8869, lng: 9.5375 },
    { name: 'Senegal', lat: 14.4974, lng: -14.4524 },
    { name: 'France', lat: 46.2276, lng: 2.2137 },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        let newWidth, newHeight;
        
        if (isMobile) {
          if (orientation === 'landscape') {
            newHeight = Math.min(offsetHeight, 300);
            newWidth = offsetWidth;
          } else {
            newHeight = Math.min(offsetHeight, 350);
            newWidth = Math.min(offsetWidth, window.innerWidth * 0.95);
          }
        } else if (isTablet) {
          newHeight = Math.min(offsetHeight, 450);
          newWidth = Math.min(offsetWidth, 600);
        } else {
          newHeight = Math.min(offsetHeight, 600);
          newWidth = Math.min(offsetWidth, 800);
        }
        
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isMobile, isTablet, orientation]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isLoading) {
      progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const increment = Math.random() * 15;
          const newProgress = Math.min(prev + increment, 90);
          return newProgress;
        });
      }, 500);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = isMobile ? 0.5 : 0.3;
      globeRef.current.controls().enableZoom = !isMobile;
      globeRef.current.controls().enablePan = !isMobile;
      
      const altitude = isMobile ? 
        (orientation === 'landscape' ? 2.3 : 2.5) : 
        (isTablet ? 2.3 : 2.2);
      
      globeRef.current.pointOfView(
        { 
          lat: 15,
          lng: 10,
          altitude: altitude
        }, 
        1000
      );

      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.controls().autoRotate = false;
          globeRef.current.pointOfView(
            { 
              lat: 25, 
              lng: 10, 
              altitude: altitude
            }, 
            2000
          );
          
          setTimeout(() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true;
              setLoadingProgress(100);
              setTimeout(() => setIsLoading(false), 500);
            }
          }, 2500);
        }
      }, 1000);
    }
  }, [isMobile, isTablet, orientation, dimensions]);

  const handleLocationClick = (point: object, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => {
    const location = point as Location;
    setActiveLocation(location);
    setIsInitialView(false);
    
    if (globeRef.current) {
      let zoomAltitude = isMobile ? 
        (orientation === 'landscape' ? 1.6 : 1.8) : 
        1.5;
      
      if (location.name === 'Bangui') zoomAltitude = isMobile ? 
        (orientation === 'landscape' ? 1.8 : 2.0) : 
        1.8;
      
      if (location.name === 'Paris') zoomAltitude = isMobile ? 
        (orientation === 'landscape' ? 1.4 : 1.6) : 
        1.3;
      
      globeRef.current.pointOfView(
        { 
          lat: location.lat, 
          lng: location.lng, 
          altitude: zoomAltitude
        }, 
        1000
      );
    }
  };

  const resetView = () => {
    if (globeRef.current) {
      const altitude = isMobile ? 
        (orientation === 'landscape' ? 2.3 : 2.5) : 
        (isTablet ? 2.3 : 2.2);
        
      globeRef.current.pointOfView(
        { 
          lat: 25, 
          lng: 10, 
          altitude: altitude
        }, 
        1000
      );
      setActiveLocation(null);
      setIsInitialView(true);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
    >
    <AnimatePresence>
  {isLoading && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#001F3F]/90 backdrop-blur-sm z-50"
    >
      {/* Animation de chargement (spinner) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent mb-4"
      />

      {/* Barre de progression */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Message de chargement */}
      <p className="mt-4 text-sm text-white/80">Chargement du globe...</p>
    </motion.div>
  )}
</AnimatePresence>
      <DynamicGlobe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="/images/earth-blue-marble.jpg"
        bumpImageUrl="/images/earth-topology.png"
        backgroundImageUrl="/images/night-sky.png"
        
        pointsData={locations}
        pointColor="color"
        pointAltitude={0.05}
        pointRadius={d => isMobile ? (d as Location).size * 0.8 : (d as Location).size}
        pointLabel={d => `
          <div class="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg ${isMobile ? 'min-w-[100px]' : 'min-w-[120px]'}">
            <div class="flex items-center gap-2">
              <img 
                src="${(d as Location).flag}" 
                alt="${(d as Location).country} flag" 
                class="${isMobile ? 'w-4 h-3' : 'w-6 h-4'} object-contain"
                width="${isMobile ? '16' : '24'}"
                height="${isMobile ? '12' : '16'}"
              />
              <div>
                <div class="${isMobile ? 'text-sm' : 'text-base'} font-bold text-primary">${(d as Location).name}</div>
                <div class="${isMobile ? 'text-xs' : 'text-sm'} text-gray-600">${(d as Location).country}</div>
              </div>
            </div>
          </div>
        `}
        onPointClick={handleLocationClick}
        
        arcsData={arcs}
        arcColor="color"
        arcDashLength={0.5}
        arcDashGap={0.1}
        arcDashAnimateTime={2000}
        arcStroke={isMobile ? 1 : 1.2}
        
        labelsData={countries}
        labelLat={d => (d as any).lat}
        labelLng={d => (d as any).lng}
        labelText={d => (d as any).name}
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
        
        atmosphereColor="rgba(0, 119, 182, 0.2)"
        atmosphereAltitude={0.15}
        
        enablePointerInteraction={true}
      />

      {!isInitialView && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={resetView}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-lg shadow-lg flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7M3 12v6h6M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6-2.3l-3-2.7M21 12v-6h-6"/>
          </svg>
          <span className="hidden sm:inline">Vue initiale</span>
        </motion.button>
      )}

      {activeLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-md p-2 sm:p-4 rounded-xl shadow-lg z-10 text-xs sm:text-base"
        >
          <h3 className="text-sm sm:text-lg font-bold text-primary">{activeLocation.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{activeLocation.country}</p>
        </motion.div>
      )}
    </div>
  );
}