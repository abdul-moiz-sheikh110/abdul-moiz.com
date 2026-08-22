"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const cursorParts = [ring, dot];
    root.classList.add("cursor-enhanced");

    const moveCursor = (event: PointerEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;

      for (const part of cursorParts) {
        part.style.setProperty("--cursor-x", x);
        part.style.setProperty("--cursor-y", y);
        part.classList.add("is-visible");
      }

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest("a, button, [data-cursor]"));
      ring.classList.toggle("is-active", isInteractive);
    };

    const hideCursor = () => {
      for (const part of cursorParts) part.classList.remove("is-visible");
      ring.classList.remove("is-active");
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerleave", hideCursor);

    return () => {
      root.classList.remove("cursor-enhanced");
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
