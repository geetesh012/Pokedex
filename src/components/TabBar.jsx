import React from "react";

const TABS = [
  { id: "dex", label: "DEX" },
  { id: "team", label: "TEAM" },
  { id: "compare", label: "COMPARE" },
];

/** Top navigation between the main grid, team builder, and compare screens. */
export function TabBar({ activeTab, onChange, teamCount, compareCount }) {
  const badge = (id) => {
    if (id === "team" && teamCount > 0) return teamCount;
    if (id === "compare" && compareCount > 0) return compareCount;
    return null;
  };

  return (
    <div className="tab-row">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {badge(tab.id) != null && <span className="tab-badge">{badge(tab.id)}</span>}
        </button>
      ))}
    </div>
  );
}
