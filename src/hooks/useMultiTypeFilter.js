import { useState, useCallback, useMemo } from "react";
import { idFromUrl } from "../utils.js";

/**
 * Manages a set of selected type filters plus an AND/OR combine mode.
 * Each type's matching id list is fetched once and cached for the session.
 * Returns { selectedTypes, mode, setMode, toggleType, filteredIds, isLoading }.
 * `filteredIds` is null when no types are selected (i.e. no filtering).
 */
export function useMultiTypeFilter() {
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [mode, setMode] = useState("OR");
  const [typeIdSets, setTypeIdSets] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(new Set());

  const fetchTypeIds = useCallback((type) => {
    setLoadingTypes((prev) => new Set(prev).add(type));
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((r) => r.json())
      .then((d) => {
        const ids = new Set(d.pokemon.map((p) => idFromUrl(p.pokemon.url)));
        setTypeIdSets((prev) => ({ ...prev, [type]: ids }));
        setLoadingTypes((prev) => {
          const next = new Set(prev);
          next.delete(type);
          return next;
        });
      })
      .catch(() => {
        setLoadingTypes((prev) => {
          const next = new Set(prev);
          next.delete(type);
          return next;
        });
      });
  }, []);

  const toggleType = useCallback(
    (type) => {
      setSelectedTypes((prev) => {
        const next = new Set(prev);
        if (next.has(type)) {
          next.delete(type);
        } else {
          next.add(type);
          setTypeIdSets((sets) => {
            if (!sets[type]) fetchTypeIds(type);
            return sets;
          });
        }
        return next;
      });
    },
    [fetchTypeIds],
  );
  const clearAllTypes = useCallback(() => setSelectedTypes(new Set()), []);
  const filteredIds = useMemo(() => {
    if (selectedTypes.size === 0) return null;
    const sets = [...selectedTypes].map((t) => typeIdSets[t]).filter(Boolean);
    if (sets.length === 0) return new Set();

    if (mode === "AND") {
      return new Set([...sets[0]].filter((id) => sets.every((s) => s.has(id))));
    }
    const union = new Set();
    sets.forEach((s) => s.forEach((id) => union.add(id)));
    return union;
  }, [selectedTypes, typeIdSets, mode]);

  const isLoading = [...selectedTypes].some((t) => loadingTypes.has(t));

  return {
    selectedTypes,
    mode,
    setMode,
    toggleType,
    clearAllTypes,
    filteredIds,
    isLoading,
  };
}
