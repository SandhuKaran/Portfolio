import { useCallback } from "react";
import { profile } from "../data/content";
import { registerSection, scrollToStation } from "../lib/journey";
import Reveal from "./Reveal";

export default function Hero({ cardGrabbed }) {
  const ref = useCallback((el) => registerSection("hero", el), []);

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full px-5 pt-28 pb-20 sm:px-8 md:px-10 md:py-24 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[92rem] items-end justify-center lg:items-center lg:justify-start">
        <div className="panel w-full max-w-[34rem]">
          <Reveal>
            <p className="kicker">
              {profile.role} · {profile.location}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,9vw,4.5rem)] leading-[0.95] font-black tracking-tight text-chalk uppercase">
              {profile.first}
              <br />
              {profile.last}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3 font-mono text-xs tracking-[0.35em] text-nova uppercase">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-haze sm:text-base">
              {profile.blurb}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToStation("about")}
                className="rounded-full bg-chalk px-5 py-2.5 font-mono text-[0.7rem] tracking-[0.15em] text-void uppercase transition-transform hover:-translate-y-0.5"
              >
                Begin the flight
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-beam/30 px-5 py-2.5 font-mono text-[0.7rem] tracking-[0.15em] text-chalk uppercase transition-colors hover:bg-beam/10"
              >
                Email me
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p
              className={`mt-7 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-haze/80 uppercase transition-opacity duration-500 ${
                cardGrabbed ? "opacity-0" : "opacity-100"
              }`}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-nova"
              />
              Grab the badge and throw it around
            </p>
          </Reveal>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToStation("about")}
        className="pointer-events-auto absolute inset-x-0 bottom-5 mx-auto hidden w-fit flex-col items-center gap-2 text-haze transition-colors hover:text-chalk lg:flex"
        aria-label="Scroll to next station"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-haze/70 to-transparent" />
      </button>
    </section>
  );
}
