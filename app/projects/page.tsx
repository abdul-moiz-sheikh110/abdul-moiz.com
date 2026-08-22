import type { Metadata } from "next";

import { ContactCTA } from "../components/ContactCTA";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { projects, type Project } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects | Abdul Moiz",
  description:
    "Selected website and custom system work delivered by Abdul Moiz with team-supported digital expertise.",
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="case-visual lms-mock">
        <div className="browser-frame">
          <div className="browser-top"><i /><i /><i /><small>School LMS dashboard</small></div>
          <img src={project.image} alt={project.imageAlt} />
        </div>
      </div>
    );
  }

  return (
    <div className={`case-visual ${project.visual}-mock`} aria-label={`Preview of ${project.title}`}>
      <div className="browser-frame">
        <div className="browser-top"><i /><i /><i /><small>{project.href?.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}</small></div>
        <div className="project-browser-copy">
          <p>{project.category}</p>
          <strong>{project.title}</strong>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />

      <section className="hero page-hero shell" aria-labelledby="projects-title">
        <p className="eyebrow"><span /> Selected work</p>
        <h1 id="projects-title">Projects shaped<br />for <em>real needs.</em></h1>
        <div className="hero-bottom">
          <p>
            A selection of website and custom system work coordinated by Abdul Moiz
            with the support of a broader delivery team.
          </p>
        </div>
      </section>

      <section className="work shell" aria-labelledby="project-archive-heading">
        <div className="section-head">
          <p id="project-archive-heading">Project archive</p>
          <span>Four selected engagements</span>
        </div>

        {projects.map((project, index) => (
          <article className={`case-study case-${project.visual}`} key={project.slug}>
            <div className="case-copy">
              <p className="case-count">0{index + 1} / 04</p>
              <p className="tag">{project.category}</p>
              <h2>{project.title}</h2>
              <p className="summary">{project.description}</p>
              <ul>
                {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
              </ul>
              {project.href ? (
                <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                  View live website <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <a className="text-link" href="/#contact">
                  Discuss a similar system <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            <ProjectVisual project={project} />
          </article>
        ))}
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
