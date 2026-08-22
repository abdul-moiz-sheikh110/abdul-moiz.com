"use client";

import { useEffect } from "react";

export function HeadingMotion() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let activeHeading: HTMLElement | null = null;
    const resetHeading = () => {
      if (!activeHeading) return;
      activeHeading.classList.remove("is-heading-active");
      activeHeading.style.removeProperty("--heading-rotate-x");
      activeHeading.style.removeProperty("--heading-rotate-y");
      activeHeading = null;
    };
    const moveHeading = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const heading = target?.closest("h1, h2") as HTMLElement | null;
      if (!heading) return resetHeading();
      if (activeHeading !== heading) {
        resetHeading();
        activeHeading = heading;
        heading.classList.add("is-heading-active");
      }
      const bounds = heading.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      heading.style.setProperty("--heading-rotate-x", `${(-y * 2.4).toFixed(2)}deg`);
      heading.style.setProperty("--heading-rotate-y", `${(x * 3.2).toFixed(2)}deg`);
    };
    document.addEventListener("pointermove", moveHeading, { passive: true });
    document.addEventListener("pointerleave", resetHeading);
    return () => {
      resetHeading();
      document.removeEventListener("pointermove", moveHeading);
      document.removeEventListener("pointerleave", resetHeading);
    };
  }, []);
  return null;
}
