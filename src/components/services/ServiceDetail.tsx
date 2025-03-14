import { MedicalService } from '@/types/medical';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ServiceDetailProps {
  service: MedicalService;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {service.imageUrl && (
        <div className="relative h-64 w-full">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-text">{service.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{service.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {service.destinations.map((destination) => (
                <li
                  key={destination}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {destination}
                </li>
              ))}
            </ul>
          </div>
          
          {service.estimatedTime && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Délai Estimé</h3>
              <p className="text-gray-600">{service.estimatedTime}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 