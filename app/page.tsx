import { ContactCTA } from "./components/ContactCTA";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { projects } from "./data/projects";
import { services } from "./data/services";

const selectedProjects = projects.filter((project) =>
  ["crest-view-academy", "teleco-solutions", "school-lms"].includes(project.slug),
);

const deliverySteps = [
  ["01", "Understand the need", "We start with the goals, the people using the work, and the practical outcome that matters."],
  ["02", "Plan together", "We set a clear scope and make the next steps easy to follow."],
  ["03", "Build with specialists", "The right people contribute to design, development, security, search, or visual work."],
  ["04", "Review and deliver", "We test the work, review the details, and prepare it for confident use."],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero shell" id="top">
        <p className="eyebrow"><span /> Portfolio · Team-led delivery</p>
        <h1>Abdul<br />Moiz<span className="accent-dot">.</span></h1>
        <div className="hero-bottom">
          <div>
            <p className="hero-role">Team Lead for websites, software, security, search, and design.</p>
            <p className="hero-summary">I lead a collaborative digital team. Together, we turn clear requirements into useful work that is built, checked, and ready to use.</p>
          </div>
          <a className="circle-link" href="/projects" aria-label="View Abdul Moiz projects">↓</a>
        </div>
      </section>

      <section className="services shell" aria-labelledby="capabilities-heading">
        <div className="section-head light"><p>Core capabilities</p><span>Practical digital delivery</span></div>
        <div className="services-intro">
          <h2 id="capabilities-heading">One coordinated team<br />for the <em>work ahead.</em></h2>
          <p>
            We bring the right skills together for each project, keeping the work clear,
            practical, and ready for the next stage of your business.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article key={service.title}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-list shell" aria-labelledby="delivery-process-heading">
        <div className="section-head"><p>How we deliver</p><span>Clear work, shared ownership</span></div>
        <div>
          <h2 id="delivery-process-heading">A useful process<br />from start to finish.</h2>
          {deliverySteps.map(([number, title, summary]) => (
            <article key={title}>
              <span>{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work shell" id="work" aria-labelledby="selected-work-heading">
        <div className="section-head"><p id="selected-work-heading">Selected projects</p><a href="/projects">View all projects</a></div>
        <p className="summary">A focused selection of website and custom system work. Every project uses shared planning, specialist work, testing, and quality review.</p>
        <div className="projects-list">
          {selectedProjects.map((project, index) => (
            <article className={`project-preview project-${project.visual}`} key={project.slug}>
              <div>
                <p className="case-count">0{index + 1} / 03</p>
                <p className="tag">{project.category}</p>
                <h2>{project.title}</h2>
                <p className="summary">{project.description}</p>
                <ul>
                  {project.capabilities
                    .filter((capability) => !/marketing/i.test(capability))
                    .map((capability) => <li key={capability}>{capability}</li>)}
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
          <h2 id="team-delivery-heading">Abdul Moiz leads.<br />Specialists deliver.</h2>
          <p>
            Abdul stays involved from the first requirement to the final quality review.
            The team brings focused skills to each stage, so the finished work is useful,
            checked, and ready to use.
          </p>
          <div className="team-chips"><span>Shared planning</span><span>Specialist work</span><span>Testing</span><span>Quality review</span></div>
        </div>
        <div className="team-aside"><span>Working together</span><strong>One team.<br />Clear work.<br />Useful outcomes.</strong></div>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
