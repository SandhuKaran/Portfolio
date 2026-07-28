import { useSyncExternalStore } from "react";
import { stations } from "../data/stations";

/**
 * Bridge between DOM scrolling and the 3D camera.
 *
 * `journey` is a plain mutable object read once per animation frame by the
 * camera rig. Scrolling never re-renders React — only the active-station index
 * (used to highlight the nav) is published through a subscription.
 */
export const journey = {
  /** Raw station index from scroll position, 0 .. stations.length - 1. */
  target: 0,
  /** Damped station index actually used to sample the flight path. */
  t: 0,
  /** Stations travelled per second, from the damped value. Drives warp FX. */
  velocity: 0,
  /** 0 .. 1 across the whole page. */
  progress: 0,
  measured: false,
};

const elements = new Map();
let tops = [];
let activeIndex = 0;
const listeners = new Set();

function measure() {
  if (elements.size < stations.length) return;
  const scroll = window.scrollY;
  tops = stations.map((s) => {
    const el = elements.get(s.id);
    return el ? el.getBoundingClientRect().top + scroll : 0;
  });
  journey.measured = true;
  read();
}

/** Station index (float) for the current scroll position. */
function stationAt(y) {
  const n = tops.length;
  if (n < 2) return 0;
  if (y <= tops[0]) return 0;
  if (y >= tops[n - 1]) return n - 1;
  let i = 0;
  while (i < n - 2 && y >= tops[i + 1]) i++;
  const span = Math.max(1, tops[i + 1] - tops[i]);
  return i + (y - tops[i]) / span;
}

function read() {
  const t = stationAt(window.scrollY);
  journey.target = t;
  journey.progress = t / Math.max(1, stations.length - 1);
  const next = Math.round(t);
  if (next !== activeIndex) {
    activeIndex = next;
    listeners.forEach((fn) => fn());
  }
}

let frame = 0;
function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    read();
  });
}

let started = false;
let observer;

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", measure);

  // The camera's whole position depends on these offsets, so anything that
  // reflows the page has to invalidate them: late webfonts, orientation
  // changes, mobile browser chrome collapsing. Watching the document is more
  // reliable than trying to enumerate the causes.
  if ("ResizeObserver" in window) {
    observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
  }
  document.fonts?.ready.then(measure).catch(() => {});
}

export function registerSection(id, el) {
  if (el) elements.set(id, el);
  else elements.delete(id);
  start();
  measure();
}

export function subscribeActive(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useActiveStation() {
  return useSyncExternalStore(
    subscribeActive,
    () => activeIndex,
    () => 0
  );
}

export function scrollToStation(id) {
  const el = elements.get(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}
