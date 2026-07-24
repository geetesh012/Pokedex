import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { COMPARE_MAX } from "../constants.js";

const STORAGE_KEY = "pokedex:compare";

/** Tracks up to COMPARE_MAX ids selected for side-by-side comparison, persisted across sessions. */
export function useCompareList() {
  const [compareIds, setCompareIds] = useLocalStorage(STORAGE_KEY, []);

  const toggleCompare = useCallback(
    (id) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= COMPARE_MAX) return prev;
        return [...prev, id];
      });
    },
    [setCompareIds]
  );

  const removeFromCompare = useCallback(
    (id) => {
      setCompareIds((prev) => prev.filter((x) => x !== id));
    },
    [setCompareIds]
  );

  const clearCompare = useCallback(() => setCompareIds([]), [setCompareIds]);

  return { compareIds, toggleCompare, removeFromCompare, clearCompare };
}
