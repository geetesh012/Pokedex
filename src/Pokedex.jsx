import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./pokedex.css";

import { usePokemonList } from "./hooks/usePokemonList.js";
import { useUrlFilters } from "./hooks/useUrlFilters.js";
import { useDebouncedValue } from "./hooks/useDebouncedValue.js";
import { useFavorites } from "./hooks/useFavorites.js";
import { useFilteredPokemon } from "./hooks/useFilteredPokemon.js";
import { useSortedPokemon } from "./hooks/useSortedPokemon.js";
import { useStatTotals } from "./hooks/useStatTotals.js";
import { useBoot } from "./hooks/useBoot.js";
import { useCompareList } from "./hooks/useCompareList.js";
import { useTeam } from "./hooks/useTeam.js";
import { useTheme, THEMES } from "./hooks/useTheme.js";
import { useSound } from "./hooks/useSound.js";
import { useGridKeyboardNav } from "./hooks/useGridKeyboardNav.js";

import { DeviceShell } from "./components/DeviceShell.jsx";
import { TabsLayout } from "./components/TabsLayout.jsx";
import { DexContent } from "./components/DexContent.jsx";
import { DetailRoute } from "./components/DetailRoute.jsx";
import { CompareScreen } from "./components/CompareScreen.jsx";
import { TeamScreen } from "./components/TeamScreen.jsx";
import { AboutPage } from "./components/AboutPage.jsx";
import { OfflineBanner } from "./components/OfflineBanner.jsx";

export default function Pokedex() {
  const navigate = useNavigate();

  const { allMon, loading, error } = usePokemonList();
  const {
    search,
    setSearch,
    selectedTypes,
    mode,
    setMode,
    toggleType,
    clearAllTypes,
    filteredIds,
    typeLoading,
    showFavOnly,
    setShowFavOnly,
    sortBy,
    setSortBy,
  } = useUrlFilters();
  const debouncedSearch = useDebouncedValue(search, 200);

  const { favorites, toggleFav, isFavorite, replaceFavorites } = useFavorites();
  const booted = useBoot();
  const { compareIds, toggleCompare, removeFromCompare } = useCompareList();
  const { team, addToTeam, removeFromTeam, isInTeam, replaceTeam } = useTeam();
  const [theme, setTheme] = useTheme();
  const sound = useSound();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useFilteredPokemon({
    allMon,
    search: debouncedSearch,
    typeIds: filteredIds,
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

  const activeFilterCount = selectedTypes.size + (showFavOnly ? 1 : 0);
  const hasAnyFilter = activeFilterCount > 0;

  const clearAllFilters = () => {
    clearAllTypes();
    setShowFavOnly(false);
  };

  const openPokemon = (id) => {
    sound.playSelect();
    navigate(`/pokemon/${id}`);
  };

  const [focusedIndex] = useGridKeyboardNav({
    enabled: !filtersOpen,
    itemCount: displayList.length,
    onActivate: (i) => {
      const mon = displayList[i];
      if (mon) openPokemon(mon.id);
    },
    onEscape: () => {},
  });

  const handleImportBackup = ({ favorites: favIds, team: teamIds }) => {
    replaceFavorites(favIds);
    replaceTeam(teamIds);
  };

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  const isInCompareFn = (id) => compareIds.includes(id);

  return (
    <div className={`pokedex-root theme-${theme}`}>
      <OfflineBanner />
      <DeviceShell
        booted={booted}
        soundEnabled={sound.enabled}
        onToggleSound={() => sound.setEnabled((v) => !v)}
        onCycleTheme={cycleTheme}
        onOpenAbout={() => navigate("/about")}
      >
        <Routes>
          <Route
            element={
              <TabsLayout teamCount={team.length} compareCount={compareIds.length} onTabChange={() => sound.playTap()} />
            }
          >
            <Route
              index
              element={
                <DexContent
                  search={search}
                  onSearchChange={setSearch}
                  activeFilterCount={activeFilterCount}
                  filtersOpen={filtersOpen}
                  onToggleFiltersOpen={() => setFiltersOpen((v) => !v)}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedTypes={selectedTypes}
                  mode={mode}
                  onModeChange={setMode}
                  onToggleType={toggleType}
                  showFavOnly={showFavOnly}
                  onFavOnlyChange={setShowFavOnly}
                  favoriteCount={favorites.size}
                  onClearAllFilters={clearAllFilters}
                  hasAnyFilter={hasAnyFilter}
                  displayList={displayList}
                  totalCount={allMon.length}
                  isLoading={loading || typeLoading}
                  hasError={error}
                  isFavorite={isFavorite}
                  onOpen={openPokemon}
                  focusedIndex={focusedIndex}
                />
              }
            />
            <Route
              path="team"
              element={
                <TeamScreen
                  team={team}
                  onRemove={removeFromTeam}
                  onOpen={openPokemon}
                  favorites={favorites}
                  onImportBackup={handleImportBackup}
                />
              }
            />
            <Route
              path="compare"
              element={<CompareScreen compareIds={compareIds} onRemove={removeFromCompare} onOpen={openPokemon} />}
            />
          </Route>

          <Route
            path="pokemon/:id"
            element={
              <DetailRoute
                isFavorite={isFavorite}
                onToggleFav={toggleFav}
                isInTeam={isInTeam}
                onToggleTeam={(id) => (isInTeam(id) ? removeFromTeam(id) : addToTeam(id))}
                isInCompare={isInCompareFn}
                onToggleCompare={toggleCompare}
              />
            }
          />

          <Route path="about" element={<AboutPage onBack={() => navigate(-1)} />} />
        </Routes>
      </DeviceShell>
    </div>
  );
}
