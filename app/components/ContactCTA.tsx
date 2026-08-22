import type { JSX } from "react";

type ContactCTAProps = {
  description?: string;
  linkLabel?: string;
};

export function ContactCTA({
  description = "Join us through Fiverr.",
  linkLabel = "Start a Fiverr conversation",
}: ContactCTAProps = {}): JSX.Element {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow invert"><span /> Have a project in mind?</p>
        <h2>Let&apos;s build something<br /><em>useful.</em></h2>
        <p>{description}</p>
        <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer">
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
