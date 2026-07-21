import React from "react";

/** The red handheld casing: top lights + title, screen bezel, bottom D-pad/buttons. */
export function DeviceShell({ booted, children }) {
  return (
    <div className="shell">
      <div className="shell-top">
        <div className="lens-big" />
        <div className="shell-indicators">
          <div className="lens-small" style={{ background: "#4caf50" }} />
          <div className="lens-small" style={{ background: "#f5b942" }} />
          <div className="lens-small" style={{ background: "#e05555" }} />
        </div>
        <span className="shell-title">POKÉDEX</span>
      </div>

      <div className="screen-bezel">
        <div className="screen" style={{ opacity: booted ? 1 : 0 }}>
          {children}
        </div>
      </div>

      <div className="bottom-controls">
        <div className="dpad">
          <div className="dpad-h" />
          <div className="dpad-v" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="round-btn" style={{ background: "#8a2e2a" }} />
          <div className="round-btn" />
        </div>
      </div>
    </div>
  );
}
