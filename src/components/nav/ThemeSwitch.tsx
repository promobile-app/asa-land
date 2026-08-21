"use client";

import { useEffect, useState } from "react";
import { activeTheme, applyTheme, type Theme } from "@/lib/theme";
import s from "./ThemeSwitch.module.css";

const box =
  "w-[34px] h-[34px] shrink-0 grid place-items-center rounded-sm border border-line " +
  "bg-transparent text-tx-3 cursor-pointer transition-colors duration-150 " +
  "hover:text-tx hover:border-brand-hi";

export function ThemeSwitch({ toLight, toDark }: { toLight: string; toDark: string }) {
  // Only the label needs JS — which icon is visible is decided in CSS, so the
  // button looks right before this ever runs.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(activeTheme());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setTheme(activeTheme());
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function toggle() {
    const next: Theme = activeTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  const label = theme === "light" ? toDark : toLight;

  return (
    <button type="button" onClick={toggle} className={box} aria-label={label} title={label}>
      <span className="grid">
        <Sun />
        <Moon />
      </span>
    </button>
  );
}

function Sun() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={`${s.icon} ${s.sun}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.6v2.1M12 19.3v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" />
    </svg>
  );
}

function Moon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${s.icon} ${s.moon}`}
      aria-hidden="true"
    >
      <path d="M20.2 14.6A8.6 8.6 0 1 1 9.4 3.8a6.9 6.9 0 0 0 10.8 10.8Z" />
    </svg>
  );
}
