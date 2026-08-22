"use client";

import { useEffect } from "react";

export function HeadingMotion() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const enhanceHeading = (heading: HTMLElement) => {
      if (heading.dataset.lettersEnhanced === "true") return;
      heading.dataset.lettersEnhanced = "true";
      heading.setAttribute("aria-label", heading.textContent ?? "");

      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

      textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        for (const character of textNode.data) {
          if (/\s/.test(character)) {
            fragment.append(character);
          } else {
            const letter = document.createElement("span");
            letter.className = "heading-letter";
            letter.setAttribute("aria-hidden", "true");
            letter.textContent = character;
            fragment.append(letter);
          }
        }
        textNode.replaceWith(fragment);
      });
    };

    const enhanceAllHeadings = () => {
      document.querySelectorAll("h1, h2").forEach((heading) => enhanceHeading(heading as HTMLElement));
    };

    enhanceAllHeadings();
    const observer = new MutationObserver(enhanceAllHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    let activeHeading: HTMLElement | null = null;
    const clearWave = () => {
      activeHeading?.querySelectorAll(".heading-letter").forEach((letter) => {
        letter.classList.remove("wave-center", "wave-near", "wave-far");
      });
      activeHeading = null;
    };

    const moveWave = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const activeLetter = target?.closest(".heading-letter");
      const heading = activeLetter?.closest("h1, h2") as HTMLElement | null;
      if (!activeLetter || !heading) return clearWave();

      if (activeHeading !== heading) clearWave();
      activeHeading = heading;
      const letters = Array.from(heading.querySelectorAll(".heading-letter"));
      const activeIndex = letters.indexOf(activeLetter);
      letters.forEach((letter, index) => {
        const distance = Math.abs(index - activeIndex);
        letter.classList.toggle("wave-center", distance === 0);
        letter.classList.toggle("wave-near", distance === 1);
        letter.classList.toggle("wave-far", distance === 2);
      });
    };

    document.addEventListener("pointermove", moveWave, { passive: true });
    document.addEventListener("pointerleave", clearWave);

    return () => {
      observer.disconnect();
      clearWave();
      document.removeEventListener("pointermove", moveWave);
      document.removeEventListener("pointerleave", clearWave);
      document.querySelectorAll<HTMLElement>("h1[data-letters-enhanced], h2[data-letters-enhanced]").forEach((heading) => {
        heading.querySelectorAll(".heading-letter").forEach((letter) => letter.replaceWith(letter.textContent ?? ""));
        heading.normalize();
        heading.removeAttribute("aria-label");
        delete heading.dataset.lettersEnhanced;
      });
    };
  }, []);

  return null;
}
