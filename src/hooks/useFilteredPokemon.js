import { useMemo } from "react";

/**
 * Combines the base list with search text, an optional type-id set,
 * and a favorites-only toggle into the list actually shown in the grid.
 */
export function useFilteredPokemon({ allMon, search, typeIds, showFavOnly, favorites }) {
  return useMemo(() => {
    return allMon.filter((m) => {
      if (search && !m.name.includes(search.toLowerCase())) return false;
      if (typeIds && !typeIds.has(m.id)) return false;
      if (showFavOnly && !favorites.has(m.id)) return false;
      return true;
    });
  }, [allMon, search, typeIds, showFavOnly, favorites]);
}
