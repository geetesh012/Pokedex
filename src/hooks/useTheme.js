import { useLocalStorage } from "./useLocalStorage.js";

export const THEMES = ["red", "blue", "green"];

/** Persisted UI theme selection. Returns [theme, setTheme]. */
export function useTheme() {
  return useLocalStorage("pokedex:theme", "red");
}
