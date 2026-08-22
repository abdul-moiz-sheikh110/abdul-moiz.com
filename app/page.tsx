import { ContactCTA } from "./components/ContactCTA";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { projects } from "./data/projects";
import { services } from "./data/services";

const selectedProjects = projects.filter((project) =>
  ["crest-view-academy", "teleco-solutions", "school-lms"].includes(project.slug),
);

const deliverySteps = [
  ["01", "Understand the need", "We begin by understanding the goals, users, requirements, and practical outcome expected from the project."],
  ["02", "Plan together", "We define the scope, responsibilities, and next steps so everyone understands how the project will move forward."],
  ["03", "Build with specialists", "The relevant team members contribute to development, design, cybersecurity, SEO, or visual work while following one shared direction."],
  ["04", "Review and deliver", "We test the work, review important details, complete the necessary refinements, and prepare everything for delivery."],
];

const homeServices = [
  ["01", "Web development", "Clear and responsive websites designed around your business, audience, and goals."],
  ["02", "Custom software development", "Purpose built portals, dashboards, and software tools that support real business processes and everyday work."],
  ["03", "Cybersecurity", "Practical security reviews and improvements that help protect websites, systems, accounts, and business information."],
  ["04", "SEO", "Website, technical, and content improvements that help the right audience discover your business through search."],
  ["05", "Logo design", "Distinct and professional logo concepts shaped around the identity, purpose, and character of your business."],
  ["06", "Graphic design", "Clear and consistent visual material for websites, marketing campaigns, social media, presentations, and business communication."],
];

const selectedProjectCopy: Record<string, { description: string; capabilities: string[] }> = {
  "crest-view-academy": {
    description: "A warm and informative school website created to help parents understand the academy’s programmes, values, and admissions process.",
    capabilities: ["Responsive website design", "Programme and admissions information", "Mobile friendly enquiry process"],
  },
  "teleco-solutions": {
    description: "A structured corporate website for an ICT provider, presenting its connectivity, infrastructure, software, cloud, and managed services clearly.",
    capabilities: ["Organised service catalogue", "Professional corporate presentation", "Clear customer enquiry points"],
  },
  "school-lms": {
    description: "A central administration system designed to help schools manage everyday operations through one organised dashboard.",
    capabilities: ["Students, staff, and attendance", "Fees, examinations, and timetables", "User roles, permissions, and reports"],
  },
};

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero shell" id="top">
        <p className="eyebrow"><span /> Portfolio · Team-led delivery</p>
        <h1>Abdul Moiz<span className="accent-dot">.</span></h1>
        <div className="hero-bottom">
          <div className="home-hero-copy">
            <p className="hero-role">Websites, software, security, search, and design, delivered by one coordinated team.</p>
            <p className="hero-summary">I work with a collaborative digital team bringing together skills across web development, custom software, cybersecurity, SEO, logo design, and graphic design. We take time to understand each requirement, plan the work clearly, and review every stage together. This keeps the project consistent from the first discussion to final delivery and results in work that is practical, carefully checked, and ready to use.</p>
          </div>
          <a className="hero-project-link" href="/projects">View Our Projects</a>
        </div>
      </section>

      <section className="service-marquee" aria-label="Services we provide">
        <div className="service-track">
          {[false, true].map((duplicate) => (
            <div className="service-marquee-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {services.map((service) => (
                <span key={service.title}>{service.title}<i aria-hidden="true">•</i></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="services shell" aria-labelledby="capabilities-heading">
        <div className="section-head light"><p>Core capabilities</p><span>Practical digital delivery</span></div>
        <div className="services-intro">
          <h2 id="capabilities-heading"><span className="heading-line">One coordinated team</span><br /><span className="heading-line">for the <em>work ahead.</em></span></h2>
          <p>
            We bring the right skills together for each project. Every service is connected through shared planning,
            clear communication, and a consistent understanding of what the work needs to achieve.
          </p>
        </div>
        <div className="service-list">
          {homeServices.map(([number, title, summary]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{summary}</p>
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
                <h3>{title}</h3>
                <p>{summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work shell" id="work" aria-labelledby="selected-work-heading">
        <div className="section-head"><p id="selected-work-heading">Selected projects</p><a href="/projects">View all projects</a></div>
        <p className="summary">A focused selection of website and custom software work completed through shared planning, specialist contribution, testing, and team review.</p>
        <div className="projects-list">
          {selectedProjects.map((project, index) => (
            <article className={`project-preview project-${project.visual}`} key={project.slug}>
              <div>
                <p className="case-count">0{index + 1} / 03</p>
                <p className="tag">{project.category}</p>
                <h2>{project.title}</h2>
                <p className="summary">{selectedProjectCopy[project.slug].description}</p>
                <ul>
                  {selectedProjectCopy[project.slug].capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
                {project.href ? (
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View live website <span aria-hidden="true">↗</span></a>
                ) : (
                  <a className="text-link" href="/#contact">Discuss a similar system <span aria-hidden="true">↗</span></a>
                )}
              </div>
              {project.image ? (
                <div className={`case-visual ${project.visual}-mock project-image-preview`}>
                  <div className="browser-frame">
                    <div className="browser-top"><i /><i /><i /><small>{project.href ? project.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "") : "School LMS dashboard"}</small></div>
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
            Abdul Moiz stays involved from the first discussion to the final quality review. The team contributes
            focused knowledge at each stage, keeping the project coordinated, carefully checked, and aligned with
            its intended purpose.
          </p>
          <div className="team-chips"><span>Shared planning</span><span>Specialist work</span><span>Testing</span><span>Quality review</span></div>
        </div>
        <div className="team-aside">
          <span>Working together</span>
          <strong>One team.<br />Clear work.<br />Useful outcomes.</strong>
          <p>We combine focused skills with one shared project direction, giving clients a clear experience from the first requirement to final delivery.</p>
        </div>
      </section>

      <ContactCTA
        description="Tell me what you need, what the finished work should achieve, and any important requirements. I will review the project with the team and respond with a clear next step."
        linkLabel="Discuss Your Project"
      />
      <SiteFooter />
    </main>
  );
}
