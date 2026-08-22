import type { JSX } from "react";

export function SiteHeader(): JSX.Element {
  return (
    <header className="shell">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Abdul Moiz portfolio home">
          <span className="brand-mark">AM</span>
          <span>Abdul Moiz, Team Lead</span>
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a className="nav-cta" href="/#contact">Contact</a>
        </div>
      </nav>
    </header>
  );
}
