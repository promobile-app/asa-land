"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Content, Tone } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import {
  ORGANIC_RANK,
  PAID_INSTALLS,
  geometry,
  rankPath,
} from "@/components/chart/data";
import s from "./MockDashboard.module.css";

const TONE_HEX: Record<Tone, string> = {
  brand: "#4262ff",
  purple: "#7987f5",
  ok: "#14ce77",
  sky: "#4bb7ff",
  warn: "#f2c329",
};

const MINI = geometry({
  width: 760,
  height: 248,
  left: 26,
  right: 30,
  top: 12,
  bottom: 16,
  maxBarWidth: 13,
});

/** The only markup the activity strings carry. */
function bold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <b key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </b>
    ) : (
      part
    ),
  );
}

export function MockDashboard({ copy }: { copy: Content["mock"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [kpis, setKpis] = useState(copy.kpis.map((k) => k.value));

  // Cover the hero at any viewport without stretching: scale a fixed
  // 1440x900 board rather than reflowing it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.parentElement;
    if (!host) return;

    const fit = () => {
      const r = host.getBoundingClientRect();
      el.style.setProperty(
        "--s",
        (Math.max(r.width / 1440, r.height / 900) * 1.02).toFixed(3),
      );
    };
    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // a slow drift on the numbers, so a still frame reads as live
  useEffect(() => {
    if (reduce) return;
    let tick = 0;
    const id = window.setInterval(() => {
      const i = tick % copy.kpis.length;
      tick += 1;
      setKpis((prev) => {
        const next = [...prev];
        next[i] = jitter(copy.kpis[i].value, tick);
        return next;
      });
    }, 2400);
    return () => window.clearInterval(id);
  }, [copy.kpis, reduce]);

  return (
    <div ref={ref} className={s.mock}>
      <aside className={s.side}>
        <div className={s.logo}>
          <Logo />
          promobile
        </div>
        <nav className={s.nav}>
          {copy.nav.map((item) => (
            <span key={item} className={item === copy.activeNav ? s.on : undefined}>
              {item}
            </span>
          ))}
        </nav>
      </aside>

      <div className={s.main}>
        <div className={s.top}>
          {copy.chips.map((chip) => (
            <span key={chip} className={s.chip}>
              {chip}
            </span>
          ))}
          <span className={s.launch}>{copy.launch}</span>
        </div>

        <div className={s.kpis}>
          {copy.kpis.map((k, i) => (
            <div key={k.label} className={s.kpi}>
              <div className={s.kpiLabel}>{k.label}</div>
              <div className={s.kpiValue}>{kpis[i]}</div>
              <div className={`${s.kpiDelta} ${k.dir === "up" ? s.up : s.down}`}>
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        <div className={s.body}>
          <div className={s.card}>
            <div className={s.cardHead}>
              {copy.chartTitle}
              <span className={s.cardTag}>{copy.chartTag}</span>
            </div>
            <MiniChart />
          </div>

          <div className={s.card}>
            <div className={s.cardHead}>
              {copy.activityTitle}
              <span className={s.cardTag}>{copy.activityTag}</span>
            </div>
            <div className={s.activity}>
              {copy.activity.map((a, i) => (
                <div key={i} className={s.actRow}>
                  <span
                    className={s.actDot}
                    style={{ background: TONE_HEX[a.tone] }}
                  />
                  <span>
                    <span className={s.actText}>{bold(a.text)}</span>
                    <span className={s.actMeta}>{a.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.card}>
          <div className={`${s.row} ${s.head}`}>
            {copy.tableHead.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {copy.rows.map((r, i) => (
            <div
              key={r.kw}
              className={`${s.row} ${s.dataRow}`}
              style={{ animationDelay: `${i * 1.6}s` }}
            >
              <span>{r.kw}</span>
              <span className={s.num}>{r.rank}</span>
              <span className={s.num}>{r.vol}</span>
              <span className={s.num}>{r.spend}</span>
              <span className={s.num}>{r.inst}</span>
              <span className={s.num}>{r.cpa}</span>
              <span
                className={`${s.badge} ${
                  r.tone === "on" ? s.on_ : r.tone === "pause" ? s.pause : s.rule
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniChart() {
  return (
    <svg
      viewBox={`0 0 ${MINI.width} ${MINI.height}`}
      className={s.miniChart}
      aria-hidden="true"
    >
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={MINI.left}
          x2={MINI.width - MINI.right}
          y1={MINI.top + MINI.innerH * f}
          y2={MINI.top + MINI.innerH * f}
          stroke="#393b42"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      ))}
      {PAID_INSTALLS.map((v, i) => {
        if (v <= 0) return null;
        const y = MINI.yPaid(v);
        return (
          <rect
            key={i}
            x={MINI.x(i) - MINI.barWidth / 2}
            y={y}
            width={MINI.barWidth}
            height={Math.max(MINI.top + MINI.innerH - y, 1)}
            rx={2}
            fill="#4262ff"
            fillOpacity="0.88"
          />
        );
      })}
      <path
        d={rankPath(MINI)}
        fill="none"
        stroke="#f2c329"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Nudges the trailing digits of a formatted value so the board looks live,
 * without touching the separators or the currency mark.
 */
function jitter(value: string, tick: number): string {
  return value.replace(/\d[\d  ,. ]*\d|\d/, (numeric) => {
    const digits = numeric.replace(/\D/g, "");
    if (!digits) return numeric;
    const base = Number(digits);
    const drift = Math.max(1, Math.round(base * 0.0012));
    const next = String(base + (tick % 2 ? drift : -drift)).padStart(
      digits.length,
      "0",
    );
    let k = 0;
    return numeric.replace(/\d/g, () => next[k++] ?? "0");
  });
}
