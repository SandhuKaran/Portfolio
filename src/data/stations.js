/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE FLIGHT PATH.
 *
 *  Each station is one scroll section AND one waypoint on the camera's route
 *  through space. The camera flies along a Catmull-Rom curve fitted through
 *  every station, so adding/removing/reordering entries here re-routes the
 *  whole journey — nothing else needs to change.
 *
 *  Per station:
 *    anchor  world position of the station's 3D landmark
 *    cam     camera position, as an OFFSET from anchor  (desktop / mobile)
 *    look    camera look-at target, as an OFFSET from anchor (desktop / mobile)
 *    side    which side the HTML content sits on, desktop only
 *    align   vertical placement of the content panel on desktop
 *
 *  Because `cam` and `look` are offsets, moving a landmark drags its camera
 *  framing along with it. The lateral gap between `cam.x` and `anchor.x` is
 *  what pushes the landmark off to one side of the screen, leaving the other
 *  side clear for text. On mobile both are centred and the target is dropped
 *  below the anchor, so the landmark floats above the content card instead.
 *
 *  Anchors are ~55 units apart. That spacing plus the scene fog is what stops
 *  you seeing all eight landmarks at once from the launch station — anything
 *  more than one stop ahead has faded into the haze.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const stations = [
  {
    id: "hero",
    label: "Launch",
    landmark: "lanyard",
    anchor: [0, 0, 0],
    cam: { desktop: [0, 0.4, 9.5], mobile: [0, 1.2, 11] },
    look: { desktop: [0, 0.1, 0], mobile: [0, -2.6, 0] },
    side: "left",
    nav: false,
  },
  {
    id: "about",
    label: "About",
    landmark: "earth",
    // Nudged inboard so Earth doesn't sit directly behind the badge when you
    // glimpse it from the launch station.
    anchor: [12, 1, -55],
    cam: { desktop: [-4.5, 0.5, 17], mobile: [0, 1, 25] },
    look: { desktop: [-4.5, -0.5, 0], mobile: [0, -6.5, 0] },
    side: "left",
    nav: true,
  },
  {
    id: "experience",
    label: "Experience",
    landmark: "suitcase",
    anchor: [-15, -3, -110],
    cam: { desktop: [4.5, 1.5, 17], mobile: [0, 1.5, 24] },
    look: { desktop: [4.5, 0.5, 0], mobile: [0, -6.5, 0] },
    side: "right",
    nav: true,
  },
  {
    id: "projects",
    label: "Projects",
    landmark: "telescope",
    anchor: [16, 4, -165],
    cam: { desktop: [-4.5, -1, 17], mobile: [0, -0.5, 24] },
    look: { desktop: [-4.5, -1.5, 0], mobile: [0, -7, 0] },
    side: "left",
    nav: true,
  },
  {
    id: "skills",
    label: "Skills",
    landmark: "monitor",
    anchor: [-15, 1, -220],
    cam: { desktop: [4.5, 0.5, 16], mobile: [0, 1, 23] },
    look: { desktop: [4.5, -0.5, 0], mobile: [0, -6.5, 0] },
    side: "right",
    nav: true,
  },
  {
    id: "community",
    label: "Community",
    landmark: "houseplant",
    anchor: [15, -4, -275],
    cam: { desktop: [-4.5, 2, 16], mobile: [0, 2, 23] },
    look: { desktop: [-4.5, 1, 0], mobile: [0, -5.5, 0] },
    side: "left",
    nav: true,
  },
  {
    id: "education",
    label: "Education",
    landmark: "planet",
    anchor: [-19, 3, -330],
    cam: { desktop: [7, -1, 20], mobile: [1, -1, 28] },
    look: { desktop: [6, -1.5, 0], mobile: [0, -8, 0] },
    side: "right",
    nav: true,
  },
  {
    id: "contact",
    label: "Contact",
    landmark: "links",
    anchor: [0, -1, -388],
    cam: { desktop: [0, 0.5, 15], mobile: [0, 1, 17] },
    look: { desktop: [0, -3.2, 0], mobile: [0, -6, 0] },
    side: "center",
    align: "end",
    nav: true,
  },
];

export const navStations = stations.filter((s) => s.nav);

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Absolute camera positions + look-at targets for one breakpoint. */
export function flightPath(mobile) {
  const key = mobile ? "mobile" : "desktop";
  return {
    positions: stations.map((s) => add(s.anchor, s.cam[key])),
    targets: stations.map((s) => add(s.anchor, s.look[key])),
  };
}
