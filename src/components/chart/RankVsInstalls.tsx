"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import type { Content } from "@/content";
import { EASE } from "@/components/motion/variants";
import {
  DAY_COUNT,
  INSTALL_TICKS,
  ORGANIC_RANK,
  PAID_INSTALLS,
  PINS,
  RANK_TICKS,
  dayLabel,
  geometry,
  rankPath,
} from "./data";

const G = geometry({
  width: 920,
  height: 320,
  left: 58,
  right: 62,
  top: 30,
  bottom: 34,
  maxBarWidth: 18,
});

type Props = { copy: Content["proof"]; locale: string };

export function RankVsInstalls({ copy, locale }: Props) {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  // One observer for the whole chart. Driving the bars off a variant label on
  // a wrapping <g> looked tidier but did not propagate reliably — the bars
  // stayed at scaleY:0 while the line drew.
  const inView = useInView(hostRef, { once: true, margin: "-20% 0px" });

  const onMove = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * G.width;
    const i = Math.round((px - G.left) / G.slot - 0.5);
    setHover(Math.min(DAY_COUNT - 1, Math.max(0, i)));
  }, []);

  // tooltip is positioned in CSS pixels, so scale the SVG coords back down
  const scale = () => {
    const svg = svgRef.current;
    return svg ? svg.getBoundingClientRect().width / G.width : 1;
  };

  let tipLeft = 0;
  let tipTop = 0;
  if (hover !== null && svgRef.current) {
    const s = scale();
    const w = svgRef.current.getBoundingClientRect().width;
    tipLeft = G.x(hover) * s + 16;
    if (tipLeft + 190 > w) tipLeft = G.x(hover) * s - 190;
    tipLeft = Math.max(6, tipLeft);
    tipTop = G.yRank(ORGANIC_RANK[hover]) * s;
  }

  return (
    <div
      ref={hostRef}
      className="relative px-1.5 pt-2 pb-1 overflow-x-auto [overscroll-behavior-x:contain]"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${G.width} ${G.height}`}
        role="img"
        aria-label={copy.chartAria}
        className="block w-full min-w-[640px] h-auto"
      >
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {/* installs grid + left ticks */}
        {INSTALL_TICKS.map((v) => {
          const y = G.yPaid(v);
          return (
            <g key={`i${v}`}>
              <line
                x1={G.left}
                x2={G.width - G.right}
                y1={y}
                y2={y}
                stroke="var(--line)"
                strokeWidth="1"
                strokeOpacity={v === 0 ? 0.9 : 0.38}
              />
              <text
                x={G.left - 12}
                y={y + 4}
                textAnchor="end"
                fill="var(--tx-4)"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* rank ticks, inverted */}
        {RANK_TICKS.map((r) => (
          <text
            key={`r${r}`}
            x={G.width - G.right + 12}
            y={G.yRank(r) + 4}
            textAnchor="start"
            fill="var(--tx-4)"
            fontSize="10.5"
            fontFamily="var(--font-mono)"
          >
            #{r}
          </text>
        ))}

        <text
          x={6}
          y={G.top - 12}
          textAnchor="start"
          fill="var(--tx-4)"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
        >
          {copy.axisInstalls}
        </text>
        <text
          x={G.width - 6}
          y={G.top - 12}
          textAnchor="end"
          fill="var(--tx-4)"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
        >
          {copy.axisRank}
        </text>

        {/* bars */}
        <g>
          {PAID_INSTALLS.map((v, i) => {
            if (v <= 0) return null;
            const y = G.yPaid(v);
            return (
              <m.rect
                key={i}
                x={G.x(i) - G.barWidth / 2}
                y={y}
                width={G.barWidth}
                height={Math.max(G.top + G.innerH - y, 1)}
                rx={3}
                fill="url(#barGrad)"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                initial={reduce ? { opacity: 0 } : { scaleY: 0 }}
                animate={
                  inView
                    ? { scaleY: 1, opacity: 1 }
                    : reduce
                      ? { opacity: 0 }
                      : { scaleY: 0 }
                }
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 140, damping: 18, delay: i * 0.022 }
                }
              />
            );
          })}
        </g>

        {/* organic rank line — draws after the bars have taken shape */}
        <m.path
          d={rankPath(G)}
          fill="none"
          stroke="var(--rank)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: reduce ? 1 : 0, opacity: reduce ? 0 : 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 1.4, delay: 0.35, ease: EASE }
          }
        />

        <m.circle
          cx={G.x(DAY_COUNT - 1)}
          cy={G.yRank(ORGANIC_RANK[DAY_COUNT - 1])}
          r="4"
          fill="var(--rank)"
          stroke="var(--surface)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={reduce ? { duration: 0.01 } : { delay: 1.6, duration: 0.4 }}
        />

        {/* pinned events */}
        {PINS.map((p) => (
          <m.g
            key={p.index}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={reduce ? { duration: 0.01 } : { delay: 1.5, duration: 0.5 }}
          >
            <line
              x1={G.x(p.index)}
              x2={G.x(p.index)}
              y1={G.top + 2}
              y2={G.top + G.innerH}
              stroke="var(--tx-4)"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
            />
            <circle cx={G.x(p.index)} cy={G.top + 2} r="3" fill="var(--tx-3)" />
            <text
              x={p.align === "end" ? G.x(p.index) - 8 : G.x(p.index) + 8}
              y={G.top - 2}
              textAnchor={p.align}
              fill="var(--tx-3)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.5"
            >
              {copy[p.key]}
            </text>
          </m.g>
        ))}

        {/* x labels */}
        {[0, 6, 12, 18, 24, 29].map((i) => (
          <text
            key={`x${i}`}
            x={G.x(i)}
            y={G.height - 12}
            textAnchor="middle"
            fill="var(--tx-4)"
            fontSize="10.5"
            fontFamily="var(--font-mono)"
          >
            {dayLabel(i, locale)}
          </text>
        ))}

        {/* crosshair + hit area */}
        {hover !== null && (
          <line
            x1={G.x(hover)}
            x2={G.x(hover)}
            y1={G.top}
            y2={G.top + G.innerH}
            stroke="var(--tx-3)"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
        )}
        <rect
          x={G.left}
          y={G.top}
          width={G.innerW}
          height={G.innerH}
          fill="transparent"
          className="cursor-crosshair"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        />
      </svg>

      {/* tooltip, dressed like the one in the product */}
      <div
        aria-hidden="true"
        style={{ left: tipLeft, top: tipTop }}
        className={
          "absolute pointer-events-none min-w-[172px] rounded-md border border-line " +
          "bg-tooltip px-[11px] py-[9px] shadow-[var(--shadow)] z-[3] " +
          "transition-[opacity,transform] duration-[120ms] " +
          (hover !== null ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[3px]")
        }
      >
        {hover !== null && (
          <>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-tx-4">
              {dayLabel(hover, locale)}
            </div>
            <div className="flex justify-between gap-[18px] mt-1.5 text-xs text-tx-2">
              <span>{copy.tipPaid}</span>
              <b className="font-mono font-medium text-tx tnum">
                {PAID_INSTALLS[hover]}
              </b>
            </div>
            <div className="flex justify-between gap-[18px] mt-1.5 text-xs text-tx-2">
              <span>{copy.tipRank}</span>
              <b className="font-mono font-medium text-tx tnum">
                #{ORGANIC_RANK[hover]}
              </b>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
