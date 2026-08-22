# Abdul Moiz Team-Led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the three-page Abdul Moiz portfolio as a clear team-led service portfolio with one verified SEO case study and an original editorial design inspired by the supplied reference.

**Architecture:** Keep the existing vinext routes and shared shell, place reusable service and SEO content in focused data modules, and render all public copy from those verified sources. Replace the current CSS system with an editorial typography and color system while retaining route behavior, accessible focus states, responsive layouts, and Sites packaging.

**Tech Stack:** TypeScript, React 19, vinext, Vite, CSS, Node test runner, ESLint, OpenAI Sites plugin

**Spec:** `docs/superpowers/specs/2026-08-22-team-led-portfolio-redesign.md`

## Global Constraints

- Primary identity is always written as `Abdul Moiz` in visible identity copy and metadata.
- Public role is `Team Lead`.
- Services are web development, custom software development, cybersecurity, SEO, logo design, and graphic design.
- Delivery copy uses `we`; personal introduction may use `I` only when Abdul Moiz introduces himself as team lead.
- Do not claim Abdul Moiz personally performs every specialist task.
- Do not mention marketing, client communication duties, Fiverr account support, account management, credential sharing, individual team names, or internal responsibilities.
- Add exactly one anonymized SEO case study from `C:\Users\Moiz\Downloads\Arham - SEO Portfolio.pdf`.
- Preserve exact project URLs and `/school-lms-dashboard.png`; do not invent an LMS URL.
- Use Archivo for display headings, Spline Sans for body text, and IBM Plex Mono for small labels.
- Use deep navy, warm ivory, muted teal, and soft stone colors, not the reference site's orange theme.
- No em dashes in visible copy, metadata, tests, or new source copy.
- Do not invent certifications, dates, clients, testimonials, statistics, outcomes, or project features.
- Preserve vinext, Vite, `@openai/sites-vite-plugin`, `.openai/hosting.json`, responsive behavior, reduced motion, keyboard focus, and WCAG contrast.
- Do not publish without separate explicit approval.

---

### Task 1: Define Team-Led Content and SEO Case Study Contracts

**Files:**
- Create: `app/data/services.ts`
- Create: `app/data/seoCaseStudy.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `Service` type and `services: Service[]` containing exactly six entries.
- Produces: `SeoCaseStudy` type and `seoCaseStudy: SeoCaseStudy` containing one anonymized software-sector case study.
- Consumes: Verified figures from page 3 of the supplied SEO portfolio: 3.51K clicks, 1.78M impressions, average position 15.5 from 23, and 3 monthly qualified leads.

- [ ] **Step 1: Add failing source-contract tests**

Add a test that reads `app/data/services.ts` and `app/data/seoCaseStudy.ts` and asserts these public labels and verified values:

```js
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
  assert.match(seoSource, /3 qualified leads each month/);
  assert.doesNotMatch(`${servicesSource}\n${seoSource}`, /Shabbir|Arham|Laiba|Daniyal/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test --test-name-pattern "team service and SEO data" tests/rendered-html.test.mjs`

Expected: FAIL because the two data modules do not exist.

- [ ] **Step 3: Create the service data module**

Create `app/data/services.ts` with:

```ts
export type Service = {
  number: string;
  title: string;
  summary: string;
};

export const services: Service[] = [
  { number: "01", title: "Web development", summary: "Clear, responsive websites built around your goals and customers." },
  { number: "02", title: "Custom software development", summary: "Purpose-built portals, dashboards, and tools that support everyday work." },
  { number: "03", title: "Cybersecurity", summary: "Practical checks and improvements that help protect websites, systems, and information." },
  { number: "04", title: "SEO", summary: "Website and content improvements that help the right people find your business through search." },
  { number: "05", title: "Logo design", summary: "Distinct logo concepts shaped around the character and purpose of your business." },
  { number: "06", title: "Graphic design", summary: "Professional visual material for websites, campaigns, and everyday business communication." },
];
```

- [ ] **Step 4: Create the single SEO case-study module**

Create `app/data/seoCaseStudy.ts` with one exported object:

```ts
export type SeoMetric = { value: string; label: string; context: string };
export type SeoCaseStudy = {
  sector: string;
  title: string;
  summary: string;
  work: string[];
  metrics: SeoMetric[];
};

export const seoCaseStudy: SeoCaseStudy = {
  sector: "Software company",
  title: "Turning search visibility into a steady lead source",
  summary: "Our team improved how a software company appeared in search and helped turn that visibility into a consistent source of qualified enquiries.",
  work: ["Improved important website pages", "Fixed search visibility issues", "Built useful content around customer searches"],
  metrics: [
    { value: "3.51K", label: "Clicks", context: "Latest three months" },
    { value: "1.78M", label: "Search appearances", context: "Latest three months" },
    { value: "15.5", label: "Average position", context: "Improved from 23" },
    { value: "3 qualified leads each month", label: "Lead flow", context: "Established through search" },
  ],
};
```

- [ ] **Step 5: Run the focused test and full suite**

Run: `node --test --test-name-pattern "team service and SEO data" tests/rendered-html.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: production build succeeds and the existing suite plus the new contract test passes.

- [ ] **Step 6: Commit**

```bash
git add app/data/services.ts app/data/seoCaseStudy.ts tests/rendered-html.test.mjs
git commit -m "feat: define team services and SEO case study"
```

---

### Task 2: Update Shared Identity, Metadata, and Calls to Action

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/components/SiteHeader.tsx`
- Modify: `app/components/SiteFooter.tsx`
- Modify: `app/components/ContactCTA.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: shared `Abdul Moiz` identity, `Team Lead` positioning, navigation, footer, and Fiverr CTA used by all routes.
- Consumes: existing route paths `/`, `/about`, `/projects`, and contact anchor `/#contact`.

- [ ] **Step 1: Add failing rendered-shell assertions**

Extend the route test to require `Abdul Moiz`, `Team Lead`, team language, and all route links. Add prohibited-copy assertions:

```js
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
```

- [ ] **Step 2: Run the shell test and verify RED**

Run: `npm test`

Expected: FAIL because current About and Home copy includes prohibited internal-role wording and shared shell lacks the final Team Lead positioning.

- [ ] **Step 3: Update global metadata and shared components**

Set the layout title to `Abdul Moiz | Team-Led Digital Services` and describe the six services in ordinary language. Keep the `AM` mark only as a visual monogram, never as a replacement for the full public name. Update footer copy to `Digital services led by Abdul Moiz and delivered through a collaborative team.` Keep `Join us through Fiverr.` in `ContactCTA`.

- [ ] **Step 4: Run tests and lint**

Run: `npm test`

Expected: shared-shell checks pass; page-specific checks may remain RED until Tasks 3 to 5.

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/components/SiteHeader.tsx app/components/SiteFooter.tsx app/components/ContactCTA.tsx tests/rendered-html.test.mjs
git commit -m "feat: present Abdul Moiz as team lead"
```

---

### Task 3: Rebuild the Home Page Around Team Delivery

**Files:**
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `services` from `app/data/services.ts` and `projects` from `app/data/projects.ts`.
- Produces: Home sections for hero, six services, four-step delivery process, selected projects, and team-led positioning.

- [ ] **Step 1: Add a failing Home acceptance test**

Require the rendered Home HTML to contain:

```js
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
```

- [ ] **Step 2: Run the focused Home test and verify RED**

Run: `node --test --test-name-pattern "Home presents the complete team-led offer" tests/rendered-html.test.mjs`

Expected: FAIL because the current page has five capabilities and individual-led copy.

- [ ] **Step 3: Replace the Home content structure**

Use this hero direction:

```tsx
<p className="eyebrow"><span /> Portfolio · Team-led delivery</p>
<h1>Abdul<br />Moiz<span className="accent-dot">.</span></h1>
<p className="hero-role">Team Lead for websites, software, security, search, and design.</p>
<p className="hero-summary">I lead a collaborative digital team. Together, we turn clear requirements into useful work that is built, checked, and ready to use.</p>
```

Render all six `services`, a four-step process, three selected development projects, and a short statement that every project uses shared planning, specialist work, testing, and quality review. Do not name team members or internal communication roles.

- [ ] **Step 4: Run Home test, full suite, and lint**

Run: `node --test --test-name-pattern "Home presents the complete team-led offer" tests/rendered-html.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: production build succeeds; remaining failures, if any, are limited to pending About, Projects, or visual tasks.

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: rebuild team-led Home page"
```

---

### Task 4: Rewrite About as an Abdul Moiz-Led Team Story

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `services` from `app/data/services.ts`.
- Produces: `/about` metadata and sections for leadership, shared delivery, service understanding, working method, and quality review.

- [ ] **Step 1: Add a failing About acceptance test**

Require `Abdul Moiz`, `Team Lead`, `Every project is a combined effort`, `the right specialist`, and `quality review`. Require all six service titles. Assert that prohibited internal-role wording and individual names are absent.

- [ ] **Step 2: Run the focused About test and verify RED**

Run: `node --test --test-name-pattern "About explains Abdul Moiz team leadership" tests/rendered-html.test.mjs`

Expected: FAIL because the current page describes Abdul Moiz as a direct point of contact and includes internal communication responsibilities.

- [ ] **Step 3: Rebuild About page copy and sections**

Use `About Abdul Moiz` metadata and this positioning:

```tsx
<h1 id="about-title">A team built around<br />useful <em>outcomes.</em></h1>
<p>I am Abdul Moiz, the Team Lead behind a group of digital specialists. I understand each part of the work, stay involved throughout the project, and review the final result with the team.</p>
```

Add sections titled `How we work`, `Shared responsibility`, `Six connected capabilities`, and `Quality at every stage`. Explain that relevant specialists may join discussions without publishing names or internal assignments.

- [ ] **Step 4: Run About test, full suite, and lint**

Run the focused test, then `npm test`, then `npm run lint`.

Expected: all implemented page tests pass, production build succeeds, and lint passes.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: tell the team-led About story"
```

---

### Task 5: Add One Verified SEO Case Study to Projects

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `projects` and `Project` from `app/data/projects.ts`.
- Consumes: `seoCaseStudy` from `app/data/seoCaseStudy.ts`.
- Produces: four preserved development showcases plus exactly one SEO case study.

- [ ] **Step 1: Add a failing Projects acceptance test**

Require all four existing titles, exact three website URLs, the LMS image, and exactly one element with `data-seo-case-study="true"`. Require the four verified SEO values and assert that no second SEO case-study element exists.

- [ ] **Step 2: Run the Projects test and verify RED**

Run: `node --test --test-name-pattern "Projects includes one verified SEO case study" tests/rendered-html.test.mjs`

Expected: FAIL because the SEO case-study section does not exist.

- [ ] **Step 3: Render the single SEO case study**

After the four existing projects, add:

```tsx
<article className="seo-case-study" data-seo-case-study="true">
  <p className="case-count">05 / SEO</p>
  <p className="tag">{seoCaseStudy.sector}</p>
  <h2>{seoCaseStudy.title}</h2>
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
```

Do not add a public client name, source person name, invented URL, or additional SEO project.

- [ ] **Step 4: Run Projects test, full suite, and lint**

Run the focused test, then `npm test`, then `npm run lint`.

Expected: all tests pass, exact links remain unchanged, and lint passes.

- [ ] **Step 5: Commit**

```bash
git add app/projects/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add verified team SEO case study"
```

---

### Task 6: Implement the Editorial Typography and Original Color Theme

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `--font-display`, `--font-body`, and `--font-mono` tokens.
- Produces: `--paper`, `--ink`, `--ink-soft`, `--accent`, `--accent-dark`, `--line`, and `--card` color tokens.
- Consumes: class names introduced by Tasks 2 to 5.

- [ ] **Step 1: Add failing typography, theme, and accessibility tests**

Read `app/globals.css` and require:

```js
for (const token of ["Archivo", "Spline Sans", "IBM Plex Mono", "--paper", "--ink", "--accent"]) {
  assert.match(css, new RegExp(token));
}
assert.doesNotMatch(css, /#d4451f/i);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
```

Retain the existing contrast calculations and extend them to the new navy, ivory, teal, and stone token relationships.

- [ ] **Step 2: Run the visual-contract tests and verify RED**

Run: `node --test --test-name-pattern "editorial typography|contrast" tests/rendered-html.test.mjs`

Expected: FAIL because the existing stylesheet does not use the final three-font system and approved palette.

- [ ] **Step 3: Load and apply the approved fonts**

Use CSS font imports or locally configured font faces for Archivo, Spline Sans, and IBM Plex Mono. Apply Archivo to display headings, Spline Sans to body and navigation, and IBM Plex Mono to eyebrows, numbering, tags, and small project labels. Include resilient system fallbacks.

- [ ] **Step 4: Replace the visual tokens and responsive system**

Use this starting palette, adjusting only if automated contrast proves a darker value is needed:

```css
:root {
  --paper: #f4f0e8;
  --card: #fbf8f2;
  --ink: #102a35;
  --ink-soft: #36515b;
  --accent: #147d75;
  --accent-dark: #0d5f59;
  --line: #c9d0ca;
  --font-display: "Archivo", Arial, sans-serif;
  --font-body: "Spline Sans", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", Consolas, monospace;
}
```

Implement oversized display headings, editorial spacing, dark feature panels, project metric grids, restrained borders, and subtle motion. Provide grid-to-single-column rules at `850px` and compact typography/navigation rules at `560px`. Avoid neon, glow, glass effects, and decorative AI imagery.

- [ ] **Step 5: Verify styling and accessibility**

Run: `npm test`

Expected: production build succeeds and all HTML, font, theme, copy, link, contrast, and route tests pass.

Run: `npm run lint`

Expected: PASS.

Run: `rg --fixed-strings "—" app tests`

Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx tests/rendered-html.test.mjs
git commit -m "style: apply editorial team portfolio theme"
```

---

### Task 7: Final Verification and Deployment Package Refresh

**Files:**
- Modify: `README.md`
- Generate: `.openai/portfolio-site.tar.gz`

**Interfaces:**
- Consumes: final source tree and `.openai/hosting.json`.
- Produces: verified documentation and a refreshed untracked Sites deployment archive.

- [ ] **Step 1: Update README handoff**

Document the three routes, six services, team-led positioning, four development projects, one SEO case study, exact public links, generic Fiverr URL status, and the rule that publishing requires explicit approval.

- [ ] **Step 2: Run all final checks from a clean build**

Run:

```bash
npm run lint
npm test
rg --fixed-strings "—" app tests README.md
git diff --check
```

Expected: lint passes, production build succeeds, every test passes, the scan has no matches, and diff check is clean.

- [ ] **Step 3: Verify prohibited copy and identity rules**

Run:

```bash
rg -n -i "marketing|client communication|Fiverr account support|account management|Shabbir|Arham|Laiba|Daniyal" app
rg -n "Abdul(?! Moiz)" app --pcre2
```

Expected: no matches.

- [ ] **Step 4: Refresh and inspect the Sites package**

Run:

```bash
C:/Users/Moiz/.codex/plugins/cache/openai-bundled/sites/0.1.37/scripts/package-site.sh "/e/110 content agent/portfolio-site" "/e/110 content agent/portfolio-site/.openai/portfolio-site.tar.gz"
tar -tzf .openai/portfolio-site.tar.gz
```

Expected: archive contains `dist/server/index.js` and `dist/.openai/hosting.json`.

- [ ] **Step 5: Commit documentation only**

```bash
git add README.md
git commit -m "docs: update team portfolio handoff"
```

Leave `.openai/portfolio-site.tar.gz` untracked and do not publish.
