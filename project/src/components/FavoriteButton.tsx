import React, { memo } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  likes: number;
  onToggle: () => void;
}

const FavoriteButton = ({ isFavorite, likes, onToggle }: FavoriteButtonProps) => {
  return (
    <div className="isolate relative z-20">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1.5 text-sm ${
          isFavorite
            ? 'text-pink-500'
            : 'text-gray-400 hover:text-pink-500'
        }`}
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'fill-pink-500 scale-110' : 'fill-transparent hover:scale-110'
          }`}
        />
        <span>{likes}</span>
      </button>
    </div>
  );
};

export default memo(FavoriteButton);