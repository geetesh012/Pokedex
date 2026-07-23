import React from "react";
import { X } from "lucide-react";
import { TYPE_COLORS } from "../constants.js";

/** Removable pills for whichever filters are currently active (generation, types, favorites-only). */
export function ActiveFilterChips({ generation, selectedTypes, showFavOnly, onClearGen, onClearType, onClearFav }) {
  const hasAny = generation || selectedTypes.size > 0 || showFavOnly;
  if (!hasAny) return null;

  return (
    <div className="active-chips-row">
      {generation && (
        <button className="active-chip" onClick={onClearGen}>
          {generation.label} <X size={11} />
        </button>
      )}
      {[...selectedTypes].map((type) => (
        <button
          key={type}
          className="active-chip"
          style={{ borderColor: TYPE_COLORS[type], color: TYPE_COLORS[type] }}
          onClick={() => onClearType(type)}
        >
          {type} <X size={11} />
        </button>
      ))}
      {showFavOnly && (
        <button className="active-chip" onClick={onClearFav}>
          ★ favorites <X size={11} />
        </button>
      )}
    </div>
  );
}
