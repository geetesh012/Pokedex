import { useState, useEffect } from "react";
import { ALL_TYPES } from "../constants.js";
import { computeMultipliers } from "../typeDamageCache.js";

/**
 * Given the defending Pokémon's type names (e.g. ["grass","poison"]),
 * combines their damage relations into one multiplier per attacking type,
 * then buckets the results.
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

    computeMultipliers(typeNames, ALL_TYPES).then((multiplier) => {
      if (cancelled) return;
      const weaknesses = ALL_TYPES.filter((t) => multiplier[t] > 1);
      const resistances = ALL_TYPES.filter((t) => multiplier[t] > 0 && multiplier[t] < 1);
      const immunities = ALL_TYPES.filter((t) => multiplier[t] === 0);
      setEffectiveness({ weaknesses, resistances, immunities });
      setLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { effectiveness, loading };
}
