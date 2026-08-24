import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const fetchHandler = typeof worker === "function" ? worker : worker.fetch.bind(worker);
  return fetchHandler(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders Home, About, and Projects routes with Abdul Moiz ownership metadata", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Abdul Moiz/);
    assert.match(html, /<title>[^<]*Abdul Moiz[^<]*<\/title>/i);
    assert.match(html, /<meta name="description" content="[^"]*Abdul Moiz[^"]*"\/>/i);
  }
});

test("Home metadata describes Abdul Moiz team-led digital services", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /<title>Abdul Moiz \| Team-Led Digital Services<\/title>/i);
  const description = html.match(/<meta name="description" content="([^"]*)"\/>/i);
  assert.ok(description, "Home should include a description meta tag");
  assert.match(description[1], /Abdul Moiz/i);

  for (const service of [
    "Web development",
    "Custom software development",
    "Cybersecurity",
    "SEO",
    "Logo design",
    "Graphic design",
  ]) {
    assert.match(description[1], new RegExp(service, "i"));
  }
});

function elementMarkup(html, tagName) {
  const element = html.match(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, "i"));
  assert.ok(element, `Expected a ${tagName} element`);
  return element[0];
}

test("every route presents Abdul Moiz as Team Lead in the shared header and footer", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const html = await (await render(route)).text();
    const header = elementMarkup(html, "header");
    const footer = elementMarkup(html, "footer");

    assert.match(header, /Abdul Moiz/);
    assert.match(header, /Team Lead/i);
    assert.match(header, /href="\/"/);
    assert.match(header, /href="\/about"/);
    assert.match(header, /href="\/projects"/);
    assert.match(header, /href="\/#contact"/);

    assert.match(footer, /Abdul Moiz/);
    assert.match(footer, /Team Lead/i);
    assert.match(footer, /Digital services led by Abdul Moiz and delivered through a collaborative team\./i);
    assert.match(footer, /href="\/"/);
    assert.match(footer, /href="\/about"/);
    assert.match(footer, /href="\/projects"/);
  }
});

test("public routes exclude prohibited internal copy", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const html = await (await render(route)).text();
    for (const forbidden of [
      "client communication",
      "Fiverr account support",
      "account management",
      "Shabbir",
      "Arham",
      "Laiba",
      "Daniyal",
    ]) {
      assert.doesNotMatch(html, new RegExp(forbidden, "i"));
    }
  }
});

test("Home source passes the prohibited-copy scan", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(source, /client communication|Fiverr account support|account management|Shabbir|Arham|Laiba|Daniyal/i);
});

test("Home source passes the full-name scan", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(source, /Abdul(?! Moiz)/);
});

test("shared contact section invites visitors through Fiverr", async () => {
  const source = await readFile(new URL("../app/components/ContactCTA.tsx", import.meta.url), "utf8");
  assert.match(source, /Join us through Fiverr\./);
  assert.doesNotMatch(source, /Tell Abdul Moiz what you need/);
});

test("custom cursor is progressive and respects user input preferences", async () => {
  const cursorSource = await readFile(new URL("../app/components/CustomCursor.tsx", import.meta.url), "utf8");
  const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(cursorSource, /pointer:\s*fine/);
  assert.match(cursorSource, /prefers-reduced-motion:\s*reduce/);
  assert.match(cursorSource, /pointermove/);
  assert.match(cursorSource, /a, button, \[data-cursor\]/);
  assert.match(cursorSource, /aria-hidden="true"/);
  assert.match(layoutSource, /<CustomCursor\s*\/>/);
  assert.match(css, /\.custom-cursor-dot/);
  assert.doesNotMatch(css, /--cursor-glow|\.custom-cursor-dot[^}]*box-shadow/is);
  assert.doesNotMatch(cursorSource, /custom-cursor-ring/);
  assert.doesNotMatch(css, /\.custom-cursor-ring/);
  assert.match(css, /\.cursor-enhanced/);
  assert.match(css, /@media\s*\(pointer:\s*coarse\)/);
});

test("heading letters form a cursor-led ripple wave with accessible fallbacks", async () => {
  const motionSource = await readFile(new URL("../app/components/HeadingMotion.tsx", import.meta.url), "utf8");
  const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(motionSource, /querySelectorAll\("h1, h2"\)/);
  assert.match(motionSource, /NodeFilter\.SHOW_TEXT/);
  assert.match(motionSource, /heading-letter/);
  assert.match(motionSource, /heading-word/);
  assert.match(motionSource, /aria-label/);
  assert.match(motionSource, /pointermove/);
  assert.match(motionSource, /wave-center/);
  assert.match(motionSource, /wave-near/);
  assert.match(motionSource, /wave-far/);
  assert.match(motionSource, /Math\.abs/);
  assert.match(motionSource, /prefers-reduced-motion:\s*reduce/);
  assert.match(motionSource, /pointer:\s*fine/);
  assert.match(layoutSource, /<HeadingMotion\s*\/>/);
  assert.match(css, /\.heading-letter\.wave-center\s*{[^}]*color:\s*var\(--accent\)[^}]*transform:[^}]*scale\(/s);
  assert.match(css, /\.heading-letter\.wave-near\s*{[^}]*translateY\(/s);
  assert.match(css, /\.heading-letter\.wave-far\s*{[^}]*translateY\(/s);
  assert.match(css, /\.heading-word\s*{[^}]*display:\s*inline-block[^}]*white-space:\s*nowrap/s);
  assert.match(css, /@media\s*\(pointer:\s*fine\)[\s\S]*\.heading-letter/s);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*\.heading-letter/s);
  assert.doesNotMatch(css, /is-heading-active|--heading-rotate-x|--heading-rotate-y/);
});

test("route navigation resets retained scroll without overriding anchor links", async () => {
  const scrollSource = await readFile(new URL("../app/components/ScrollToTop.tsx", import.meta.url), "utf8");
  const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(scrollSource, /usePathname/);
  assert.match(scrollSource, /window\.location\.hash/);
  assert.match(scrollSource, /window\.scrollTo\(0, 0\)/);
  assert.match(scrollSource, /\[pathname\]/);
  assert.match(layoutSource, /<ScrollToTop\s*\/>/);
});

test("hero supporting copy aligns beneath each page heading", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const heroBottom = css.match(/\.hero-bottom\s*{[^}]*}/s);

  assert.ok(heroBottom, "hero bottom layout should be defined");
  assert.match(heroBottom[0], /justify-content:\s*space-between/);
  assert.doesNotMatch(heroBottom[0], /justify-content:\s*flex-end/);
});

test("Home includes a continuously moving service strip", async () => {
  const html = await (await render("/" )).text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(html, /class="service-marquee"/);
  for (const service of ["Web development", "Custom software development", "Cybersecurity", "SEO", "Logo design", "Graphic design"]) {
    assert.match(html, new RegExp(service));
  }
  assert.match(css, /@keyframes\s+service-marquee/);
  assert.match(css, /\.service-marquee:hover[^{]*[\s\S]*animation-play-state:\s*paused/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*\.service-track[^{]*{[^}]*animation:\s*none/s);
});

test("110 Solutions is never used as the site owner", async () => {
  for (const route of ["/", "/about"]) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /class="brand"[^>]*>[\s\S]*?110 Solutions/);
  }
});

test("projects route contains every verified project and link", async () => {
  const html = await (await render("/projects")).text();
  for (const title of ["Crest View Academy", "Teleco Solutions", "110 Solutions", "School LMS"]) {
    assert.match(html, new RegExp(title));
  }
  for (const href of ["https://crestviewacademy.pk/", "https://www.teleco-solutions.com/", "https://www.110solutions.com.au/"]) {
    assert.match(html, new RegExp(href.replaceAll(".", "\\.")));
  }
});

test("Projects includes one verified SEO case study", async () => {
  const html = await (await render("/projects")).text();

  for (const title of ["Crest View Academy", "Teleco Solutions", "110 Solutions", "School LMS"]) {
    assert.match(html, new RegExp(title));
  }
  for (const href of ["https://crestviewacademy.pk/", "https://www.teleco-solutions.com/", "https://www.110solutions.com.au/"]) {
    assert.match(html, new RegExp(href.replaceAll(".", "\\.")));
  }
  assert.match(html, /src="\/school-lms-dashboard.png"/);

  const seoCaseStudies = html.match(/<article\b[^>]*data-seo-case-study="true"[^>]*>[\s\S]*?<\/article>/gi) ?? [];
  assert.equal(seoCaseStudies.length, 1, "Projects should render exactly one SEO case study");

  for (const metric of ["3.51K", "1.78M", "15.5", "Improved from 23", "3 qualified leads each month"]) {
    assert.match(seoCaseStudies[0], new RegExp(metric.replaceAll(".", "\\.")));
  }
});

test("LMS project uses its supplied image without an invented website URL", async () => {
  const html = await (await render("/projects")).text();
  assert.match(html, /src="\/school-lms-dashboard.png"/);
  assert.match(html, /School management dashboard showing users, staff, attendance, fees, and reports/);
  assert.doesNotMatch(html, /href="[^"]+"[^>]*>View LMS website/);
});

test("projects metadata describes Abdul Moiz work", async () => {
  const html = await (await render("/projects")).text();
  assert.match(html, /<title>Projects \| Abdul Moiz/);
});

test("renders the professional Abdul Moiz portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>[^<]*Abdul Moiz[^<]*<\/title>/i);
  assert.match(html, /<meta name="description" content="[^"]*Abdul Moiz[^"]*"\/>/i);
  assert.match(html, /Abdul Moiz/);
  assert.match(html, /Discuss Your Project/);
});

test("Home links selected projects to the complete archive", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="\/projects"/);
});

test("Home presents the complete team-led offer", async () => {
  const html = await (await render("/")).text();

  for (const phrase of [
    "Abdul Moiz",
    "Team Lead",
    "Web development",
    "Custom software development",
    "Cybersecurity",
    "SEO",
    "Logo design",
    "Graphic design",
    "Understand the need",
    "Plan together",
    "Build with specialists",
    "Review and deliver",
  ]) {
    assert.match(html, new RegExp(phrase, "i"));
  }

  const processSection = html.match(
    /<section class="approach-list shell" aria-labelledby="delivery-process-heading">[\s\S]*?<\/section>/i,
  );
  assert.ok(processSection, "Home should include the delivery process section");
  assert.equal((processSection[0].match(/<h2\b/gi) ?? []).length, 1);

  for (const title of [
    "Understand the need",
    "Plan together",
    "Build with specialists",
    "Review and deliver",
  ]) {
    assert.match(processSection[0], new RegExp(`<h3>${title}<\\/h3>`, "i"));
  }
});

test("SEO case study displays its project heading inside the dark card", async () => {
  const html = await (await render("/projects")).text();
  const card = html.match(/<article class="seo-case-study"[\s\S]*?<\/article>/i)?.[0];

  assert.ok(card, "SEO case study card should render");
  assert.match(card, /<p class="seo-project-heading">SEO Project<\/p>[\s\S]*05 \/ SEO/i);
});

test("SEO case study title renders as the approved three lines", async () => {
  const html = await (await render("/projects")).text();

  assert.match(
    html,
    /<h2[^>]*><span class="seo-title-line">Turning search visibility<\/span><br\/><span class="seo-title-line">into a steady<\/span><br\/><span class="seo-title-line">lead source<\/span><\/h2>/i,
  );
});

test("Projects introduction presents the work as delivered by Abdul Moiz and his team", async () => {
  const html = await (await render("/projects")).text();

  assert.match(
    html,
    /A selection of website and custom system work created and delivered by me and my team\./,
  );
  assert.doesNotMatch(html, /support of a broader delivery team/i);
});

test("website projects use their supplied screenshots as meaningful previews", async () => {
  const projectsHtml = await (await render("/projects")).text();
  const homeHtml = await (await render("/")).text();

  const previews = [
    ["/project-previews/crest-view-academy.png", "Crest View Academy website homepage"],
    ["/project-previews/teleco-solutions.png", "Teleco Solutions website homepage"],
    ["/project-previews/110-solutions.png", "110 Solutions website homepage"],
  ];

  for (const [src, alt] of previews) {
    assert.match(projectsHtml, new RegExp(`src="${src}"[^>]*alt="${alt}"`));
  }

  assert.match(homeHtml, /src="\/project-previews\/crest-view-academy\.png"/);
  assert.match(homeHtml, /src="\/project-previews\/teleco-solutions\.png"/);
  assert.doesNotMatch(homeHtml, /src="\/project-previews\/110-solutions\.png"/);
  assert.match(homeHtml, /src="\/school-lms-dashboard\.png"/);
});

test("all project screenshots share one full-image size without cropping", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(
    stylesheet,
    /\.project-image-preview img\s*{[^}]*aspect-ratio:\s*2\.1\s*\/\s*1;[^}]*height:\s*auto;[^}]*object-fit:\s*contain;/s,
  );
  assert.doesNotMatch(stylesheet, /\.lms-mock img\s*{/);
});

test("project image frames fill their cards without oversized empty padding", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(
    stylesheet,
    /\.case-visual\.project-image-preview\s*{[^}]*min-height:\s*0;[^}]*padding:\s*12px;/s,
  );
});

test("alternating project rows keep the image column as wide as 110 Solutions", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(
    stylesheet,
    /\.project-preview:nth-child\(even\),\s*\.case-study:nth-of-type\(even\)\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*1\.28fr\)\s+minmax\(270px,\s*0\.72fr\);/s,
  );
  assert.match(
    stylesheet,
    /@media\s*\(max-width:\s*850px\)[\s\S]*\.project-preview:nth-child\(even\),\s*\.case-study:nth-of-type\(even\)\s*{[^}]*grid-template-columns:\s*1fr;/s,
  );
});

test("Home uses the approved coordinated-team portfolio content", async () => {
  const html = await (await render("/")).text();

  for (const phrase of [
    "Websites, software, security, search, and design, delivered by one coordinated team",
    "We take time to understand each requirement, plan the work clearly, and review every stage together",
    "View Our Projects",
    "Every service is connected through shared planning, clear communication",
    "Purpose built portals, dashboards, and software tools",
    "Practical security reviews and improvements",
    "We define the scope, responsibilities, and next steps",
    "A focused selection of website and custom software work",
    "Abdul Moiz stays involved from the first discussion to the final quality review",
    "We combine focused skills with one shared project direction",
    "Tell me what you need, what the finished work should achieve",
    "Discuss Your Project",
  ]) {
    assert.match(html, new RegExp(phrase, "i"));
  }

  assert.doesNotMatch(html, /Team Lead for websites, software, security, search, and design/i);
  assert.match(html, /href="\/projects"[^>]*>View Our Projects</i);
  assert.match(html, /href="https:\/\/www\.fiverr\.com\/"[^>]*>\s*Discuss Your Project/i);
});

test("Home introduction uses a wide balanced copy column", async () => {
  const html = await (await render("/")).text();
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(html, /class="home-hero-copy"/i);
  assert.match(stylesheet, /\.hero-bottom > \.home-hero-copy\s*{[^}]*width:\s*100%;[^}]*max-width:\s*980px;/s);
  assert.match(stylesheet, /\.hero-bottom \.home-hero-copy p\s*{[^}]*max-width:\s*none;/s);
  assert.match(stylesheet, /\.home-hero-copy \.hero-role\s*{[^}]*white-space:\s*nowrap;/s);
});

test("Home capability heading stays on exactly two responsive lines", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(source, /<span className="heading-line">One coordinated team<\/span><br \/>/);
  assert.match(source, /<span className="heading-line">for the <em>work ahead\.<\/em><\/span>/);
  assert.match(css, /\.services-intro \.heading-line\s*{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.services-intro\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/s);
  assert.match(css, /\.services-intro\s*{[^}]*gap:\s*clamp\(20px,\s*3vw,\s*32px\);/s);
  assert.match(css, /\.services-intro p\s*{[^}]*max-width:\s*960px;[^}]*justify-self:\s*start;/s);
});

test("About explains Abdul Moiz team leadership", async () => {
  const html = await (await render("/about")).text();

  for (const phrase of [
    "Abdul Moiz",
    "Team Lead",
    "Every project is a combined effort",
    "quality review",
    "Web development",
    "Custom software development",
    "Cybersecurity",
    "SEO",
    "Logo design",
    "Graphic design",
  ]) {
    assert.match(html, new RegExp(phrase, "i"));
  }

  for (const forbidden of [
    "marketing",
    "client communication",
    "Fiverr account support",
    "account management",
    "Shabbir",
    "Arham",
    "Laiba",
    "Daniyal",
  ]) {
    assert.doesNotMatch(html, new RegExp(forbidden, "i"));
  }
});

test("About uses the approved team-first content", async () => {
  const html = await (await render("/about")).text();

  assert.match(html, />\s*About Us\s*</i);
  assert.match(html, /class="about-hero-copy"/i);
  assert.match(html, /I have a team working across websites, custom software, cybersecurity, SEO, logo design, and graphic design/i);
  assert.match(html, /We bring these skills together to understand each project clearly, establish a practical direction/i);
  assert.match(html, /Every project begins with a shared understanding of what needs to be achieved/i);
  assert.match(html, /The work is reviewed throughout the process so important details remain consistent/i);
  assert.match(html, /Every project is a combined effort/i);
  assert.match(html, /Different skills and perspectives come into the project when needed/i);
  assert.match(html, /This results in work that feels complete, practical, and ready to use/i);
  assert.doesNotMatch(html, /I understand every service we offer/i);

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.about-hero-copy\s*{[^}]*display:\s*grid[^}]*gap:/s);
});

test("About keeps the approved team-led section structure", async () => {
  const html = await (await render("/about")).text();
  for (const heading of [
    "How we work",
    "Shared responsibility",
    "Six connected capabilities",
    "Quality at every stage",
  ]) {
    assert.match(html, new RegExp(heading, "i"));
  }
  assert.match(html, /<title>About Abdul Moiz<\/title>/i);
});

test("About How we work section uses the approved teal feature treatment", async () => {
  const html = await (await render("/about")).text();
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(html, /<section class="about-grid professional-background shell"[\s\S]*<span class="about-accent-line">connected delivery\.<\/span>/i);
  assert.match(stylesheet, /\.professional-background\s*{[^}]*background:\s*var\(--ink\);[^}]*color:\s*var\(--card\);/s);
  assert.match(stylesheet, /\.professional-background::before\s*{[^}]*background:\s*var\(--accent-light\);/s);
  assert.match(stylesheet, /\.about-accent-line\s*{[^}]*color:\s*var\(--accent-light\);/s);
  assert.match(
    stylesheet,
    /\.about-grid\.professional-background > div:last-child\s*{[^}]*color:\s*var\(--ink-inverse\);/s,
  );
});

test("About Shared responsibility section uses a readable mint feature treatment", async () => {
  const html = await (await render("/about")).text();
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(html, /<section class="about-grid shared-responsibility shell"[\s\S]*<span class="responsibility-accent">combined effort\.<\/span>/i);
  assert.match(stylesheet, /\.shared-responsibility\s*{[^}]*background:\s*var\(--accent-light\);[^}]*color:\s*var\(--ink\);/s);
  assert.match(stylesheet, /\.shared-responsibility > div:last-child\s*{[^}]*color:\s*var\(--ink\);/s);
  assert.match(stylesheet, /\.responsibility-accent\s*{[^}]*color:\s*var\(--accent-dark\);/s);
});

test("site sections use available space without oversized empty gaps", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

  assert.match(stylesheet, /\.hero-bottom > \.about-hero-copy\s*{[^}]*width:\s*100%;[^}]*max-width:\s*1000px;[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/s);
  assert.match(stylesheet, /\.hero-bottom \.about-hero-copy p\s*{[^}]*max-width:\s*none;/s);
  assert.match(stylesheet, /\.about-grid\s*{[^}]*gap:\s*clamp\(40px,\s*7vw,\s*88px\);[^}]*padding:\s*clamp\(64px,\s*8vw,\s*100px\)\s+0;/s);
  assert.match(stylesheet, /\.about-grid > div:last-child\s*{[^}]*max-width:\s*620px;/s);
  assert.match(stylesheet, /\.projects-list\s*{[^}]*gap:\s*clamp\(56px,\s*7vw,\s*88px\);/s);
  assert.match(stylesheet, /\.case-study\s*{[^}]*margin-bottom:\s*clamp\(64px,\s*8vw,\s*104px\);/s);
});

test("removes every starter and generic studio placeholder", async () => {
  const response = await render();
  const html = await response.text();
  const placeholders = new RegExp([
    "Your " + "Studio",
    "Starter " + "Project",
    "codex-" + "preview",
    "react-" + "loading-skeleton",
  ].join("|"), "i");

  assert.doesNotMatch(html, placeholders);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
});

test("includes accessible project navigation and meaningful LMS image text", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /alt="School management dashboard showing users, staff, attendance, fees, and reports"/);
  assert.match(html, /href="https:\/\/crestviewacademy\.pk\/"/);
  assert.match(html, /href="https:\/\/www\.teleco-solutions\.com\/"/);
});

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  }));
  return nested.flat();
}

test("visible HTML, metadata, and source copy contain no em dashes", async () => {
  const emDash = new RegExp("\\u2014");
  for (const route of ["/", "/about", "/projects"]) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, emDash);
  }

  const appDirectory = path.resolve(import.meta.dirname, "../app");
  const sourceFiles = await collectSourceFiles(appDirectory);
  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    assert.doesNotMatch(source, emDash, `${path.relative(appDirectory, sourceFile)} contains an em dash`);
  }
});

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test("process number contrast meets WCAG AA on the approach section background", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");
  const tokens = Object.fromEntries(
    [...stylesheet.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})/gi)].map((match) => [match[1], match[2]]),
  );
  const processNumberRule = stylesheet.match(/\.approach-list article > span\s*{([^}]*)}/s);
  const processSectionRule = stylesheet.match(/\.approach-list\s*{([^}]*)}/s);

  assert.ok(processNumberRule, "Process numbers should have their own foreground rule");
  const foreground = processNumberRule[1].match(/color:\s*var\(--(ink-soft|accent-dark)\);/);
  assert.ok(foreground, "Process numbers should use a light-surface text token");
  assert.ok(processSectionRule, "The approach section should define its own opaque background");
  const background = processSectionRule[1].match(/background:\s*var\(--([\w-]+)\);/);
  assert.ok(background, "The approach section should define its actual background token");
  assert.ok(
    contrastRatio(tokens[foreground[1]], tokens[background[1]]) >= 4.5,
    `${foreground[1]} process numbers on ${background[1]} should meet 4.5:1 contrast`,
  );
});

test("editorial typography and original theme remain accessible", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");
  const tokens = Object.fromEntries(
    [...stylesheet.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})/gi)].map((match) => [match[1], match[2]]),
  );

  for (const token of [
    "Archivo",
    "Spline Sans",
    "IBM Plex Mono",
    "--paper",
    "--card",
    "--ink",
    "--ink-soft",
    "--accent",
    "--accent-dark",
    "--line",
  ]) {
    assert.match(stylesheet, new RegExp(token));
  }

  assert.doesNotMatch(stylesheet, /#d4451f|--orange\b|neon|backdrop-filter/i);
  assert.match(stylesheet, /body\s*{[^}]*font-family:\s*var\(--font-body\);/s);
  assert.match(stylesheet, /h1[\s\S]*font-family:\s*var\(--font-display\);/s);
  assert.match(stylesheet, /\.eyebrow[\s\S]*font-family:\s*var\(--font-mono\);/s);
  assert.match(stylesheet, /@media\s*\(max-width:\s*850px\)/);
  assert.match(stylesheet, /@media\s*\(max-width:\s*560px\)/);
  assert.match(stylesheet, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(stylesheet, /:focus-visible\s*{[^}]*outline:\s*3px solid var\(--card\);[^}]*box-shadow:\s*0 0 0 6px var\(--ink\);/s);

  for (const [foreground, background, minimum] of [
    ["ink", "paper", 7],
    ["ink", "card", 7],
    ["ink-soft", "paper", 4.5],
    ["ink-soft", "card", 4.5],
    ["accent", "paper", 4.5],
    ["accent", "card", 4.5],
    ["accent-dark", "paper", 4.5],
    ["ink", "line", 4.5],
  ]) {
    assert.ok(
      contrastRatio(tokens[foreground], tokens[background]) >= minimum,
      `${foreground} on ${background} should meet ${minimum}:1 contrast`,
    );
  }
});

test("small project labels meet WCAG AA on their actual backgrounds", async () => {
  const stylesheet = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");
  const tokens = Object.fromEntries(
    [...stylesheet.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})/gi)].map((match) => [match[1], match[2]]),
  );

  assert.match(stylesheet, /body\s*{[^}]*background:\s*var\(--paper\);/s);
  assert.match(stylesheet, /\.case-count[\s\S]*color:\s*var\(--ink-soft\);/s);
  assert.match(stylesheet, /\.browser-top\s*{[^}]*background:\s*var\(--browser-chrome\);/s);
  assert.match(stylesheet, /\.browser-top small\s*{[^}]*color:\s*var\(--browser-text\);/s);
  assert.match(stylesheet, /\.solutions-mock \.project-browser-copy\s*{[^}]*background:\s*var\(--stone-soft\);/s);
  assert.match(stylesheet, /\.solutions-mock \.project-browser-copy p\s*{[^}]*color:\s*var\(--accent-dark\);/s);
  assert.ok(contrastRatio(tokens["ink-soft"], tokens.paper) >= 4.5);
  assert.ok(contrastRatio(tokens["browser-text"], tokens["browser-chrome"]) >= 4.5);
  assert.ok(contrastRatio(tokens["accent-dark"], tokens["stone-soft"]) >= 4.5);
});

test("team service and SEO data stay within the approved public scope", async () => {
  const servicesSource = await readFile(new URL("../app/data/services.ts", import.meta.url), "utf8");
  const seoSource = await readFile(new URL("../app/data/seoCaseStudy.ts", import.meta.url), "utf8");

  for (const service of ["Web development", "Custom software development", "Cybersecurity", "SEO", "Logo design", "Graphic design"]) {
    assert.match(servicesSource, new RegExp(service));
  }
  assert.match(seoSource, /Software company/);
  assert.match(seoSource, /3\.51K/);
  assert.match(seoSource, /1\.78M/);
  assert.match(seoSource, /15\.5/);
  assert.match(seoSource, /Improved from 23/);
  assert.match(seoSource, /3 qualified leads each month/);
  assert.doesNotMatch(`${servicesSource}\n${seoSource}`, /Shabbir|Arham|Laiba|Daniyal/);
});

test("Vercel uses the supported Vinext Nitro deployment output", async () => {
  const viteConfig = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const vercelConfig = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));

  assert.match(viteConfig, /import\s*{\s*nitro\s*}\s*from\s*"nitro\/vite"/);
  assert.match(viteConfig, /process\.env\.VERCEL/);
  assert.equal(packageJson.scripts["build:vercel"], "vite build");
  assert.equal(vercelConfig.buildCommand, "npm run build:vercel");
  assert.equal("outputDirectory" in vercelConfig, false);
  assert.doesNotMatch(stylesheet, /@import\s+["']tailwindcss["']/);
});
