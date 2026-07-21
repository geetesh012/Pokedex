import React from "react";
import { StatBar } from "./StatBar.jsx";
import { STAT_LABELS } from "../constants.js";

/** "BASE STATS" section: one StatBar per stat. */
export function DetailStats({ stats }) {
  return (
    <div className="detail-section">
      <div className="detail-section-title">BASE STATS</div>
      {stats.map((s) => (
        <StatBar key={s.stat.name} label={STAT_LABELS[s.stat.name] || s.stat.name} value={s.base_stat} />
      ))}
    </div>
  );
}
