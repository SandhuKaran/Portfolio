import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { profile } from "../data/content";

export default function Loader() {
  const { active, progress } = useProgress();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (active || progress < 100) return;
    const t = setTimeout(() => setDone(true), 350);
    return () => clearTimeout(t);
  }, [active, progress]);

  // Never trap someone behind a stalled asset — the site works without the 3D.
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    if (!gone) window.scrollTo(0, 0);
    return () => void (document.body.style.overflow = "");
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="kicker mb-5">Pre-flight check</p>
      <h1 className="font-display text-3xl font-black tracking-[0.28em] text-chalk uppercase sm:text-4xl">
        {profile.first}
      </h1>
      <div className="mt-8 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
        <div
          className="h-full bg-gradient-to-r from-beam via-ion to-nova transition-[width] duration-300 ease-out"
          style={{ width: `${Math.max(4, Math.round(progress))}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.2em] text-haze">
        {String(Math.round(progress)).padStart(3, "0")}%
      </p>
    </div>
  );
}
