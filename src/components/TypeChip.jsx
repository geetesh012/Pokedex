import React from "react";
import { TYPE_COLORS } from "../constants.js";

/** A single color-coded pill for one Pokémon type. */
export function TypeChip({ type, onClick, active, small }) {
  const color = TYPE_COLORS[type] || "#999";
  return (
    <button
      onClick={onClick}
      className="type-chip"
      style={{
        background: active ? color : "transparent",
        borderColor: color,
        color: active ? "#1a1410" : color,
        fontSize: small ? "10px" : "11px",
        padding: small ? "2px 8px" : "5px 12px",
      }}
    >
      {type}
    </button>
  );
}
