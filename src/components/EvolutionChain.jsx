import React from "react";
import { SPRITE_BASE } from "../constants.js";
import { useEvolutionChain } from "../hooks/useEvolutionChain.js";

function stageLabel(mon) {
  if (mon.minLevel) return `Lv. ${mon.minLevel}`;
  if (mon.item) return mon.item.replace(/-/g, " ");
  if (mon.trigger && mon.trigger !== "level-up") return mon.trigger.replace(/-/g, " ");
  return "";
}

/** "EVOLUTION CHAIN" section: fetches species + chain data, renders stages left to right. */
export function EvolutionChain({ speciesId, currentId, onSelect }) {
  const { stages, loading, error } = useEvolutionChain(speciesId);

  if (loading) {
    return (
      <div className="detail-section">
        <div className="detail-section-title">EVOLUTION CHAIN</div>
        <div className="evo-loading">LOADING EVOLUTIONS...</div>
      </div>
    );
  }

  if (error) return null;

  if (stages.length <= 1) {
    return (
      <div className="detail-section">
        <div className="detail-section-title">EVOLUTION CHAIN</div>
        <div className="evo-loading">DOES NOT EVOLVE.</div>
      </div>
    );
  }

  return (
    <div className="detail-section">
      <div className="detail-section-title">EVOLUTION CHAIN</div>
      <div className="evo-row">
        {stages.map((stage, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className="evo-arrow">
                <span>→</span>
                <span className="evo-arrow-label">{stageLabel(stage[0])}</span>
              </div>
            )}
            <div className="evo-stage">
              {stage.map((mon) => (
                <button
                  key={mon.id}
                  className={`evo-mon ${mon.id === currentId ? "evo-mon-active" : ""}`}
                  onClick={() => onSelect(mon.id)}
                >
                  <img src={`${SPRITE_BASE}/${mon.id}.png`} alt={mon.name} className="evo-mon-img" />
                  <span className="evo-mon-name">{mon.name}</span>
                </button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
