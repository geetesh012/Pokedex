import { useState, useEffect } from "react";
import { idFromUrl } from "../utils.js";
import { POKEMON_LIMIT } from "../constants.js";

/**
 * Fetches the first POKEMON_LIMIT Pokémon (id + name only).
 * Returns { allMon, loading, error }.
 */
export function usePokemonList() {
  const [allMon, setAllMon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const list = d.results.map((p) => ({ id: idFromUrl(p.url), name: p.name }));
        setAllMon(list);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { allMon, loading, error };
}
