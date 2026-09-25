/**
 * The AA mark, traced from the master artwork (ARMAN 4.jpg, 6250px) and
 * verified against it to within anti-aliasing (<0.5% pixel mismatch).
 *
 * Coordinates live in a 4026 × 1919 box. Every angle used across the site
 * (masks, wipes, chamfers) is derived from these shapes.
 */

export const MARK_W = 4026;
export const MARK_H = 1919;

/** Left A, including its open counter. */
export const MARK_LEFT =
  "M1091 0H1635L1942 552L1675 1032L1364 433L1031 1120H1627L911 1476L732 1919H0Z";

/** The central wedge, the shape both letters share. */
export const MARK_WEDGE = "M2019 660L2721 1919H2138L1925 1490L1318 1919Z";

/** Right A. */
export const MARK_RIGHT =
  "M2404 0H2954L4026 1919H3293L3115 1476L2399 1120H2995L2686 433L2351 1032L2085 554Z";

export const MARK_PATH = `${MARK_LEFT}${MARK_WEDGE}${MARK_RIGHT}`;

/**
 * Centre of the largest circle that fits inside the wedge. Zooming the
 * mark from here guarantees the wedge floods the frame first.
 */
export const WEDGE_CORE = { x: 2019, y: 1235, r: 275 };

/**
 * The outer stroke of the A rises at ~60.4° (1919 / 1091). The run of
 * that diagonal per unit of height is used for every chamfer and wipe.
 */
export const A_SLOPE_RUN = 1091 / 1919; // ≈ 0.5685
