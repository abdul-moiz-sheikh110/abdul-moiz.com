import type { Metadata } from "next";

import { ContactCTA } from "../components/ContactCTA";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "About Abdul Moiz",
  description:
    "Learn how Abdul Moiz and a collaborative digital team deliver web development, custom software, cybersecurity, SEO, logo design, and graphic design.",
};

const approach = [
  ["01", "Understand the need", "We begin with the outcome the work needs to support and the priorities that will shape it."],
  ["02", "Plan together", "The team turns those priorities into a practical direction for the work ahead."],
  ["03", "Build with care", "Specialists contribute their knowledge where it is most useful, with the work connected from start to finish."],
  ["04", "Review and deliver", "We check the result together before delivery, so the final work is ready to use."],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader currentPath="/about" />

      <section className="hero page-hero shell" aria-labelledby="about-title">
        <p className="eyebrow"><span /> About Us</p>
        <h1 id="about-title">A team built around<br />useful <em>outcomes.</em></h1>
        <div className="hero-bottom">
          <div className="about-hero-copy">
            <p>
              I have a team working across websites, custom software, cybersecurity, SEO, logo design, and graphic
              design.
            </p>
            <p>
              We bring these skills together to understand each project clearly, establish a practical direction,
              and produce work that supports the client’s goals. Every contribution remains connected to the complete
              project and its intended outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="about-grid professional-background shell" aria-labelledby="how-we-work-heading">
        <div>
          <p className="tag">How we work</p>
          <h2 id="how-we-work-heading">One clear direction,<br /><span className="about-accent-line">connected delivery.</span></h2>
        </div>
        <div>
          <p>
            Every project begins with a shared understanding of what needs to be achieved. We plan the direction
            together, keep communication clear, and connect every stage of the work to the original requirements.
          </p>
          <p>
            The work is reviewed throughout the process so important details remain consistent and the final result
            is properly prepared for delivery.
          </p>
        </div>
      </section>

      <section className="about-grid shared-responsibility shell" aria-labelledby="shared-responsibility-heading">
        <div>
          <p className="tag">Shared responsibility</p>
          <h2 id="shared-responsibility-heading" aria-label="Every project is a combined effort.">Every project is a <span className="responsibility-accent">combined effort.</span></h2>
        </div>
        <div>
          <p>
            We work together from the first discussion to final delivery. Different skills and perspectives come
            into the project when needed, helping us make thoughtful decisions and keep every part of the work
            consistent.
          </p>
          <p>
            Because the project is planned and reviewed as a team, important details remain connected throughout the
            process. This results in work that feels complete, practical, and ready to use.
          </p>
        </div>
      </section>

      <section className="services about-capabilities" aria-labelledby="capabilities-heading">
        <div className="shell">
          <div className="section-head light"><p>Six connected capabilities</p><span>Practical digital delivery</span></div>
          <h2 id="capabilities-heading">The right knowledge<br />for the <em>work.</em></h2>
          <div className="capability-grid">
            {services.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-list shell" aria-labelledby="working-method-heading">
        <div className="section-head"><h2 id="working-method-heading">Working method</h2><span>Four practical steps</span></div>
        <div>
          {approach.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3 className="approach-step-title">{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team shell" aria-labelledby="quality-heading">
        <div className="team-card">
          <p className="tag">Quality at every stage</p>
          <h2 id="quality-heading">Careful work,<br />quality <em>review.</em></h2>
          <p>
            The team and I review progress throughout the work, then carry out a final quality review before
            delivery. We look for a result that is clear, useful, and ready for its next step.
          </p>
        </div>
        <div className="team-aside team-aside-guides">
          <div><span>What guides the work</span><strong>Shared planning.<br />Focused knowledge.<br />Useful results.</strong></div>
          <div className="team-guide-list" aria-label="Our delivery priorities">
            <span><b>01</b>Plan clearly</span>
            <span><b>02</b>Work together</span>
            <span><b>03</b>Review carefully</span>
            <span><b>04</b>Deliver usefully</span>
          </div>
        </div>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
