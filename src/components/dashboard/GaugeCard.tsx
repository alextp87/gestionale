import React from 'react';
import { motion } from 'framer-motion';

interface GaugeCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function GaugeCard({ title, count, icon, color }: GaugeCardProps) {
  const percentage = Math.min(count / 100 * 180, 180); // Max 180 degrees rotation

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative w-48 h-48 mx-auto">
        {/* Gauge background */}
        <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
        
        {/* Gauge indicator */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: percentage }}
          transition={{ duration: 1, type: "spring" }}
          className="absolute w-1 h-24 bg-black origin-bottom"
          style={{ 
            left: '50%', 
            bottom: '50%', 
            transformOrigin: 'bottom center',
          }}
        />
        
        {/* Center point */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-800" />
        </div>
        
        {/* Count display */}
        <div className="absolute inset-0 flex items-center justify-center mt-20">
          <div className={`text-4xl font-bold ${color}`}>{count}</div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <div className="flex items-center justify-center mb-2">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
}