import React from "react";

/** One base-stat row rendered as a segmented LCD-style meter. */
export function StatBar({ label, value, max = 180 }) {
  const segments = 18;
  const filled = Math.round((Math.min(value, max) / max) * segments);

  return (
    <div className="statbar-row">
      <span className="statbar-label">{label}</span>
      <div className="statbar-track">
        {Array.from({ length: segments }).map((_, i) => (
          <div key={i} className="statbar-seg" style={{ opacity: i < filled ? 1 : 0.15 }} />
        ))}
      </div>
      <span className="statbar-value">{String(value).padStart(3, "0")}</span>
    </div>
  );
}
