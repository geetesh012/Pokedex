import React from "react";

/** Small "Showing X of Y" indicator near the search/filter controls. */
export function ResultsCounter({ shown, total }) {
  return (
    <div className="results-counter">
      Showing {shown.toLocaleString()} of {total.toLocaleString()}
    </div>
  );
}
