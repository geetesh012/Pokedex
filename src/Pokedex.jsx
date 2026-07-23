import React, { useState, useMemo } from "react";
import "./pokedex.css";

import { usePokemonList } from "./hooks/usePokemonList.js";
import { useMultiTypeFilter } from "./hooks/useMultiTypeFilter.js";
import { useFavorites } from "./hooks/useFavorites.js";
import { useFilteredPokemon } from "./hooks/useFilteredPokemon.js";
import { useSortedPokemon } from "./hooks/useSortedPokemon.js";
import { useStatTotals } from "./hooks/useStatTotals.js";
import { useBoot } from "./hooks/useBoot.js";
import { useCompareList } from "./hooks/useCompareList.js";
import { useTeam } from "./hooks/useTeam.js";

import { DeviceShell } from "./components/DeviceShell.jsx";
import { TabBar } from "./components/TabBar.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { FilterBar } from "./components/FilterBar.jsx";
import { ActiveFilterChips } from "./components/ActiveFilterChips.jsx";
import { FilterPanel } from "./components/FilterPanel.jsx";
import { PokemonGrid } from "./components/PokemonGrid.jsx";
import { DetailScreen } from "./components/DetailScreen.jsx";
import { CompareScreen } from "./components/CompareScreen.jsx";
import { TeamScreen } from "./components/TeamScreen.jsx";
import { OfflineBanner } from "./components/OfflineBanner.jsx";

export default function Pokedex() {
  const { allMon, loading, error } = usePokemonList();
  const {
    selectedTypes,
    mode,
    setMode,
    toggleType,
    clearAllTypes,
    filteredIds,
    isLoading: typeLoading,
  } = useMultiTypeFilter();
  const { favorites, toggleFav, isFavorite } = useFavorites();
  const booted = useBoot();
  const { compareIds, toggleCompare, removeFromCompare } = useCompareList();
  const { team, addToTeam, removeFromTeam, isInTeam } = useTeam();

  const [activeTab, setActiveTab] = useState("dex");
  const [search, setSearch] = useState("");
  // const [generation, setGeneration] = useState(null);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [sortBy, setSortBy] = useState("dex");
  const [selectedId, setSelectedId] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useFilteredPokemon({
    allMon,
    search,
    typeIds: filteredIds,
    // generation,
    showFavOnly,
    favorites,
  });

  const nameSorted = useSortedPokemon(filtered, sortBy === "stats" ? "dex" : sortBy);
  const { totals: statTotals } = useStatTotals(
    filtered.map((m) => m.id),
    sortBy === "stats"
  );
  const displayList =
    sortBy === "stats" && Object.keys(statTotals).length
      ? [...filtered].sort((a, b) => (statTotals[b.id] ?? 0) - (statTotals[a.id] ?? 0))
      : nameSorted;

  const activeFilterCount = (generation ? 1 : 0) + selectedTypes.size + (showFavOnly ? 1 : 0);
  const hasAnyFilter = activeFilterCount > 0;

  const clearAllFilters = () => {
    // setGeneration(null);
    clearAllTypes();
    setShowFavOnly(false);
  };

  const openFromAnywhere = (id) => {
    setSelectedId(id);
    setActiveTab("dex");
  };

  return (
    <div className="pokedex-root">
      <OfflineBanner />
      <DeviceShell booted={booted}>
        {selectedId ? (
          <DetailScreen
            key={selectedId}
            id={selectedId}
            onBack={() => setSelectedId(null)}
            isFav={isFavorite(selectedId)}
            onToggleFav={toggleFav}
            onSelectPokemon={setSelectedId}
            isInTeam={isInTeam(selectedId)}
            onToggleTeam={(id) => (isInTeam(id) ? removeFromTeam(id) : addToTeam(id))}
            isInCompare={compareIds.includes(selectedId)}
            onToggleCompare={toggleCompare}
          />
        ) : (
          <>
            <TabBar
              activeTab={activeTab}
              onChange={setActiveTab}
              teamCount={team.length}
              compareCount={compareIds.length}
            />

            <div className="tab-content" key={activeTab}>
              {activeTab === "dex" && (
                <>
                  <SearchBar value={search} onChange={setSearch} />

                  <FilterBar
                    activeCount={activeFilterCount}
                    isOpen={filtersOpen}
                    onToggle={() => setFiltersOpen((v) => !v)}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    resultCount={filtered.length}
                  />

                  <ActiveFilterChips
                    generation={generation}
                    selectedTypes={selectedTypes}
                    showFavOnly={showFavOnly}
                    onClearGen={() => setGeneration(null)}
                    onClearType={toggleType}
                    onClearFav={() => setShowFavOnly(false)}
                  />

                  <FilterPanel
                    isOpen={filtersOpen}
                    generation={generation}
                    onGenerationChange={setGeneration}
                    selectedTypes={selectedTypes}
                    mode={mode}
                    onToggleType={toggleType}
                    onModeChange={setMode}
                    showFavOnly={showFavOnly}
                    onFavOnlyChange={setShowFavOnly}
                    favoriteCount={favorites.size}
                    onClearAll={clearAllFilters}
                    hasAnyFilter={hasAnyFilter}
                  />

                  <PokemonGrid
                    pokemon={displayList}
                    isLoading={loading || typeLoading}
                    hasError={error}
                    isFavorite={isFavorite}
                    onOpen={setSelectedId}
                  />
                </>
              )}

              {activeTab === "team" && (
                <TeamScreen team={team} onRemove={removeFromTeam} onOpen={openFromAnywhere} />
              )}

              {activeTab === "compare" && (
                <CompareScreen compareIds={compareIds} onRemove={removeFromCompare} onOpen={openFromAnywhere} />
              )}
            </div>
          </>
        )}
      </DeviceShell>
    </div>
  );
}
