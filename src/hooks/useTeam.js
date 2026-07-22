import { useState, useCallback } from "react";
import { TEAM_SLOTS } from "../constants.js";

/** Tracks up to TEAM_SLOTS ids in the user's team. */
export function useTeam() {
  const [team, setTeam] = useState([]);

  const addToTeam = useCallback((id) => {
    setTeam((prev) => {
      if (prev.includes(id) || prev.length >= TEAM_SLOTS) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromTeam = useCallback((id) => {
    setTeam((prev) => prev.filter((x) => x !== id));
  }, []);

  const isInTeam = useCallback((id) => team.includes(id), [team]);

  return { team, addToTeam, removeFromTeam, isInTeam };
}
