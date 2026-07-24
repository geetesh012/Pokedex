import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

let sharedCtx = null;
function getAudioContext() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    sharedCtx = new Ctx();
  }
  return sharedCtx;
}

/** Plays a short synthesized blip (no audio files needed) and exposes a persisted mute toggle. */
export function useSound() {
  const [enabled, setEnabled] = useLocalStorage("pokedex:sound", true);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const play = useCallback((freq = 720, duration = 0.06) => {
    if (!enabledRef.current) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // audio unavailable (e.g. autoplay policy before any user gesture) — ignore
    }
  }, []);

  const playTap = useCallback(() => play(720, 0.05), [play]);
  const playSelect = useCallback(() => play(920, 0.07), [play]);
  const playToggleOn = useCallback(() => play(1100, 0.08), [play]);
  const playToggleOff = useCallback(() => play(500, 0.08), [play]);

  return { enabled, setEnabled, playTap, playSelect, playToggleOn, playToggleOff };
}
