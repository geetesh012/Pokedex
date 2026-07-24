import React from "react";

/** Pulsing placeholder cards shown while the Pokémon list is loading. */
export function GridSkeleton({ count = 9 }) {
  return (
    <div className="mon-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="mon-card-skeleton">
          <div className="skeleton-block skeleton-img" />
          <div className="skeleton-block skeleton-line-sm" />
          <div className="skeleton-block skeleton-line" />
        </div>
      ))}
    </div>
  );
}
