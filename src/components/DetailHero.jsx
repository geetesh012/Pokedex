import React, { useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import { TypeChip } from "./TypeChip.jsx";
import { SPRITE_BASE } from "../constants.js";
import { pad } from "../utils.js";

/** Top section of the detail screen: artwork, dex number, name, types, shiny toggle, cry button. */
export function DetailHero({ data }) {
  const [shiny, setShiny] = useState(false);
  const audioRef = useRef(null);

  const artworkNormal = data.sprites?.other?.["official-artwork"]?.front_default || `${SPRITE_BASE}/${data.id}.png`;
  const artworkShiny =
    data.sprites?.other?.["official-artwork"]?.front_shiny || data.sprites?.front_shiny || artworkNormal;
  const artwork = shiny ? artworkShiny : artworkNormal;

  const cryUrl = data.cries?.latest || data.cries?.legacy || null;

  const playCry = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="detail-hero">
      <img src={artwork} alt={data.name} className="detail-hero-img" />
      <div className="detail-hero-id">{pad(data.id)}</div>
      <h2 className="detail-hero-name">{data.name}</h2>
      <div className="detail-hero-types">
        {data.types.map((t) => (
          <TypeChip key={t.type.name} type={t.type.name} active onClick={() => {}} />
        ))}
      </div>

      <div className="hero-controls">
        <button className={`hero-toggle ${shiny ? "active" : ""}`} onClick={() => setShiny((s) => !s)}>
          {shiny ? "★ SHINY" : "☆ SHINY"}
        </button>
        {cryUrl && (
          <button className="hero-toggle" onClick={playCry}>
            <Volume2 size={12} /> CRY
          </button>
        )}
      </div>
      {cryUrl && <audio ref={audioRef} src={cryUrl} preload="none" />}
    </div>
  );
}
