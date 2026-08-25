import type { JSX } from "react";

import { contactHref } from "../data/contact";

type ContactCTAProps = {
  description?: string;
  linkLabel?: string;
};

export function ContactCTA({
  description = "Send your project details by email and receive a clear next step.",
  linkLabel = "Email Abdul Moiz",
}: ContactCTAProps = {}): JSX.Element {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow invert"><span /> Have a project in mind?</p>
        <h2>Let&apos;s build something<br /><em>useful.</em></h2>
        <p>{description}</p>
        <a href={contactHref}>
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
