import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * Stacked-layout viewport: drives the mobile camera framing.
 *
 * Must stay in lockstep with the `lg:` breakpoint used by Section/Hero/Nav —
 * if the DOM goes side-by-side while the camera is still centring landmarks
 * over the content, the two layers disagree about where the empty space is.
 */
export const useMobileFraming = () => useMediaQuery("(max-width: 1023px)");

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Coarse pointer — no hover, so we skip pointer parallax and hover states. */
export const useCoarsePointer = () => useMediaQuery("(pointer: coarse)");

/**
 * Rough capability tier, sampled once. `low` devices never download the ~1 MB
 * physics chunk and get a thinner starfield; everyone else gets the full scene.
 *
 * Deliberately conservative about calling something low-end: Safari doesn't
 * expose `deviceMemory` and reports a modest core count even on fast iPhones,
 * so the trigger is an explicit signal (save-data, tiny memory, 1–2 cores)
 * rather than "looks like a phone".
 */
export function deviceTier() {
  if (typeof navigator === "undefined") return "high";
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory;
  const saveData = navigator.connection?.saveData;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (saveData || cores <= 2 || (memory !== undefined && memory <= 2)) return "low";
  if (coarse || cores <= 6) return "mid";
  return "high";
}
