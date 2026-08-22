"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    if (!dot) return;

    root.classList.add("cursor-enhanced");

    const moveCursor = (event: PointerEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;

      dot.style.setProperty("--cursor-x", x);
      dot.style.setProperty("--cursor-y", y);
      dot.classList.add("is-visible");

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(target?.closest("a, button, [data-cursor]"));
      dot.classList.toggle("is-active", isInteractive);
    };

    const hideCursor = () => {
      dot.classList.remove("is-visible", "is-active");
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
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
