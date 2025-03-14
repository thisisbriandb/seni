"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import { Destination, Route } from '@/types/geography';
import { mapRouteAnimation, pulseMarker } from '@/lib/animations';
import DestinationStats from '../destinations/DestinationStats';
import MapLoading from './MapLoading';
import RouteParticles from './RouteParticles';
import Image from 'next/image';

const geoUrl = '/world-countries.json';

const CAR_COORDINATES: [number, number] = [20.9394, 6.6111];

const destinations: Destination[] = [
  {
    id: 'mar',
    name: 'Maroc',
    coordinates: [-5.0033, 34.0209],
    flagCode: 'maroc',
    description: 'Excellence médicale et infrastructures modernes'
  },
  {
    id: 'tun',
    name: 'Tunisie',
    coordinates: [9.5375, 33.8869],
    flagCode: 'tunisia',
    description: 'Expertise reconnue en chirurgie et soins spécialisés'
  },
  {
    id: 'sen',
    name: 'Sénégal',
    coordinates: [-14.4529, 14.4974],
    flagCode: 'senegal',
    description: 'Qualité des soins et proximité culturelle'
  },
  {
    id: 'fra',
    name: 'France',
    coordinates: [2.2137, 46.2276],
    flagCode: 'france',
    description: 'Traitements de pointe et recherche médicale'
  }
];

const routes: Route[] = destinations.map(dest => ({
  origin: 'car',
  destination: dest.id,
  curve: -0.4
}));

const AnimatedRoute = motion(Line);

const mapStyles = {
  container: `
    relative h-full w-full
    bg-[radial-gradient(#ffffff_1px,transparent_1px)]
    [background-size:16px_16px]
    before:absolute before:inset-0
    before:bg-[linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.7))]
    before:z-10
  `,
  mapFrame: `
    absolute inset-0
    border-8 border-white rounded-xl
    shadow-[
      0_0_0_2px_rgba(0,0,0,0.05),
      0_4px_6px_-1px_rgba(0,0,0,0.1),
      0_2px_4px_-1px_rgba(0,0,0,0.06),
      inset_0_2px_4px_0_rgba(0,0,0,0.05)
    ]
    before:absolute before:inset-0
    before:border-4 before:border-black/5 before:rounded-lg
    after:absolute after:inset-[-8px]
    after:border-8 after:border-black/5 after:rounded-xl
  `,
  compass: `
    absolute top-4 right-4 z-20
    w-16 h-16
    bg-white/80 rounded-full
    shadow-lg backdrop-blur-sm
    flex items-center justify-center
    border border-black/5
  `,
  infoPanel: `
    absolute left-4 bottom-4 z-20
    bg-white/90 backdrop-blur-sm
    p-6 rounded-lg shadow-lg
    max-w-lg border border-black/5
    transform transition-all duration-300
  `,
  route: `
    stroke-dasharray: 6 4;
    stroke-linecap: round;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
  `,
  marker: `
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    transform-origin: center;
    cursor: pointer;
  `,
  grain: `
    pointer-events-none
    absolute inset-0
    opacity-20
    [background-image:url("data:image/png;base64,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")]
    mix-blend-overlay
  `,
  mapContainer: `
    relative h-full w-full
    bg-gradient-to-br from-gray-50 to-white
    overflow-hidden rounded-xl
  `,
  mapOverlay: `
    absolute inset-0
    bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.8)_100%)]
    pointer-events-none
  `,
  selectedRoute: `
    stroke-primary
    stroke-[2px]
    filter drop-shadow(0 0 8px rgba(0,102,204,0.3))
    stroke-dasharray: 6 4
  `,
  destinationMarker: `
    filter drop-shadow(0 2px 4px rgba(0,0,0,0.1))
    cursor-pointer
    transition-transform duration-300
  `
};

export default function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([20, 20]);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination.id);
    setCenter(destination.coordinates);
    setZoom(3);
  };

  const resetView = () => {
    setSelectedDestination(null);
    setCenter([20, 20]);
    setZoom(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={mapStyles.container}>
      {/* Cadre de carte décoratif */}
      <div className={mapStyles.mapFrame} />

      {/* Boussole */}
      <motion.div 
        className={mapStyles.compass}
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M12 2L8 12L12 22L16 12L12 2Z" fill="currentColor" opacity="0.2"/>
          <path d="M12 2L16 12L12 22L8 12L12 2Z" fill="currentColor"/>
        </svg>
      </motion.div>

      <motion.div 
        className="w-full h-full relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 200
          }}
        >
          <ZoomableGroup
            center={center}
            zoom={zoom}
            onMoveEnd={({ coordinates, zoom }) => {
              setCenter(coordinates);
              setZoom(zoom);
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      destinations.some(d => d.id === geo.properties.ISO_A2.toLowerCase()) ||
                      geo.properties.ISO_A2.toLowerCase() === 'cf'
                        ? '#E5E7EB'
                        : '#D1D5DB'
                    }
                    stroke="#FFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Routes améliorées */}
            {routes.map((route) => (
              <motion.g key={`${route.origin}-${route.destination}`}>
                <AnimatedRoute
                  from={CAR_COORDINATES}
                  to={destinations.find(d => d.id === route.destination)?.coordinates || [0, 0]}
                  stroke={selectedDestination === route.destination ? "#0066CC" : "#94A3B8"}
                  strokeWidth={selectedDestination === route.destination ? 2 : 1}
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  initial="initial"
                  animate="animate"
                  variants={mapRouteAnimation}
                  style={{
                    filter: selectedDestination === route.destination ? 'drop-shadow(0 0 6px #0066CC)' : 'none'
                  }}
                />
                {selectedDestination === route.destination && (
                  <motion.circle
                    r={4}
                    fill="#0066CC"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.g>
            ))}

            {/* Marker d'origine amélioré */}
            <Marker coordinates={CAR_COORDINATES}>
              <motion.g
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <circle r={8} fill="#D00" />
                <motion.image
                  href="/flags/cf.svg"
                  x={8}
                  y={-8}
                  width={16}
                  height={16}
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                  }}
                />
              </motion.g>
            </Marker>

            {/* Destinations améliorées */}
            {destinations.map((destination) => (
              <Marker
                key={destination.id}
                coordinates={destination.coordinates}
                onClick={() => handleDestinationClick(destination)}
              >
                <motion.g
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.2 }}
                  variants={pulseMarker}
                >
                  <circle
                    r={6}
                    fill="#fff"
                    stroke={selectedDestination === destination.id ? "#0066CC" : "#94A3B8"}
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                  <motion.image
                    href={`/flags/${destination.flagCode}.svg`}
                    x={8}
                    y={-8}
                    width={16}
                    height={16}
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                    }}
                  />
                </motion.g>
              </Marker>
            ))}

            {/* Ajout des particules sur les routes */}
            {routes.map((route) => (
              <RouteParticles
                key={`particles-${route.origin}-${route.destination}`}
                from={CAR_COORDINATES}
                to={destinations.find(d => d.id === route.destination)?.coordinates || [0, 0]}
                isActive={selectedDestination === route.destination}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </motion.div>

      {/* Info Panel amélioré */}
      <AnimatePresence mode="wait">
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={mapStyles.infoPanel}
          >
            <motion.button
              onClick={resetView}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.h3 
              className="text-lg font-semibold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {destinations.find(d => d.id === selectedDestination)?.name}
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {destinations.find(d => d.id === selectedDestination)?.description}
            </motion.p>
            <DestinationStats
              destinationId={selectedDestination}
              isVisible={!!selectedDestination}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remplacer l'ancien effet de grain par celui-ci */}
      <div className={mapStyles.grain} />

      {/* Effet de vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.03) 100%)'
        }}
      />

      {/* Effet de brillance */}
      <motion.div
        className="absolute inset-0 bg-white/30 mix-blend-soft-light pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          transition: { 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
    </div>
  );
} 