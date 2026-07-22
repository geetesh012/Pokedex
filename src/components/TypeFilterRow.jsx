import React from "react";
import { TypeChip } from "./TypeChip.jsx";
import { ALL_TYPES } from "../constants.js";

/** Row of type chips (multi-select) plus an AND/OR combine-mode switch. */
export function TypeFilterRow({ selectedTypes, mode, onToggleType, onModeChange }) {
  return (
    <div className="type-filter-block">
      <div className="type-row">
        {ALL_TYPES.map((type) => (
          <TypeChip
            key={type}
            type={type}
            active={selectedTypes.has(type)}
            onClick={() => onToggleType(type)}
            small
          />
        ))}
      </div>
      {selectedTypes.size > 1 && (
        <div className="type-mode-row">
          <span className="type-mode-label">Match:</span>
          <button
            className={`type-mode-btn ${mode === "OR" ? "active" : ""}`}
            onClick={() => onModeChange("OR")}
          >
            ANY
          </button>
          <button
            className={`type-mode-btn ${mode === "AND" ? "active" : ""}`}
            onClick={() => onModeChange("AND")}
          >
            ALL
          </button>
        </div>
      )}
    </div>
  );
}
