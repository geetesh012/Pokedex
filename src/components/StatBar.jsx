import React, { useState, useEffect } from "react";

/** One base-stat row rendered as a segmented LCD-style meter (single uniform color), filling in on mount. */
export function StatBar({ label, value, max = 180 }) {
  const [revealed, setRevealed] = useState(false);
  const segments = 18;
  const filled = Math.round((Math.min(value, max) / max) * segments);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="statbar-row">
      <span className="statbar-label">{label}</span>
      <div className="statbar-track">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="statbar-seg"
            style={{
              opacity: revealed && i < filled ? 1 : 0.15,
              transitionDelay: `${i * 14}ms`,
            }}
          />
        ))}
      </div>
      <span className="statbar-value">{String(value).padStart(3, "0")}</span>
    </div>
  );
}