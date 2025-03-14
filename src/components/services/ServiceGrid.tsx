import { MedicalService } from '@/types/medical';
import ServiceCard from './ServiceCard';

interface ServiceGridProps {
  services: MedicalService[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
} 