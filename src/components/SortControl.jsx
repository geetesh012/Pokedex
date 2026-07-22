import React from "react";
import { STATS_SORT_MAX_ITEMS } from "../hooks/useStatTotals.js";

/** Sort-mode buttons: Dex #, Name, and Total Stats (disabled above a size cap). */
export function SortControl({ sortBy, onChange, resultCount }) {
  const statsDisabled = resultCount > STATS_SORT_MAX_ITEMS;

  return (
    <div className="sort-row">
      <span className="sort-label">Sort:</span>
      <button className={`sort-btn ${sortBy === "dex" ? "active" : ""}`} onClick={() => onChange("dex")}>
        Dex #
      </button>
      <button className={`sort-btn ${sortBy === "name" ? "active" : ""}`} onClick={() => onChange("name")}>
        Name
      </button>
      <button
        className={`sort-btn ${sortBy === "stats" ? "active" : ""}`}
        onClick={() => !statsDisabled && onChange("stats")}
        disabled={statsDisabled}
        title={statsDisabled ? `Narrow to ${STATS_SORT_MAX_ITEMS} or fewer results to sort by stats` : ""}
      >
        Total Stats
      </button>
    </div>
  );
}
