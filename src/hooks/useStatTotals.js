import { useState, useEffect } from "react";

const statTotalCache = new Map(); // id -> total base stat, shared for the whole session

/** Cap on how many detail fetches "sort by total stats" will trigger at once. */
export const STATS_SORT_MAX_ITEMS = 150;

/**
 * Fetches (and caches) the total base stat for each id in `ids`.
 * Only call this with `enabled: true` when the list is small enough
 * (see STATS_SORT_MAX_ITEMS) — it does one fetch per uncached id.
 * Returns { totals, loading } where totals is { [id]: number }.
 */
export function useStatTotals(ids, enabled) {
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(false);
  const key = enabled ? ids.join(",") : "";

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const missing = ids.filter((id) => !statTotalCache.has(id));
    if (missing.length === 0) {
      setTotals(Object.fromEntries(ids.map((id) => [id, statTotalCache.get(id)])));
      return;
    }

    let cancelled = false;
    setLoading(true);
    Promise.all(
      missing.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()))
    ).then((results) => {
      if (cancelled) return;
      results.forEach((d) => {
        const total = d.stats.reduce((sum, s) => sum + s.base_stat, 0);
        statTotalCache.set(d.id, total);
      });
      setTotals(Object.fromEntries(ids.map((id) => [id, statTotalCache.get(id)])));
      setLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  return { totals, loading };
}
