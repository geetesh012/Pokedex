import { useState, useEffect } from "react";

const COLUMNS = 3;

/**
 * Arrow-key navigation over a flat list, Enter to activate, Escape to cancel.
 * Only active when `enabled` is true (e.g. on the Dex tab with no detail open).
 * Returns [focusedIndex, setFocusedIndex].
 */
export function useGridKeyboardNav({ enabled, itemCount, onActivate, onEscape }) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if (itemCount === 0) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, itemCount - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + COLUMNS, itemCount - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - COLUMNS, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        onActivate?.(focusedIndex);
      } else if (e.key === "Escape") {
        onEscape?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, itemCount, focusedIndex, onActivate, onEscape]);

  // clamp focus when the underlying list shrinks (e.g. after filtering)
  useEffect(() => {
    setFocusedIndex((i) => Math.min(i, Math.max(itemCount - 1, 0)));
  }, [itemCount]);

  return [focusedIndex, setFocusedIndex];
}
