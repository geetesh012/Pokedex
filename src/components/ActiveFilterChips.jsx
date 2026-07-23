import React from "react";
import { X } from "lucide-react";
import { TYPE_COLORS } from "../constants.js";

/** Removable pills for whichever filters are currently active (types, favorites-only). */
export function ActiveFilterChips({ selectedTypes, showFavOnly, onClearType, onClearFav }) {
  const hasAny = selectedTypes.size > 0 || showFavOnly;
  if (!hasAny) return null;

  return (
    <div className="active-chips-row">
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
