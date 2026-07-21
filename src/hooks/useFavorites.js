import { useState, useCallback } from "react";

/**
 * Tracks favorited Pokémon ids for the current session.
 * Returns { favorites, toggleFav, isFavorite }.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFav = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  return { favorites, toggleFav, isFavorite };
}
