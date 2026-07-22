import { useState, useEffect } from "react";

const detailCache = new Map(); // id -> full pokemon detail JSON, shared for the session

/**
 * Fetches full detail for every id in `ids` (used by Compare and Team screens,
 * where only a handful of Pokémon need full data at once).
 * Returns { detailsById, loading } where detailsById is { [id]: data }.
 */
export function useBulkPokemonDetail(ids) {
  const [detailsById, setDetailsById] = useState({});
  const [loading, setLoading] = useState(false);
  const key = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) {
      setDetailsById({});
      return;
    }

    const missing = ids.filter((id) => !detailCache.has(id));
    if (missing.length === 0) {
      setDetailsById(Object.fromEntries(ids.map((id) => [id, detailCache.get(id)])));
      return;
    }

    let cancelled = false;
    setLoading(true);
    Promise.all(
      missing.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()))
    ).then((results) => {
      if (cancelled) return;
      results.forEach((d) => detailCache.set(d.id, d));
      setDetailsById(Object.fromEntries(ids.map((id) => [id, detailCache.get(id)])));
      setLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { detailsById, loading };
}
