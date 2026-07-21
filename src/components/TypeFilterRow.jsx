import React from "react";
import { TypeChip } from "./TypeChip.jsx";
import { ALL_TYPES } from "../constants.js";

/** Row of type chips used to filter the grid to one type at a time. */
export function TypeFilterRow({ activeType, onSelect }) {
  return (
    <div className="type-row">
      {ALL_TYPES.map((type) => (
        <TypeChip key={type} type={type} active={activeType === type} onClick={() => onSelect(type)} small />
      ))}
    </div>
  );
}
