import React from "react";

/** Row of height / weight / base XP figures. */
export function DetailMeta({ data }) {
  return (
    <div className="detail-meta-row">
      <div className="detail-meta">
        <span className="meta-label">HEIGHT</span>
        <span className="meta-value">{(data.height / 10).toFixed(1)} m</span>
      </div>
      <div className="detail-meta">
        <span className="meta-label">WEIGHT</span>
        <span className="meta-value">{(data.weight / 10).toFixed(1)} kg</span>
      </div>
      <div className="detail-meta">
        <span className="meta-label">BASE XP</span>
        <span className="meta-value">{data.base_experience ?? "--"}</span>
      </div>
    </div>
  );
}
