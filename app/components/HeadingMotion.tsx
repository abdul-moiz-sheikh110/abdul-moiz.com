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

    return () => {
      observer.disconnect();
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
