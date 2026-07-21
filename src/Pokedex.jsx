import React, { useState } from "react";
import "./pokedex.css";

import { usePokemonList } from "./hooks/usePokemonList.js";
import { useTypeFilter } from "./hooks/useTypeFilter.js";
import { useFavorites } from "./hooks/useFavorites.js";
import { useFilteredPokemon } from "./hooks/useFilteredPokemon.js";
import { useBoot } from "./hooks/useBoot.js";

import { DeviceShell } from "./components/DeviceShell.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { TypeFilterRow } from "./components/TypeFilterRow.jsx";
import { ViewToggle } from "./components/ViewToggle.jsx";
import { PokemonGrid } from "./components/PokemonGrid.jsx";
import { DetailScreen } from "./components/DetailScreen.jsx";

export default function Pokedex() {
  const { allMon, loading, error } = usePokemonList();
  const { activeType, typeIds, typeLoading, selectType } = useTypeFilter();
  const { favorites, toggleFav, isFavorite } = useFavorites();
  const booted = useBoot();

  const [search, setSearch] = useState("");
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useFilteredPokemon({ allMon, search, typeIds, showFavOnly, favorites });

  return (
    <div className="pokedex-root">
      <DeviceShell booted={booted}>
        {selectedId ? (
          <DetailScreen
            id={selectedId}
            onBack={() => setSelectedId(null)}
            isFav={isFavorite(selectedId)}
            onToggleFav={toggleFav}
            onSelectPokemon={setSelectedId}
          />
        ) : (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilterRow activeType={activeType} onSelect={selectType} />
            <ViewToggle showFavOnly={showFavOnly} onChange={setShowFavOnly} favoriteCount={favorites.size} />
            <PokemonGrid
              pokemon={filtered}
              isLoading={loading || typeLoading}
              hasError={error}
              isFavorite={isFavorite}
              onOpen={setSelectedId}
            />
          </>
        )}
      </DeviceShell>
    </div>
  );
}
