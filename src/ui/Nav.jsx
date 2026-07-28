import { useEffect, useState } from "react";
import { navStations, stations } from "../data/stations";
import { profile } from "../data/content";
import { scrollToStation, useActiveStation } from "../lib/journey";

export default function Nav() {
  const active = useActiveStation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = stations[active]?.id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToStation(id);
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-void/55 backdrop-blur-md" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 py-4 sm:px-8 md:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => go("hero")}
            className="pointer-events-auto flex items-baseline gap-2 text-left"
          >
            <span className="font-display text-sm font-black tracking-[0.2em] text-chalk uppercase">
              {profile.last}
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-haze uppercase">
              /{profile.first}
            </span>
          </button>

          <nav className="pointer-events-auto hidden items-center gap-1 lg:flex">
            {navStations.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                aria-current={activeId === s.id ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors ${
                  activeId === s.id
                    ? "bg-beam/15 text-chalk"
                    : "text-haze hover:text-chalk"
                }`}
              >
                {s.label}
              </button>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="ml-2 rounded-full border border-beam/30 bg-beam/10 px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-chalk uppercase transition-colors hover:bg-beam/20"
            >
              Get in touch
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="pointer-events-auto rounded-full border border-beam/25 bg-ink/60 px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.15em] text-chalk uppercase backdrop-blur lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {open && (
        <div className="pointer-events-auto fixed inset-0 z-40 flex flex-col justify-center bg-void/92 px-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navStations.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className="flex items-baseline gap-4 border-b border-white/5 py-4 text-left"
              >
                <span className="font-mono text-[0.7rem] text-beam">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-2xl font-bold ${
                    activeId === s.id ? "text-chalk" : "text-haze"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </nav>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 rounded-full border border-beam/30 bg-beam/10 px-5 py-3 text-center font-mono text-xs tracking-[0.15em] text-chalk uppercase"
          >
            {profile.email}
          </a>
        </div>
      )}
    </>
  );
}
