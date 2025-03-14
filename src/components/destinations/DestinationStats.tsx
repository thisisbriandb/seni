import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Statistic {
  label: string;
  value: number;
  unit: string;
  icon: string;
}

interface DestinationStatsProps {
  destinationId: string;
  isVisible: boolean;
}

const statsData: Record<string, Statistic[]> = {
  mar: [
    { label: "Hôpitaux Partenaires", value: 15, unit: "+", icon: "🏥" },
    { label: "Patients Traités", value: 1200, unit: "+", icon: "👥" },
    { label: "Taux de Satisfaction", value: 98, unit: "%", icon: "⭐" },
    { label: "Spécialités Médicales", value: 25, unit: "+", icon: "👨‍⚕️" }
  ],
  tun: [
    { label: "Cliniques Spécialisées", value: 12, unit: "+", icon: "🏥" },
    { label: "Patients Accompagnés", value: 850, unit: "+", icon: "👥" },
    { label: "Taux de Réussite", value: 96, unit: "%", icon: "⭐" },
    { label: "Années d'Expérience", value: 15, unit: "+", icon: "📅" }
  ],
  sen: [
    { label: "Centres Médicaux", value: 8, unit: "+", icon: "🏥" },
    { label: "Patients Pris en Charge", value: 600, unit: "+", icon: "👥" },
    { label: "Satisfaction Client", value: 95, unit: "%", icon: "⭐" },
    { label: "Personnel Médical", value: 45, unit: "+", icon: "👨‍⚕️" }
  ],
  fra: [
    { label: "Hôpitaux Universitaires", value: 10, unit: "+", icon: "🏥" },
    { label: "Cas Traités", value: 450, unit: "+", icon: "👥" },
    { label: "Taux de Succès", value: 99, unit: "%", icon: "⭐" },
    { label: "Technologies Avancées", value: 30, unit: "+", icon: "🔬" }
  ]
};

export default function DestinationStats({ destinationId, isVisible }: DestinationStatsProps) {
  const [counts, setCounts] = useState<Record<string, number>>(
    statsData[destinationId]?.reduce((acc, stat) => ({ ...acc, [stat.label]: 0 }), {}) || {}
  );

  useEffect(() => {
    if (isVisible) {
      statsData[destinationId]?.forEach((stat) => {
        const interval = setInterval(() => {
          setCounts((prev) => ({
            ...prev,
            [stat.label]: Math.min(prev[stat.label] + Math.ceil(stat.value / 30), stat.value)
          }));
        }, 50);

        return () => clearInterval(interval);
      });
    }
  }, [isVisible, destinationId]);

  if (!statsData[destinationId]) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
    >
      {statsData[destinationId].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/50 backdrop-blur-sm rounded-lg p-4 text-center"
        >
          <motion.span
            className="text-4xl block mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
          >
            {stat.icon}
          </motion.span>
          <motion.div
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {counts[stat.label]}
            {stat.unit}
          </motion.div>
          <motion.p
            className="text-sm text-gray-600 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {stat.label}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
} 