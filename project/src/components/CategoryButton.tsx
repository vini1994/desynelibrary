import React from 'react';
import { Home, Layout, Sparkles, MoveHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryButtonProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const icons = {
  Home,
  Layout,
  Sparkles,
  MoveHorizontal
};

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  id,
  label,
  icon,
  isActive,
  onClick
}) => {
  const Icon = icons[icon as keyof typeof icons];

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-sm ${
        isActive
          ? 'bg-blue-500/10 text-blue-500'
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
      }`}
    >
      <Icon className="w-5 h-5" /> {/* Adjusted icon size to 20px */}
      <span className="font-medium">{label}</span>
    </motion.button>
  );
};