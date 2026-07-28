import { navStations, stations } from "../data/stations";
import { scrollToStation, useActiveStation } from "../lib/journey";

/** Desktop-only flight progress rail: which station you're at, and what's next. */
export default function StationRail() {
  const active = useActiveStation();
  const activeId = stations[active]?.id;

  return (
    <div className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col items-end gap-3">
        {navStations.map((s) => {
          const on = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToStation(s.id)}
                className="pointer-events-auto group flex items-center gap-3"
                aria-label={`Go to ${s.label}`}
                aria-current={on ? "true" : undefined}
              >
                <span
                  className={`font-mono text-[0.65rem] tracking-[0.15em] uppercase transition-all duration-300 ${
                    on
                      ? "text-chalk opacity-100"
                      : "text-haze opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on
                      ? "h-2.5 w-2.5 bg-nova shadow-[0_0_12px_2px_rgba(242,114,200,0.5)]"
                      : "h-1.5 w-1.5 bg-haze/45 group-hover:bg-haze"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
