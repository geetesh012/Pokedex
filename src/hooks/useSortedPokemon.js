import { useMemo } from "react";

/** Sorts a {id,name}[] list by dex number or name. Instant — no network needed. */
export function useSortedPokemon(list, sortBy) {
  return useMemo(() => {
    if (sortBy === "name") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    // default: dex order (the list already arrives in dex order, but sort
    // defensively in case a future data source doesn't guarantee it)
    return [...list].sort((a, b) => a.id - b.id);
  }, [list, sortBy]);
}
