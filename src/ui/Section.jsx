import { useCallback } from "react";
import { registerSection } from "../lib/journey";

// Static maps — Tailwind only generates classes it can see as literal strings.
// Breakpoint note: these are `lg:` (1024px), matching `useMobileFraming` in
// lib/env.js. The camera's mobile framing and the stacked layout have to flip
// on the same query.
const JUSTIFY = {
  left: "lg:justify-start",
  right: "lg:justify-end",
  center: "lg:justify-center",
};

const ALIGN = {
  center: "lg:items-center",
  end: "lg:items-end",
};

/**
 * One scroll section = one camera station.
 *
 * The element registers itself with the journey store; its distance from the
 * top of the document is what the camera rig turns into a position along the
 * flight path. Because that's measured from the live layout, sections can be
 * any height on any breakpoint and the camera still arrives on cue.
 */
export default function Section({
  id,
  side = "left",
  align = "center",
  width = "max-w-[36rem]",
  children,
  label,
}) {
  const ref = useCallback((el) => registerSection(id, el), [id]);

  return (
    <section
      id={id}
      ref={ref}
      aria-label={label}
      className="relative flex min-h-[100svh] w-full flex-col px-5 pt-24 pb-16 sm:px-8 md:px-10 md:py-24 lg:px-16"
    >
      {/* Reserved sky. On mobile the panel is full width, so without a floor
          under the clear space a long section (skills, say) would grow tall
          enough to shove its landmark off the top of the screen. */}
      <div aria-hidden className="min-h-[22svh] shrink-0 lg:hidden" />

      <div
        className={`mx-auto flex w-full max-w-[92rem] flex-1 items-end justify-center ${ALIGN[align]} ${JUSTIFY[side]}`}
      >
        <div className={`panel w-full ${width}`}>{children}</div>
      </div>
    </section>
  );
}
