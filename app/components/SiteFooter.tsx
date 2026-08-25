import type { JSX } from "react";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="footer shell">
      <a className="brand" href="/" aria-label="Abdul Moiz portfolio home">
        <span className="brand-mark">AM</span>
        <span>Abdul Moiz</span>
      </a>
      <p>Digital services led by Abdul Moiz and delivered through a collaborative team.</p>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
      </div>
    </footer>
  );
}
