import React from "react";
import { X, Loader2 } from "lucide-react";
import { useBulkPokemonDetail } from "../hooks/useBulkPokemonDetail.js";
import { SPRITE_BASE, STAT_LABELS } from "../constants.js";
import { pad } from "../utils.js";

const STAT_ORDER = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

/** Side-by-side comparison of up to COMPARE_MAX Pokémon's stats. */
export function CompareScreen({ compareIds, onRemove, onOpen }) {
  const { detailsById, loading } = useBulkPokemonDetail(compareIds);

  if (compareIds.length === 0) {
    return (
      <div className="empty-state">
        Open a Pokémon's detail screen and tap "Add to Compare" — pick 2 or 3 to see them here.
      </div>
    );
  }

  if (loading || compareIds.some((id) => !detailsById[id])) {
    return (
      <div className="load-state">
        <Loader2 className="spin" size={22} style={{ margin: "0 auto 6px" }} />
        <div>LOADING...</div>
      </div>
    );
  }

  if (compareIds.length === 1) {
    return (
      <div className="empty-state">Add one more Pokémon (2–3 total) to see a comparison.</div>
    );
  }

  const mons = compareIds.map((id) => detailsById[id]);

  const bestIndexForStat = (statName) => {
    let bestIdx = 0;
    let bestVal = -Infinity;
    mons.forEach((m, i) => {
      const val = m.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0;
      if (val > bestVal) {
        bestVal = val;
        bestIdx = i;
      }
    });
    return bestIdx;
  };

  return (
    <div className="compare-screen">
      <div className="compare-header-row">
        {mons.map((m) => (
          <div key={m.id} className="compare-mon-header">
            <button className="icon-btn compare-remove" onClick={() => onRemove(m.id)} aria-label={`Remove ${m.name} from comparison`}>
              <X size={12} />
            </button>
            <button className="compare-mon-btn" onClick={() => onOpen(m.id)}>
              <img src={`${SPRITE_BASE}/${m.id}.png`} alt={m.name} className="compare-mon-img" />
              <span className="compare-mon-name">{m.name}</span>
              <span className="compare-mon-id">{pad(m.id)}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="compare-table">
        {STAT_ORDER.map((statName) => {
          const bestIdx = bestIndexForStat(statName);
          return (
            <div key={statName} className="compare-stat-row">
              <span className="compare-stat-label">{STAT_LABELS[statName]}</span>
              {mons.map((m, i) => {
                const val = m.stats.find((s) => s.stat.name === statName)?.base_stat ?? 0;
                return (
                  <span key={m.id} className={`compare-stat-value ${i === bestIdx ? "best" : ""}`}>
                    {val}
                  </span>
                );
              })}
            </div>
          );
        })}
        <div className="compare-stat-row compare-total-row">
          <span className="compare-stat-label">TOTAL</span>
          {mons.map((m) => (
            <span key={m.id} className="compare-stat-value">
              {m.stats.reduce((sum, s) => sum + s.base_stat, 0)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
