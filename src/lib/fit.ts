/**
 * Font size (in vw) that lets a stepped, uppercase display title fill a
 * measure without overflowing. 0.68em is the average cap advance of Inter
 * Tight Semibold at -0.058em tracking; each stepped line adds 0.8em × run.
 */
export function fitVw(lines: readonly string[], measureVw: number, maxVw: number) {
  const widest = Math.max(...lines.map((l, i) => l.length * 0.68 + i * 0.8 * 0.5685));
  return Math.min(maxVw, measureVw / widest);
}
