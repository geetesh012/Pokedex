import React from "react";
import { ArrowLeft } from "lucide-react";

/** Simple credits/about screen. */
export function AboutPage({ onBack }) {
  return (
    <div className="about-screen">
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="detail-topbar-title">ABOUT</span>
        <span style={{ width: 24 }} />
      </div>

      <div className="about-body">
        <p className="about-line">
          A retro handheld-style Pokédex covering all 1,025 Pokémon across Generations I–IX.
        </p>
        <p className="about-line">
          All Pokémon data — stats, types, evolutions, moves, sprites, and cries — comes from{" "}
          <strong>PokéAPI</strong>, a free public REST API.
        </p>
        <p className="about-line">
          Built with React, Vite, and react-router. Installable as a PWA with offline caching.
        </p>
        <p className="about-line">
          Favorites, your team, and comparisons are saved locally in your browser and never leave
          your device.
        </p>
        <div className="about-footer">Pokémon and Pokémon character names are trademarks of Nintendo.</div>
      </div>
    </div>
  );
}
