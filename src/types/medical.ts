export interface MedicalService {
  id: string;
  title: string;
  description: string;
  icon: string;
  destinations: string[];
  estimatedTime?: string;
  imageUrl?: string;
} 