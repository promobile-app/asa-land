"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Content } from "@/content";
import { heroLoop } from "@/lib/links";
import { MockDashboard } from "./MockDashboard";
import s from "./Hero.module.css";

/**
 * The dimmed dashboard loop behind the headline.
 *
 * With a capture configured it plays the video. Without one — and for anybody
 * who asked for reduced motion — the rebuilt dashboard stands in at the same
 * crop and dimming, so the composition never changes shape.
 */
export function DashboardLoop({ copy }: { copy: Content["mock"] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const hasVideo = Boolean(heroLoop.mp4 || heroLoop.webm) && !reduce;

  // Stop decoding once the hero scrolls away — it is a background, not content.
  useEffect(() => {
    const video = videoRef.current;
    const host = hostRef.current;
    if (!video || !host) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [hasVideo]);

  return (
    <div ref={hostRef} className={s.media} aria-hidden="true">
      {hasVideo ? (
        <video
          ref={videoRef}
          className={s.video}
          poster={heroLoop.poster ?? undefined}
          muted
          loop
          playsInline
          preload="none"
        >
          {heroLoop.webm && <source src={heroLoop.webm} type="video/webm" />}
          {heroLoop.mp4 && <source src={heroLoop.mp4} type="video/mp4" />}
        </video>
      ) : (
        <MockDashboard copy={copy} />
      )}
    </div>
  );
}
