import React from "react";

/** "ABILITIES" section: one pill per ability (marking hidden abilities). */
export function DetailAbilities({ abilities }) {
  return (
    <div className="detail-section">
      <div className="detail-section-title">ABILITIES</div>
      <div className="ability-list">
        {abilities.map((a) => (
          <span key={a.ability.name} className="ability-pill">
            {a.ability.name.replace(/-/g, " ")}
            {a.is_hidden ? " (hidden)" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
