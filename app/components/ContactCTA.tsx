import type { JSX } from "react";

import { contactHref } from "../data/contact";

type ContactCTAProps = {
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function ContactCTA({
  description = "Send your project details by email and receive a clear next step.",
  href = contactHref,
  linkLabel = "Email Abdul Moiz",
}: ContactCTAProps = {}): JSX.Element {
  const opensNewTab = href.startsWith("https://");

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <div className="contact-copy">
          <p className="eyebrow invert"><span /> Have a project in mind?</p>
          <h2>Let&apos;s build something<br /><em>useful.</em></h2>
          <p>{description}</p>
          <a href={href} target={opensNewTab ? "_blank" : undefined} rel={opensNewTab ? "noreferrer" : undefined}>
            {linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-brand" aria-hidden="true">
          <span>Available for projects on</span>
          <img src="/fiverr-logo.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
