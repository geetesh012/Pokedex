import { useState, useEffect } from "react";

/**
 * Like useState, but persists to localStorage under `key`.
 * `serialize`/`deserialize` let callers store non-JSON-native types (e.g. Sets).
 */
export function useLocalStorage(key, defaultValue, { serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? deserialize(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(value));
    } catch {
      // storage full or unavailable (e.g. private browsing) — fail silently
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);

  return [value, setValue];
}
