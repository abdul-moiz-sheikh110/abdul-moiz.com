import type { Metadata } from "next";

import { ContactCTA } from "../components/ContactCTA";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "About Abdul Moiz",
  description:
    "Meet Abdul Moiz, the Team Lead behind a collaborative group delivering web development, custom software development, cybersecurity, SEO, logo design, and graphic design.",
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
      <SiteHeader />

      <section className="hero page-hero shell" aria-labelledby="about-title">
        <p className="eyebrow"><span /> About Abdul Moiz</p>
        <h1 id="about-title">A team built around<br />useful <em>outcomes.</em></h1>
        <div className="hero-bottom">
          <p>
            I am Abdul Moiz, Team Lead of a collaborative digital team. I understand every service we offer and how
            each part contributes to the complete project. I guide the work from planning to final review, while the
            team works together throughout delivery.
          </p>
        </div>
      </section>

      <section className="about-grid professional-background shell" aria-labelledby="how-we-work-heading">
        <div>
          <p className="tag">How we work</p>
          <h2 id="how-we-work-heading">One clear direction,<br />connected delivery.</h2>
        </div>
        <div>
          <p>
            Every project is a combined team effort. We plan the direction together, bring the right knowledge into
            each stage, and review the work as one team. Abdul Moiz keeps every part aligned, clear, and ready for
            delivery.
          </p>
        </div>
      </section>

      <section className="about-grid shell" aria-labelledby="shared-responsibility-heading">
        <div>
          <p className="tag">Shared responsibility</p>
          <h2 id="shared-responsibility-heading">Every project is a combined effort.</h2>
        </div>
        <div>
          <p>
            We plan, build, check, and refine work as a team. When it helps the project, the right specialist may join
            a discussion, while the public work remains focused on the outcome rather than individual profiles.
          </p>
          <p>
            This gives each project the benefit of focused knowledge without losing the shared view of what the work
            needs to achieve.
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
        <div className="section-head"><p id="working-method-heading">Working method</p><span>Four practical steps</span></div>
        <div>
          {approach.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h2>{title}</h2>
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
            Abdul Moiz and the team review progress throughout the work, then carry out a final quality review before
            delivery. We look for a result that is clear, useful, and ready for its next step.
          </p>
        </div>
        <div className="team-aside"><span>What guides the work</span><strong>Shared planning.<br />Focused knowledge.<br />Useful results.</strong></div>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
