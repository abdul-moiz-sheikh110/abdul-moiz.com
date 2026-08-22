import type { Metadata } from "next";

import { ContactCTA } from "../components/ContactCTA";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About Abdul Moiz | Digital Solutions & Team",
  description:
    "Learn how Abdul Moiz coordinates web development, cybersecurity, SEO, and custom systems with a capable delivery team.",
};

const capabilities = [
  ["Web development", "Websites and digital experiences shaped around clear business needs."],
  ["Cybersecurity", "Security-focused thinking for web projects and the systems that support them."],
  ["SEO", "Search-aware website foundations that help content stay clear and discoverable."],
  ["Custom systems", "Dashboards, portals, and management tools designed for everyday work."],
];

const approach = [
  ["01", "Understand the brief", "Start with goals, audiences, constraints, and the work the project needs to support."],
  ["02", "Shape the scope", "Turn the brief into clear priorities, practical deliverables, and an agreed direction."],
  ["03", "Coordinate delivery", "Bring in the right team support for design, development, quality assurance, and technical work."],
  ["04", "Keep communication clear", "Share progress, gather feedback, and keep the next decision easy to understand."],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <section className="hero page-hero shell" aria-labelledby="about-title">
        <p className="eyebrow"><span /> About Abdul Moiz</p>
        <h1 id="about-title">A practical partner<br />for <em>digital work.</em></h1>
        <div className="hero-bottom">
          <p>
            Abdul Moiz is the direct point of contact for website projects, cybersecurity,
            SEO, and custom systems, with team support matched to the needs of each project.
          </p>
        </div>
      </section>

      <section className="about-grid shell" aria-labelledby="professional-focus-heading">
        <div>
          <p className="tag">Professional focus</p>
          <h2 id="professional-focus-heading">Clear digital direction, coordinated delivery.</h2>
        </div>
        <div>
          <p>
            The focus is on helping clients move from a defined need to useful digital work.
            Abdul coordinates the conversation, clarifies the priorities, and brings together
            the relevant skills for the scope.
          </p>
          <p>
            This approach keeps the client relationship personal while making room for the
            broader expertise a website, security review, SEO foundation, or custom system may need.
          </p>
        </div>
      </section>

      <section className="services about-capabilities" aria-labelledby="skills-heading">
        <div className="shell">
          <div className="section-head light"><p>Skills and capabilities</p><span>Practical digital delivery</span></div>
          <h2 id="skills-heading">Capability where<br />the work <em>needs it.</em></h2>
          <div className="capability-grid">
            {capabilities.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-list shell" aria-labelledby="working-approach-heading">
        <div className="section-head"><p id="working-approach-heading">Working approach</p><span>Four practical steps</span></div>
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

      <section className="team shell" aria-labelledby="team-capabilities-heading">
        <div className="team-card">
          <p className="tag">Team capabilities</p>
          <h2 id="team-capabilities-heading">One conversation.<br />The right support.</h2>
          <p>
            Abdul keeps ownership of the client conversation. When the work calls for wider
            input, the delivery team supports the project with design, development, quality assurance,
            and technical delivery.
          </p>
          <div className="team-chips"><span>Design</span><span>Development</span><span>Quality assurance</span><span>Technical support</span></div>
        </div>
        <div className="team-aside"><span>How the team works</span><strong>Clear roles.<br />Useful collaboration.<br />A focused result.</strong></div>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
