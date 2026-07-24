import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

const STORAGE_KEY = "pokedex:favorites";
const setCodec = {
  serialize: (set) => JSON.stringify([...set]),
  deserialize: (raw) => new Set(JSON.parse(raw)),
};

/** Tracks favorited Pokémon ids, persisted across sessions. Returns { favorites, toggleFav, isFavorite }. */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEY, new Set(), setCodec);

  const toggleFav = useCallback(
    (id) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
      });
    },
    [setFavorites]
  );

  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  const replaceFavorites = useCallback(
    (ids) => setFavorites(new Set(ids)),
    [setFavorites]
  );

  return { favorites, toggleFav, isFavorite, replaceFavorites };
}
