import { motion } from 'framer-motion';
import Image from 'next/image';
import { MedicalService } from '@/types/medical';

interface ServiceCardProps {
  service: MedicalService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Image src={service.icon} alt="" width={24} height={24} />
        <h3 className="text-xl font-semibold">{service.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {service.destinations.map((destination) => (
          <span
            key={destination}
            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
          >
            {destination}
          </span>
        ))}
      </div>
    </motion.div>
  );
} 