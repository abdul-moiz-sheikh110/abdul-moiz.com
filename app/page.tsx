const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  ["01", "Website design", "Clear, responsive websites shaped around your audience and business goals."],
  ["02", "Web development", "Reliable front-end and back-end development for fast, polished digital experiences."],
  ["03", "Business systems", "Purpose-built dashboards, portals, and management tools that simplify daily work."],
  ["04", "Ongoing support", "Thoughtful improvements, maintenance, and technical help after launch."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="110 Solutions portfolio home"><span className="brand-mark">11</span><span>110 Solutions</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#team">Team</a><a className="nav-cta" href="#contact">Let&apos;s talk</a></div>
      </nav>

      <section className="hero shell" id="top">
        <p className="eyebrow"><span /> Available for selected projects</p>
        <h1>Digital products built<br />with <em>clarity.</em></h1>
        <div className="hero-bottom"><p>We are a focused web team crafting high-quality websites and business systems for ambitious organisations.</p><a className="circle-link" href="#work" aria-label="View selected work">↓</a></div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head"><p>Selected work</p><span>03 projects</span></div>

        <article className="case-study case-school">
          <div className="case-copy">
            <p className="case-count">01 / 03</p><p className="tag">Education website</p>
            <h2>Crest View<br />Academy</h2>
            <p className="summary">A warm, clear school website designed to help parents understand the academy&apos;s programmes, values, and admissions journey.</p>
            <ul><li>Responsive marketing website</li><li>Programme and admissions content</li><li>Mobile-friendly enquiry journey</li></ul>
            <a className="text-link" href="https://crestviewacademy.pk/" target="_blank" rel="noreferrer">View live website <Arrow /></a>
          </div>
          <div className="case-visual academy-mock" aria-label="Stylised preview of Crest View Academy website">
            <div className="browser-frame">
              <div className="browser-top"><i /><i /><i /><small>crestviewacademy.pk</small></div>
              <div className="academy-screen"><div className="mock-nav"><b>CVA</b><span>About&nbsp;&nbsp; Program&nbsp;&nbsp; Contact</span></div><p>Karachi, Pakistan</p><h3>Where Faith &amp;<br />Future Leaders<br />Emerge</h3><button>Enroll your child</button><div className="arch">CVA</div></div>
            </div>
          </div>
        </article>

        <article className="case-study case-teleco">
          <div className="case-copy">
            <p className="case-count">02 / 03</p><p className="tag">Corporate website</p>
            <h2>Teleco<br />Solutions</h2>
            <p className="summary">A service-led corporate presence for an ICT provider, presenting connectivity, infrastructure, software, cloud, and managed services.</p>
            <ul><li>Structured service catalogue</li><li>Corporate brand presentation</li><li>Lead generation touchpoints</li></ul>
            <a className="text-link" href="https://www.teleco-solutions.com/" target="_blank" rel="noreferrer">View live website <Arrow /></a>
          </div>
          <div className="case-visual teleco-mock" aria-label="Stylised preview of Teleco Solutions website">
            <div className="browser-frame dark-frame"><div className="browser-top"><i /><i /><i /><small>teleco-solutions.com</small></div><div className="teleco-screen"><div className="signal"><i /><i /><i /><i /></div><p>CONNECTIVITY THAT EMPOWERS</p><h3>Data Networks &amp;<br />High Speed<br />Broadband</h3><div className="network-lines" /></div></div>
          </div>
        </article>

        <article className="case-study case-lms">
          <div className="case-copy">
            <p className="case-count">03 / 03</p><p className="tag">School management system</p>
            <h2>School<br />LMS</h2>
            <p className="summary">A comprehensive administration dashboard that brings school operations into one clear system for everyday management.</p>
            <ul><li>Students, staff, and attendance</li><li>Fees, exams, and timetables</li><li>Roles, permissions, and reports</li></ul>
            <a className="text-link" href="#contact">Build a similar system <Arrow /></a>
          </div>
          <div className="case-visual lms-mock"><div className="browser-frame"><div className="browser-top"><i /><i /><i /><small>School LMS dashboard</small></div><img src="/school-lms-dashboard.png" alt="School management dashboard showing users, staff, attendance, fees, and reports" /></div></div>
        </article>
      </section>

      <section className="services shell" id="services">
        <div className="section-head light"><p>What we do</p><span>Built around your goals</span></div>
        <div className="services-intro"><h2>From the first idea<br />to a <em>working product.</em></h2><p>One capable team for design, development, and delivery. You get straightforward communication, considered work, and a result your business can use.</p></div>
        <div className="service-list">{services.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="team shell" id="team">
        <div className="team-card"><p className="tag">A reliable delivery team</p><h2>Different skills.<br />One standard.</h2><p>Our team brings together design, development, and technical delivery. We stay close to the details while keeping the process simple for you.</p><div className="team-chips"><span>UI/UX design</span><span>Frontend</span><span>Backend</span><span>Quality assurance</span></div></div>
        <div className="team-aside"><span>Team-led delivery</span><strong>Clear scope.<br />Regular updates.<br />Professional results.</strong></div>
      </section>

      <section className="contact" id="contact"><div className="shell"><p className="eyebrow invert"><span /> Have a project in mind?</p><h2>Let&apos;s build something<br /><em>useful.</em></h2><p>Tell us what you need, and we&apos;ll reply with a clear next step for your Fiverr project.</p><a href="https://www.fiverr.com/" target="_blank" rel="noreferrer">Start a Fiverr conversation <Arrow /></a></div></section>
      <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">11</span><span>110 Solutions</span></a><p>Websites and systems, designed and built by one team.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
