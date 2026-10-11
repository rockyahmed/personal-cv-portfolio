"use client";

import { useEffect } from "react";

/**
 * Page-wide, lightweight interaction layer:
 *  - cursor glow + per-card spotlight borders (CSS vars)
 *  - scroll progress bar
 *  - reveal-on-scroll for any element with the `.reveal` class
 */
export default function GlobalEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
        const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - r.left}px`);
          card.style.setProperty("--y", `${e.clientY - r.top}px`);
        }
      });
    };

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--progress", String(max > 0 ? root.scrollTop / max : 0));
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden />
      <div className="cursor-glow" aria-hidden />
    </>
  );
}
