import { useState, useEffect } from "react";

/**
 * Fetches full detail (stats, types, abilities, sprites) for one Pokémon.
 * Re-fetches whenever `id` changes. Returns { data, loading, error }.
 */
export function usePokemonDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setData(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}
