/**
 * One keyword, thirty days. The story the chart has to tell:
 *  - days 1-6   nothing paid; organic drifts around #50
 *  - day 7      campaign launches, paid ramps, organic starts climbing
 *  - day 20     paid spikes but organic stalls at #17 — cannibalisation
 *  - day 20     a rule cuts the bid; paid dips, organic keeps improving
 *
 * Replace with a real export from the demo account when one is available.
 */
export const PAID_INSTALLS = [
  0, 0, 0, 0, 0, 0, 12, 48, 96, 140, 168, 182, 190, 205, 240, 268, 286, 310,
  352, 404, 372, 340, 318, 330, 346, 358, 372, 390, 404, 418,
];

export const ORGANIC_RANK = [
  51, 50, 50, 49, 49, 48, 48, 45, 41, 37, 34, 31, 29, 27, 25, 23, 22, 21, 19,
  18, 17, 17, 16, 15, 14, 13, 12, 11, 10, 9,
];

export const DAY_COUNT = PAID_INSTALLS.length;

/** Events pinned to the metric line — feature 02, drawn rather than described. */
export const PINS = [
  { index: 6, key: "launched" as const, align: "start" as const },
  { index: 19, key: "ruleFired" as const, align: "end" as const },
];

export const PAID_MAX = 460;
export const RANK_TOP = 5;
export const RANK_BOTTOM = 56;

/** Grid values on the installs axis. */
export const INSTALL_TICKS = [0, 115, 230, 345, 460];
/** Grid values on the rank axis (inverted: #1 sits at the top). */
export const RANK_TICKS = [10, 20, 30, 40, 50];

const MONTH: Record<string, string> = { en: "Jul", ru: "июл", uk: "лип" };

export function dayLabel(index: number, locale: string) {
  const d = index + 1;
  return locale === "en"
    ? `${MONTH.en} ${d}`
    : `${d} ${MONTH[locale] ?? MONTH.en}`;
}

export type Geometry = ReturnType<typeof geometry>;

export function geometry(opts: {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  maxBarWidth: number;
}) {
  const { width, height, left, right, top, bottom, maxBarWidth } = opts;
  const innerW = width - left - right;
  const innerH = height - top - bottom;
  const slot = innerW / DAY_COUNT;

  return {
    width,
    height,
    left,
    right,
    top,
    bottom,
    innerW,
    innerH,
    slot,
    barWidth: Math.min(maxBarWidth, slot * 0.56),
    x: (i: number) => left + (i + 0.5) * slot,
    yPaid: (v: number) => top + innerH - (v / PAID_MAX) * innerH,
    yRank: (r: number) =>
      top + ((r - RANK_TOP) / (RANK_BOTTOM - RANK_TOP)) * innerH,
  };
}

export function rankPath(g: Geometry) {
  return ORGANIC_RANK.map(
    (r, i) => `${i ? "L" : "M"}${g.x(i).toFixed(1)} ${g.yRank(r).toFixed(1)}`,
  ).join(" ");
}
