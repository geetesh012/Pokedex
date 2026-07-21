import React from "react";
import { Search, X } from "lucide-react";

/** Text input for filtering the grid by name. */
export function SearchBar({ value, onChange }) {
  return (
    <div className="search-row">
      <Search size={14} />
      <input
        placeholder="search pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="icon-btn" onClick={() => onChange("")}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
