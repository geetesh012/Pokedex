import { useState, useCallback } from "react";
import { idFromUrl } from "../utils.js";

/**
 * Manages a single active type filter.
 * Clicking the already-active type turns the filter off.
 * Returns { activeType, typeIds, typeLoading, selectType }.
 */
export function useTypeFilter() {
  const [activeType, setActiveType] = useState(null);
  const [typeIds, setTypeIds] = useState(null);
  const [typeLoading, setTypeLoading] = useState(false);

  const selectType = useCallback((type) => {
    setActiveType((current) => {
      if (current === type) {
        setTypeIds(null);
        return null;
      }
      setTypeLoading(true);
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((r) => r.json())
        .then((d) => {
          setTypeIds(new Set(d.pokemon.map((p) => idFromUrl(p.pokemon.url))));
          setTypeLoading(false);
        })
        .catch(() => setTypeLoading(false));
      return type;
    });
  }, []);

  return { activeType, typeIds, typeLoading, selectType };
}
