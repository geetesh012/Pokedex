import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { TEAM_SLOTS } from "../constants.js";

const STORAGE_KEY = "pokedex:team";

/** Tracks up to TEAM_SLOTS ids in the user's team, persisted across sessions. */
export function useTeam() {
  const [team, setTeam] = useLocalStorage(STORAGE_KEY, []);

  const addToTeam = useCallback(
    (id) => {
      setTeam((prev) => {
        if (prev.includes(id) || prev.length >= TEAM_SLOTS) return prev;
        return [...prev, id];
      });
    },
    [setTeam]
  );

  const removeFromTeam = useCallback(
    (id) => {
      setTeam((prev) => prev.filter((x) => x !== id));
    },
    [setTeam]
  );

  const isInTeam = useCallback((id) => team.includes(id), [team]);

  const replaceTeam = useCallback(
    (ids) => setTeam(ids.slice(0, TEAM_SLOTS)),
    [setTeam]
  );

  return { team, addToTeam, removeFromTeam, isInTeam, replaceTeam };
}
