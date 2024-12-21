import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export default function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-8 h-8 text-violet-600 mb-2" />
      <span className="text-sm font-medium text-gray-800 text-center">{label}</span>
    </button>
  );
}