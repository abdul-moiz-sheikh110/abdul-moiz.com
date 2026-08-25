import type { JSX } from "react";

import { contactHref } from "../data/contact";

type SiteHeaderProps = {
  currentPath: "/" | "/about" | "/projects";
};

export function SiteHeader({ currentPath }: SiteHeaderProps): JSX.Element {
  return (
    <header className="shell">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Abdul Moiz portfolio home">
          <span className="brand-mark">AM</span>
          <span>Abdul Moiz</span>
        </a>
        <div className="nav-links">
          <a href="/" aria-current={currentPath === "/" ? "page" : undefined}>Home</a>
          <a href="/about" aria-current={currentPath === "/about" ? "page" : undefined}>About</a>
          <a href="/projects" aria-current={currentPath === "/projects" ? "page" : undefined}>Projects</a>
          <a className="nav-cta" href={contactHref}>Contact</a>
        </div>
      </nav>
    </header>
  );
}
