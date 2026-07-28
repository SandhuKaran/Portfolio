import { profile } from "../data/content";

// CC-BY assets carried over from the first version of this site — the licence
// requires the credit, so it lives in the page rather than only in the source.
const CREDITS = [
  { label: "Planet — Quaternius", href: "https://poly.pizza/m/9g1aIbfR9Y" },
  { label: "Earth — Poly by Google", href: "https://poly.pizza/m/88CP80Kgb-u" },
  { label: "Suitcase — Don Carson", href: "https://poly.pizza/m/023W-XcCmir" },
  { label: "Houseplant — jeremy", href: "https://poly.pizza/m/e9oRt-Ct6js" },
];

export default function Footer() {
  return (
    <footer className="relative px-5 pb-10 sm:px-8 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-4 border-t border-white/8 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-haze/60 uppercase">
          © {new Date().getFullYear()} {profile.name} · Built with React, Three.js & Rapier
        </p>
        <p className="pointer-events-auto font-mono text-[0.62rem] text-haze/50">
          3D models:{" "}
          {CREDITS.map((c, i) => (
            <span key={c.href}>
              {i > 0 && " · "}
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-haze"
              >
                {c.label}
              </a>
            </span>
          ))}{" "}
          (CC-BY)
        </p>
      </div>
    </footer>
  );
}
