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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};