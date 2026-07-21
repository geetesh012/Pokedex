import React from "react";
import { TypeChip } from "./TypeChip.jsx";
import { useTypeEffectiveness } from "../hooks/useTypeEffectiveness.js";

function ChipRow({ label, types }) {
  if (!types.length) return null;
  return (
    <div className="effectiveness-row">
      <span className="effectiveness-label">{label}</span>
      <div className="effectiveness-chips">
        {types.map((t) => (
          <TypeChip key={t} type={t} active onClick={() => {}} small />
        ))}
      </div>
    </div>
  );
}

/** "TYPE MATCHUPS" section: combines all of a Pokémon's types into one damage chart. */
export function TypeEffectiveness({ typeNames }) {
  const { effectiveness, loading } = useTypeEffectiveness(typeNames);

  return (
    <div className="detail-section">
      <div className="detail-section-title">TYPE MATCHUPS</div>
      {loading || !effectiveness ? (
        <div className="evo-loading">CALCULATING...</div>
      ) : (
        <>
          <ChipRow label="WEAK TO" types={effectiveness.weaknesses} />
          <ChipRow label="RESISTS" types={effectiveness.resistances} />
          <ChipRow label="IMMUNE TO" types={effectiveness.immunities} />
          {!effectiveness.weaknesses.length &&
            !effectiveness.resistances.length &&
            !effectiveness.immunities.length && (
              <div className="evo-loading">NO NOTABLE MATCHUPS.</div>
            )}
        </>
      )}
    </div>
  );
}
