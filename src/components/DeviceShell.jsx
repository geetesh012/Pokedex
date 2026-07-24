import React from "react";
import { Volume2, VolumeX, Palette, Info } from "lucide-react";

/** The handheld casing: top lights + title + settings, screen bezel, bottom D-pad/buttons. */
export function DeviceShell({ booted, children, soundEnabled, onToggleSound, onCycleTheme, onOpenAbout }) {
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
        <div className="shell-settings">
          <button className="shell-icon-btn" onClick={onToggleSound} title="Toggle sound" aria-label="Toggle sound">
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button className="shell-icon-btn" onClick={onCycleTheme} title="Change theme" aria-label="Change theme">
            <Palette size={14} />
          </button>
          <button className="shell-icon-btn" onClick={onOpenAbout} title="About" aria-label="About">
            <Info size={14} />
          </button>
        </div>
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
