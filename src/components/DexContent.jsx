import React from "react";
import { SearchBar } from "./SearchBar.jsx";
import { FilterBar } from "./FilterBar.jsx";
import { ActiveFilterChips } from "./ActiveFilterChips.jsx";
import { FilterPanel } from "./FilterPanel.jsx";
import { ResultsCounter } from "./ResultsCounter.jsx";
import { PokemonGrid } from "./PokemonGrid.jsx";

/** Body of the "/" route: search, filters, results count, and the grid. */
export function DexContent({
  search,
  onSearchChange,
  activeFilterCount,
  filtersOpen,
  onToggleFiltersOpen,
  sortBy,
  onSortChange,
  selectedTypes,
  mode,
  onModeChange,
  onToggleType,
  showFavOnly,
  onFavOnlyChange,
  favoriteCount,
  onClearAllFilters,
  hasAnyFilter,
  displayList,
  totalCount,
  isLoading,
  hasError,
  isFavorite,
  onOpen,
  focusedIndex,
}) {
  return (
    <>
      <SearchBar value={search} onChange={onSearchChange} />

      <FilterBar
        activeCount={activeFilterCount}
        isOpen={filtersOpen}
        onToggle={onToggleFiltersOpen}
        sortBy={sortBy}
        onSortChange={onSortChange}
        resultCount={displayList.length}
      />

      <ActiveFilterChips
        selectedTypes={selectedTypes}
        showFavOnly={showFavOnly}
        onClearType={onToggleType}
        onClearFav={() => onFavOnlyChange(false)}
      />

      <FilterPanel
        isOpen={filtersOpen}
        selectedTypes={selectedTypes}
        mode={mode}
        onToggleType={onToggleType}
        onModeChange={onModeChange}
        showFavOnly={showFavOnly}
        onFavOnlyChange={onFavOnlyChange}
        favoriteCount={favoriteCount}
        onClearAll={onClearAllFilters}
        hasAnyFilter={hasAnyFilter}
      />

      <ResultsCounter shown={displayList.length} total={totalCount} />

      <PokemonGrid
        pokemon={displayList}
        isLoading={isLoading}
        hasError={hasError}
        isFavorite={isFavorite}
        onOpen={onOpen}
        focusedIndex={focusedIndex}
      />
    </>
  );
}
