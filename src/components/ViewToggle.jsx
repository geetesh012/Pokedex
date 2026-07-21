import React from "react";
import { Star } from "lucide-react";

/** Two-button switch between "All" and "Favorites" views. */
export function ViewToggle({ showFavOnly, onChange, favoriteCount }) {
  return (
    <div className="fav-toggle-row">
      <button className={`fav-toggle ${!showFavOnly ? "active" : ""}`} onClick={() => onChange(false)}>
        All
      </button>
      <button className={`fav-toggle ${showFavOnly ? "active" : ""}`} onClick={() => onChange(true)}>
        <Star size={11} fill={showFavOnly ? "#f5b942" : "none"} />
        Favorites ({favoriteCount})
      </button>
    </div>
  );
}
