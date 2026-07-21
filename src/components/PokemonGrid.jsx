import React from "react";
import { Loader2 } from "lucide-react";
import { PokemonCard } from "./PokemonCard.jsx";

/** Grid of Pokémon cards, plus its own loading / error / empty states. */
export function PokemonGrid({ pokemon, isLoading, hasError, isFavorite, onOpen }) {
  if (isLoading) {
    return (
      <div className="load-state">
        <Loader2 className="spin" size={22} style={{ margin: "0 auto 6px" }} />
        <div>LOADING...</div>
      </div>
    );
  }

  if (hasError) {
    return <div className="empty-state">SIGNAL LOST. CHECK CONNECTION.</div>;
  }

  if (pokemon.length === 0) {
    return <div className="empty-state">NO POKÉMON FOUND.</div>;
  }

  return (
    <div className="mon-grid">
      {pokemon.map((mon) => (
        <PokemonCard key={mon.id} mon={mon} onOpen={onOpen} isFav={isFavorite(mon.id)} />
      ))}
    </div>
  );
}
