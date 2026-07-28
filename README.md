# karansandhu.com

A portfolio built as a flight through space. A fixed WebGL canvas flies a camera
between eight "stations" as you scroll, while the actual content sits in a
normal HTML document layered on top.

Live: [karansandhu.com](https://www.karansandhu.com)

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the built output
```

Node 18+. Deploys to Vercel as-is (Vite preset, output `dist`).

## Editing the site

Almost everything you'll want to change lives in two files.

**`src/data/content.js`** — every word on the page. Bio, jobs, projects,
skills, education, links. Add an entry to `experience` or `projects` and it
renders itself; no component changes needed.

**`src/data/stations.js`** — the flight path. Each entry is simultaneously a
scroll section *and* a camera waypoint:

```js
{
  id: "projects",          // must match the section id
  label: "Projects",       // nav + rail label
  landmark: "telescope",   // key into LANDMARKS in src/scene/Scene.jsx
  anchor: [16, 4, -165],   // where the 3D model sits in world space
  cam:  { desktop: [-4.5, -1, 17], mobile: [0, -0.5, 24] },  // offset from anchor
  look: { desktop: [-4.5, -1.5, 0], mobile: [0, -7, 0] },    // offset from anchor
  side: "left",            // which side the text panel sits on (desktop)
}
```

The camera flies a Catmull-Rom curve fitted through every station's
`anchor + cam`, aiming at `anchor + look`. Because both are *offsets*, moving a
landmark drags its framing along with it. Reorder or add stations here and the
route re-fits itself — just add the matching `<Section>` in `src/App.jsx`.

Two things to keep in mind when moving stations:

- Anchors are ~55 units apart. That spacing plus the scene fog (`Scene.jsx`) is
  what stops you seeing every landmark at once from the launch pad. The camera's
  `far` plane in `App.jsx` is tuned to sit just past where the fog goes opaque —
  if you widen the fog, widen `far` to match.
- The gap between `cam.x` and `anchor.x` is what pushes a landmark off to one
  side, leaving the other side clear for text. On mobile both are centred and
  `look` drops below the anchor instead, so the landmark floats above the card.

## How it fits together

```
src/
  data/          content.js, stations.js   ← edit these
  lib/
    journey.js   maps scroll offset → position along the flight path
    env.js       breakpoint / reduced-motion / device-tier detection
  scene/         everything inside the <Canvas>
    CameraRig    damps along the curve, banks into turns, widens the lens with speed
    Starfield    one draw call; stars wrap around the camera in the vertex shader
    Nebula       cheap fbm gas clouds
    Landmark     loads a GLB and normalises it to a given on-screen size
    PhysicsLanyard / StaticLanyard   the draggable badge, and its no-physics stand-in
  ui/            the HTML layer — Nav, Section, Hero, Sections, Footer
```

Scroll position never re-renders React. `lib/journey.js` writes to a plain
mutable object that the camera reads once per frame; only the active-station
index (for nav highlighting) is published through a subscription.

## Responsiveness and performance

The 3D is scenery — all the words are real DOM, so the site is selectable,
zoomable, indexable and screen-reader navigable. The layout and the camera
framing both switch at 1024px; `useMobileFraming` and the `lg:` classes in
`Section.jsx` have to stay in lockstep.

- Rapier is ~1 MB gzipped, so it's a lazy chunk behind a static badge. Devices
  reporting save-data, ≤2 GB RAM or ≤2 cores never fetch it.
- `prefers-reduced-motion` drops the physics, the camera drift, the banking and
  the reveal animations, and pins the camera straight to the scroll position.
- Device pixel ratio is capped by tier; star count scales with it too.
- The canvas is `touch-action: pan-y`, so the page scrolls under your thumb
  while sideways drags still reach the badge.

## Credits

Some 3D models are CC-BY and are credited in the page footer: Planet by
Quaternius, Earth by Poly by Google, Suitcase by Don Carson, Houseplant by
jeremy — all via [Poly Pizza](https://poly.pizza). GitHub icon by IconScout.
