import { useState, useEffect } from "react";
import { idFromUrl } from "../utils.js";

/** Walks the nested evolution_chain response into an array of stages (each stage is an array, to allow branching evolutions like Eevee). */
function flattenChain(node) {
  const stages = [];

  function walk(n, depth) {
    if (!stages[depth]) stages[depth] = [];
    const evoDetail = (n.evolution_details && n.evolution_details[0]) || null;
    stages[depth].push({
      id: idFromUrl(n.species.url),
      name: n.species.name,
      minLevel: evoDetail?.min_level ?? null,
      trigger: evoDetail?.trigger?.name ?? null,
      item: evoDetail?.item?.name ?? null,
    });
    (n.evolves_to || []).forEach((child) => walk(child, depth + 1));
  }

  walk(node, 0);
  return stages;
}

/**
 * Fetches the species record for `id`, then its evolution chain.
 * Returns { stages, loading, error }. `stages` is [] while loading.
 */
export function useEvolutionChain(id) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setStages([]);

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((r) => r.json())
      .then((species) => fetch(species.evolution_chain.url))
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setStages(flattenChain(data.chain));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  return { stages, loading, error };
}
