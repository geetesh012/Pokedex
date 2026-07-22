import { useState, useCallback } from "react";
import { COMPARE_MAX } from "../constants.js";

/** Tracks up to COMPARE_MAX ids selected for side-by-side comparison. */
export function useCompareList() {
  const [compareIds, setCompareIds] = useState([]);

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= COMPARE_MAX) return prev; // silently ignore past the cap
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  return { compareIds, toggleCompare, removeFromCompare, clearCompare };
}
