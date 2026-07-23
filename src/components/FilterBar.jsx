import React from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { SortControl } from "./SortControl.jsx";

/** Compact row: a "Filters" toggle button (with active count) plus the sort control. */
export function FilterBar({ activeCount, isOpen, onToggle, sortBy, onSortChange, resultCount }) {
  return (
    <div className="filter-bar">
      <button className={`filter-toggle-btn ${isOpen ? "active" : ""}`} onClick={onToggle}>
        <SlidersHorizontal size={13} />
        Filters
        {activeCount > 0 && <span className="filter-count-badge">{activeCount}</span>}
        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      <SortControl sortBy={sortBy} onChange={onSortChange} resultCount={resultCount} />
    </div>
  );
}
