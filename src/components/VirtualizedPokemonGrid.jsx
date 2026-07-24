import React, { useRef, useEffect, useMemo } from "react";
import { Grid } from "react-window";
import { PokemonCard } from "./PokemonCard.jsx";

const COLUMN_COUNT = 3;
const ROW_HEIGHT = 92;
const GRID_HEIGHT = 300;

function Cell({ columnIndex, rowIndex, style, pokemon, isFavorite, onOpen, focusedIndex }) {
  const index = rowIndex * COLUMN_COUNT + columnIndex;
  if (index >= pokemon.length) return null;
  const mon = pokemon[index];
  return (
    <div style={{ ...style, padding: 4, boxSizing: "border-box" }}>
      <PokemonCard mon={mon} onOpen={onOpen} isFav={isFavorite(mon.id)} focused={index === focusedIndex} />
    </div>
  );
}

/** Renders only the visible cards in the DOM, so scrolling stays smooth even with 1,025 entries. */
export function VirtualizedPokemonGrid({ pokemon, isFavorite, onOpen, focusedIndex }) {
  const rowCount = Math.ceil(pokemon.length / COLUMN_COUNT);
  const gridRef = useRef(null);

  useEffect(() => {
    if (focusedIndex == null || !gridRef.current) return;
    const rowIndex = Math.floor(focusedIndex / COLUMN_COUNT);
    const columnIndex = focusedIndex % COLUMN_COUNT;
    try {
      gridRef.current.scrollToCell({ rowIndex, columnIndex, rowAlign: "smart", columnAlign: "smart" });
    } catch {
      // out-of-range index during a transient filter change — ignore
    }
  }, [focusedIndex]);

  const cellProps = useMemo(
    () => ({ pokemon, isFavorite, onOpen, focusedIndex }),
    [pokemon, isFavorite, onOpen, focusedIndex]
  );

  return (
    <div className="virtual-grid-wrap">
      <Grid
        gridRef={gridRef}
        cellComponent={Cell}
        cellProps={cellProps}
        columnCount={COLUMN_COUNT}
        columnWidth="33.333%"
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        style={{ height: GRID_HEIGHT, width: "100%" }}
      />
    </div>
  );
}
