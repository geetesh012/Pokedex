import { useState, useEffect } from "react";
import { ALL_TYPES } from "../constants.js";

/**
 * Given the defending Pokémon's type names (e.g. ["grass","poison"]),
 * fetches damage relations for each and combines them into one
 * multiplier per attacking type, then buckets the results.
 * Returns { effectiveness: { weaknesses, resistances, immunities } | null, loading }.
 */
export function useTypeEffectiveness(typeNames) {
  const [effectiveness, setEffectiveness] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = typeNames.join(",");

  useEffect(() => {
    if (!typeNames.length) return;
    let cancelled = false;
    setLoading(true);

    Promise.all(
      typeNames.map((t) => fetch(`https://pokeapi.co/api/v2/type/${t}`).then((r) => r.json()))
    )
      .then((results) => {
        if (cancelled) return;

        const multiplier = {};
        ALL_TYPES.forEach((t) => { multiplier[t] = 1; });

        results.forEach((res) => {
          const rel = res.damage_relations;
          rel.double_damage_from.forEach((t) => { multiplier[t.name] *= 2; });
          rel.half_damage_from.forEach((t) => { multiplier[t.name] *= 0.5; });
          rel.no_damage_from.forEach((t) => { multiplier[t.name] *= 0; });
        });

        const weaknesses = ALL_TYPES.filter((t) => multiplier[t] > 1);
        const resistances = ALL_TYPES.filter((t) => multiplier[t] > 0 && multiplier[t] < 1);
        const immunities = ALL_TYPES.filter((t) => multiplier[t] === 0);

        setEffectiveness({ weaknesses, resistances, immunities });
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { effectiveness, loading };
}
