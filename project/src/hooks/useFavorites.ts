import { useState, useCallback, useEffect } from 'react';

const FAVORITES_KEY = 'codegallery_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(id);
      if (isCurrentlyFavorite) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};