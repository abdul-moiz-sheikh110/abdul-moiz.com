import { ContactCTA } from "./components/ContactCTA";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { projects } from "./data/projects";

const capabilities = [
  ["01", "Web development", "Professional websites and digital experiences shaped around clear business needs."],
  ["02", "Cybersecurity", "Security-focused thinking for web projects and the systems that support them."],
  ["03", "SEO", "Search-aware website foundations that help content stay clear and discoverable."],
  ["04", "Custom systems", "Purpose-built dashboards, portals, and management tools for everyday work."],
  ["05", "Team delivery", "A coordinated team brings the right mix of design, development, and technical support."],
];

const selectedProjects = projects.filter((project) =>
  ["crest-view-academy", "teleco-solutions", "school-lms"].includes(project.slug),
);

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero shell" id="top">
        <p className="eyebrow"><span /> Abdul Moiz, digital solutions specialist</p>
        <h1>Focused digital work<br />with a capable <em>team.</em></h1>
        <div className="hero-bottom">
          <p>
            Abdul Moiz is your direct point of contact for web development, cybersecurity,
            SEO, and custom systems, supported by a team built for thoughtful delivery.
          </p>
          <a className="circle-link" href="/projects" aria-label="View Abdul Moiz projects">↓</a>
        </div>
      </section>

      <section className="services shell" aria-labelledby="capabilities-heading">
        <div className="section-head light"><p>Core capabilities</p><span>Practical digital delivery</span></div>
        <div className="services-intro">
          <h2 id="capabilities-heading">The right focus<br />for the <em>work ahead.</em></h2>
          <p>
            Each engagement is shaped around the work you need, with Abdul coordinating
            the process and the delivery team contributing where their skills add value.
          </p>
        </div>
        <div className="service-list">
          {capabilities.map(([number, title, description]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work shell" id="work" aria-labelledby="selected-work-heading">
        <div className="section-head"><p id="selected-work-heading">Selected projects</p><a href="/projects">View all projects</a></div>
        <p className="summary">A focused selection of website and custom system work, with each project represented from the shared portfolio archive.</p>
        <div className="projects-list">
          {selectedProjects.map((project, index) => (
            <article className={`project-preview project-${project.visual}`} key={project.slug}>
              <div>
                <p className="case-count">0{index + 1} / 03</p>
                <p className="tag">{project.category}</p>
                <h2>{project.title}</h2>
                <p className="summary">{project.description}</p>
                <ul>
                  {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
                {project.href ? (
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View live website <span aria-hidden="true">↗</span></a>
                ) : (
                  <a className="text-link" href="/#contact">Discuss a similar system <span aria-hidden="true">↗</span></a>
                )}
              </div>
              {project.image ? (
                <div className="case-visual lms-mock">
                  <div className="browser-frame">
                    <div className="browser-top"><i /><i /><i /><small>School LMS dashboard</small></div>
                    <img src={project.image} alt={project.imageAlt} />
                  </div>
                </div>
              ) : (
                <div className={`case-visual ${project.visual}-mock`} aria-label={`Preview of ${project.title}`}>
                  <div className="browser-frame">
                    <div className="browser-top"><i /><i /><i /><small>{project.href?.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}</small></div>
                    <div className="project-browser-copy"><p>{project.category}</p><strong>{project.title}</strong></div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <a className="text-link" href="/projects">Explore the complete project archive <span aria-hidden="true">↗</span></a>
      </section>

      <section className="team shell" aria-labelledby="team-delivery-heading">
        <div className="team-card">
          <p className="tag">Team delivery</p>
          <h2 id="team-delivery-heading">One point of contact.<br />A broader delivery team.</h2>
          <p>
            Abdul leads the conversation and keeps the work moving. When a project needs
            broader expertise, the team supports design, development, quality assurance,
            and technical delivery.
          </p>
          <div className="team-chips"><span>Design</span><span>Development</span><span>Cybersecurity</span><span>SEO</span></div>
        </div>
        <div className="team-aside"><span>Working together</span><strong>Clear scope.<br />Regular updates.<br />Useful outcomes.</strong></div>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
