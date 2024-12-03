import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  likes: number;
  onToggle: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  likes,
  onToggle
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`flex items-center gap-1 transition-colors ${
        isFavorite ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </motion.button>
  );
};