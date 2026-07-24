import React from "react";
import { Star } from "lucide-react";
import { SPRITE_BASE } from "../constants.js";
import { pad } from "../utils.js";

/** One grid tile: sprite, dex number, name, and favorite badge. */
export function PokemonCard({ mon, onOpen, isFav, focused }) {
  return (
    <button
      className={`mon-card ${focused ? "mon-card-focused" : ""}`}
      onClick={() => onOpen(mon.id)}
      aria-label={`${mon.name}, ${pad(mon.id)}${isFav ? ", favorited" : ""}`}
    >
      {isFav && <Star className="mon-fav-badge" size={14} fill="#F5B942" color="#F5B942" />}
      <div className="mon-card-imgwrap">
        <img
          src={`${SPRITE_BASE}/${mon.id}.png`}
          alt=""
          loading="lazy"
          className="mon-card-img"
          onError={(e) => { e.target.style.visibility = "hidden"; }}
        />
      </div>
      <div className="mon-card-id">{pad(mon.id)}</div>
      <div className="mon-card-name">{mon.name}</div>
    </button>
  );
}
