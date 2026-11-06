"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen background video. Placeholder lives in /public/video —
 * replace hero.mp4 (and poster.jpg) with real footage, same file names.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="hero__media" aria-hidden>
      <video
        ref={ref}
        className="hero__video"
        src="/video/hero.mp4"
        poster="/video/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero__shade" />
      <div className="grain" />
    </div>
  );
}
