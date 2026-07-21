import { useState, useEffect } from "react";

/** Flips to true after `delay` ms — used to fade the screen in on first mount. */
export function useBoot(delay = 350) {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return booted;
}
