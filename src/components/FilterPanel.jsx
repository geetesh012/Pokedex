import React from "react";
// import { GenerationFilter } from "./GenerationFilter.jsx";
import { TypeFilterRow } from "./TypeFilterRow.jsx";
import { ViewToggle } from "./ViewToggle.jsx";

/** Collapsible panel bundling generation, type, and favorites filters. Hidden unless `isOpen`. */
export function FilterPanel({
  isOpen,
  // generation,
  onGenerationChange,
  selectedTypes,
  mode,
  onToggleType,
  onModeChange,
  showFavOnly,
  onFavOnlyChange,
  favoriteCount,
  onClearAll,
  hasAnyFilter,
}) {
  if (!isOpen) return null;

  return (
    <div className="filter-panel">
      {/* <div className="filter-panel-section">
        <div className="filter-panel-label">Generation</div>
        <GenerationFilter selectedGen={generation} onChange={onGenerationChange} />
      </div> */}

      <div className="filter-panel-section">
        <div className="filter-panel-label">Type</div>
        <TypeFilterRow
          selectedTypes={selectedTypes}
          mode={mode}
          onToggleType={onToggleType}
          onModeChange={onModeChange}
        />
      </div>

      <div className="filter-panel-section">
        <div className="filter-panel-label">Show</div>
        <ViewToggle showFavOnly={showFavOnly} onChange={onFavOnlyChange} favoriteCount={favoriteCount} />
      </div>

      {hasAnyFilter && (
        <button className="clear-all-btn" onClick={onClearAll}>
          Clear all filters
        </button>
      )}
    </div>
  );
}
