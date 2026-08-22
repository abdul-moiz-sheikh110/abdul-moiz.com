import type { JSX } from "react";

export function ContactCTA(): JSX.Element {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow invert"><span /> Have a project in mind?</p>
        <h2>Let&apos;s build something<br /><em>useful.</em></h2>
        <p>Tell Abdul Moiz what you need, and receive a clear next step for your Fiverr project.</p>
        <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer">
          Start a Fiverr conversation <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
