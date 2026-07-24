import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { idFromUrl } from "../utils.js";

const DEFAULTS = { q: "", types: "", mode: "OR", fav: "0", sort: "dex" };
const LAST_USED_KEY = "pokedex:lastFilters";
const PARAM_KEYS = ["q", "types", "mode", "fav", "sort"];

function computeFilteredIds(selectedTypes, typeIdSets, mode) {
  if (selectedTypes.size === 0) return null;
  const sets = [...selectedTypes].map((t) => typeIdSets[t]).filter(Boolean);
  if (sets.length === 0) return new Set();
  if (mode === "AND") {
    return new Set([...sets[0]].filter((id) => sets.every((s) => s.has(id))));
  }
  const union = new Set();
  sets.forEach((s) => s.forEach((id) => union.add(id)));
  return union;
}

/**
 * Search/type/mode/favorites/sort filters, sourced directly from the URL query
 * string (?q=&types=&mode=&fav=&sort=) so the current view is always shareable
 * and browser back/forward restores it. On a completely fresh visit (no query
 * params at all), seeds from the last-used filters saved in localStorage.
 */
export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hydratedRef = useRef(false);
  const [typeIdSets, setTypeIdSets] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(new Set());

  // One-time hydration from localStorage if the URL arrived with no filter params
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const hasAnyParam = PARAM_KEYS.some((k) => searchParams.has(k));
    if (hasAnyParam) return;
    try {
      const saved = JSON.parse(localStorage.getItem(LAST_USED_KEY) || "null");
      if (!saved) return;
      const next = new URLSearchParams();
      PARAM_KEYS.forEach((k) => {
        if (saved[k] && saved[k] !== DEFAULTS[k]) next.set(k, saved[k]);
      });
      if ([...next.keys()].length > 0) setSearchParams(next, { replace: true });
    } catch {
      // ignore malformed localStorage data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const q = searchParams.get("q") || DEFAULTS.q;
  const typesStr = searchParams.get("types") || DEFAULTS.types;
  const mode = searchParams.get("mode") || DEFAULTS.mode;
  const showFavOnly = searchParams.get("fav") === "1";
  const sortBy = searchParams.get("sort") || DEFAULTS.sort;

  const selectedTypes = useMemo(
    () => new Set(typesStr.split(",").filter(Boolean)),
    [typesStr]
  );

  // Fetch (and cache) id sets for any newly selected type
  useEffect(() => {
    selectedTypes.forEach((type) => {
      if (typeIdSets[type] || loadingTypes.has(type)) return;
      setLoadingTypes((prev) => new Set(prev).add(type));
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((r) => r.json())
        .then((d) => {
          const ids = new Set(d.pokemon.map((p) => idFromUrl(p.pokemon.url)));
          setTypeIdSets((prev) => ({ ...prev, [type]: ids }));
          setLoadingTypes((prev) => {
            const n = new Set(prev);
            n.delete(type);
            return n;
          });
        })
        .catch(() => {
          setLoadingTypes((prev) => {
            const n = new Set(prev);
            n.delete(type);
            return n;
          });
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typesStr]);

  const filteredIds = useMemo(
    () => computeFilteredIds(selectedTypes, typeIdSets, mode),
    [selectedTypes, typeIdSets, mode]
  );
  const typeLoading = [...selectedTypes].some((t) => loadingTypes.has(t));

  const update = useCallback(
    (patch, opts) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(patch).forEach(([key, value]) => {
            const isDefault = value === undefined || value === null || value === "" || value === false || value === DEFAULTS[key];
            if (isDefault) next.delete(key);
            else next.set(key, value === true ? "1" : String(value));
          });

          try {
            const toSave = {};
            PARAM_KEYS.forEach((k) => { toSave[k] = next.get(k) || DEFAULTS[k]; });
            localStorage.setItem(LAST_USED_KEY, JSON.stringify(toSave));
          } catch {
            // storage unavailable — non-fatal
          }

          return next;
        },
        opts
      );
    },
    [setSearchParams]
  );

  const setSearch = useCallback((v) => update({ q: v }, { replace: true }), [update]);
  const setMode = useCallback((m) => update({ mode: m }), [update]);
  const setShowFavOnly = useCallback((b) => update({ fav: b }), [update]);
  const setSortBy = useCallback((s) => update({ sort: s }), [update]);

  const toggleType = useCallback(
    (type) => {
      const next = new Set(selectedTypes);
      if (next.has(type)) next.delete(type); else next.add(type);
      update({ types: [...next].join(",") });
    },
    [selectedTypes, update]
  );

  const clearAllTypes = useCallback(() => update({ types: "" }), [update]);

  return {
    search: q,
    setSearch,
    selectedTypes,
    mode,
    setMode,
    toggleType,
    clearAllTypes,
    filteredIds,
    typeLoading,
    showFavOnly,
    setShowFavOnly,
    sortBy,
    setSortBy,
  };
}
