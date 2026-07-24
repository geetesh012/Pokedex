import React from "react";
import { GridSkeleton } from "./GridSkeleton.jsx";
import { VirtualizedPokemonGrid } from "./VirtualizedPokemonGrid.jsx";

/** Grid of Pokémon cards (virtualized), plus its own loading / error / empty states. */
export function PokemonGrid({ pokemon, isLoading, hasError, isFavorite, onOpen, focusedIndex }) {
  if (isLoading) {
    return <GridSkeleton />;
  }

  if (hasError) {
    return <div className="empty-state">SIGNAL LOST. CHECK CONNECTION.</div>;
  }

  if (pokemon.length === 0) {
    return <div className="empty-state">NO POKÉMON FOUND.</div>;
  }

  return (
    <VirtualizedPokemonGrid
      pokemon={pokemon}
      isFavorite={isFavorite}
      onOpen={onOpen}
      focusedIndex={focusedIndex}
    />
  );
}
