import { useState, useEffect } from "react";
import { ALL_TYPES } from "../constants.js";
import { computeMultipliers } from "../typeDamageCache.js";

/**
 * Given each team member's type names, computes, for every attacking type,
 * how many members are weak to it vs. resist/are immune to it.
 * A "gap" is an attacking type that at least half the team is weak to,
 * with no member resisting or immune to it — i.e. a real team liability.
 * Returns { coverage: { allTypes: string[], gaps: string[] } | null, loading }.
 */
export function useTeamCoverage(memberTypeLists) {
  const [coverage, setCoverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const key = memberTypeLists.map((t) => t.join("/")).join(",");

  useEffect(() => {
    if (memberTypeLists.length === 0) {
      setCoverage(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all(memberTypeLists.map((types) => computeMultipliers(types, ALL_TYPES))).then(
      (multipliers) => {
        if (cancelled) return;

        const allTypes = [...new Set(memberTypeLists.flat())];
        const half = Math.ceil(memberTypeLists.length / 2);

        const gaps = ALL_TYPES.filter((attackType) => {
          let weakCount = 0;
          let safeCount = 0;
          multipliers.forEach((m) => {
            if (m[attackType] > 1) weakCount += 1;
            if (m[attackType] < 1) safeCount += 1; // resists or immune
          });
          return weakCount >= half && safeCount === 0;
        });

        setCoverage({ allTypes, gaps });
        setLoading(false);
      }
    );

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { coverage, loading };
}
