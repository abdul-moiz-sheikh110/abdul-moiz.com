import type { Metadata } from "next";

import { ContactCTA } from "../components/ContactCTA";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { projects, type Project } from "../data/projects";
import { seoCaseStudy } from "../data/seoCaseStudy";
import { contactHref } from "../data/contact";

export const metadata: Metadata = {
  title: "Projects | Abdul Moiz",
  description:
    "Selected website and custom system work delivered by Abdul Moiz with team-supported digital expertise.",
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    const frameLabel = project.href
      ? project.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")
      : "School LMS dashboard";

    return (
      <div className={`case-visual ${project.visual}-mock project-image-preview`}>
        <div className="browser-frame">
          <div className="browser-top"><i /><i /><i /><small>{frameLabel}</small></div>
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
            A selection of website and custom system work created and delivered by me and my team.
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
                <a className="text-link" href={contactHref}>
                  Discuss a similar system <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            <ProjectVisual project={project} />
          </article>
        ))}

        <article className="seo-case-study" data-seo-case-study="true">
          <p className="seo-project-heading">SEO Project</p>
          <p className="case-count">05 / SEO</p>
          <p className="tag">{seoCaseStudy.sector}</p>
          <h2 aria-label={seoCaseStudy.title}>
            <span className="seo-title-line">Turning search visibility</span><br />
            <span className="seo-title-line">into a steady</span><br />
            <span className="seo-title-line">lead source</span>
          </h2>
          <p>{seoCaseStudy.summary}</p>
          <div className="seo-metrics">
            {seoCaseStudy.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <small>{metric.context}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
