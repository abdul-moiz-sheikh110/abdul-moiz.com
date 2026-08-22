# Abdul Moiz Portfolio Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing single-page agency portfolio into a three-page personal portfolio for Abdul Moiz with verified project links, expanded services, and team-supported positioning.

**Architecture:** Create one authoritative project data module plus shared header, footer, and contact components. The Home, About, and Projects routes will compose those shared units while owning route-specific content and metadata. Rendered HTML tests will exercise each route through the production worker.

**Tech Stack:** React 19, TypeScript, vinext, Next.js App Router conventions, CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-22-abdul-moiz-portfolio-expansion-design.md`

## Global Constraints

- The portfolio owner is Abdul Moiz on every route and in all metadata.
- Routes are exactly `/`, `/about`, and `/projects`.
- Services include web development, cybersecurity, SEO, custom systems, and team delivery.
- 110 Solutions appears only as a project, never as the portfolio owner.
- Use the supplied LMS dashboard image at `/school-lms-dashboard.png` and do not invent a public LMS URL.
- External project URLs are `https://crestviewacademy.pk/`, `https://www.teleco-solutions.com/`, and `https://www.110solutions.com.au/`.
- Do not use em dashes in visible copy, metadata, titles, labels, or image alternative text.
- Do not invent statistics, certifications, testimonials, project results, or technical features.
- Preserve the existing vinext structure and `@openai/sites-vite-plugin` integration.

---

## File structure

- Create `app/data/projects.ts`: authoritative project records and `Project` type.
- Create `app/components/SiteHeader.tsx`: shared Abdul Moiz identity and route navigation.
- Create `app/components/SiteFooter.tsx`: shared route links and team delivery statement.
- Create `app/components/ContactCTA.tsx`: shared Fiverr-focused closing section.
- Modify `app/page.tsx`: Home route with personal positioning, capabilities, selected projects, and team delivery.
- Create `app/about/page.tsx`: About route with professional focus, skills, working approach, and team capabilities.
- Create `app/projects/page.tsx`: complete four-project archive with verified links.
- Modify `app/layout.tsx`: site-wide Abdul Moiz metadata.
- Modify `app/globals.css`: shared three-route styling and responsive layouts.
- Modify `tests/rendered-html.test.mjs`: route renderer and requirement-level assertions.

### Task 1: Shared project data and route expectations

**Files:**
- Create: `app/data/projects.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `type Project = { slug: string; title: string; category: string; description: string; capabilities: string[]; href: string | null; visual: "academy" | "teleco" | "solutions" | "lms"; image?: string; imageAlt?: string }`
- Produces: `export const projects: Project[]`
- Consumes: `/school-lms-dashboard.png`

- [ ] **Step 1: Write failing multi-route and project tests**

Add a path-aware renderer and assertions:

```js
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

test("renders Home, About, and Projects routes", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
  }
});

test("projects route contains every verified project and link", async () => {
  const html = await (await render("/projects")).text();
  for (const title of ["Crest View Academy", "Teleco Solutions", "110 Solutions", "School LMS"]) {
    assert.match(html, new RegExp(title));
  }
  for (const href of ["https://crestviewacademy.pk/", "https://www.teleco-solutions.com/", "https://www.110solutions.com.au/"]) {
    assert.match(html, new RegExp(href.replaceAll(".", "\\\\.")));
  }
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test`

Expected: FAIL because `/about`, `/projects`, and the 110 Solutions project do not exist.

- [ ] **Step 3: Create the authoritative project module**

Implement `app/data/projects.ts` with four literal records. Use `href: null` for the LMS, `image: "/school-lms-dashboard.png"`, and the existing descriptive copy as the starting point.

- [ ] **Step 4: Run the focused test and confirm it still fails for missing routes**

Run: `npm test`

Expected: FAIL on missing `/about` and `/projects`. The data module must compile without adding route behavior yet.

- [ ] **Step 5: Commit**

```bash
git add app/data/projects.ts tests/rendered-html.test.mjs
git commit -m "test: define portfolio routes and project records"
```

### Task 2: Shared Abdul Moiz site shell

**Files:**
- Create: `app/components/SiteHeader.tsx`
- Create: `app/components/SiteFooter.tsx`
- Create: `app/components/ContactCTA.tsx`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `SiteHeader(): JSX.Element`
- Produces: `SiteFooter(): JSX.Element`
- Produces: `ContactCTA(): JSX.Element`
- Consumes: route hrefs `/`, `/about`, `/projects`, and `/#contact`

- [ ] **Step 1: Add failing shared-shell tests**

```js
test("every route identifies Abdul Moiz and links all routes", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const html = await (await render(route)).text();
    assert.match(html, /Abdul Moiz/);
    assert.match(html, /href="\/"/);
    assert.match(html, /href="\/about"/);
    assert.match(html, /href="\/projects"/);
  }
});

test("110 Solutions is never used as the site owner", async () => {
  for (const route of ["/", "/about"]) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /class="brand"[^>]*>[\\s\\S]*?110 Solutions/);
  }
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because the current shared identity is 110 Solutions and shared route links do not exist.

- [ ] **Step 3: Implement the shared shell**

Use an `AM` circular monogram followed by `Abdul Moiz`. Header links are Home, About, Projects, and Contact. Footer links repeat the three routes. `ContactCTA` uses the current generic Fiverr URL until the user supplies a profile-specific URL.

- [ ] **Step 4: Update site-wide metadata**

Set the layout metadata title to `Abdul Moiz | Web Development, Cybersecurity & SEO` and describe custom systems and team-supported delivery without unsupported claims.

- [ ] **Step 5: Run tests**

Run: `npm test`

Expected: shared shell tests pass. Route tests may still fail until Tasks 3 and 4.

- [ ] **Step 6: Commit**

```bash
git add app/components app/layout.tsx tests/rendered-html.test.mjs
git commit -m "feat: add Abdul Moiz shared portfolio shell"
```

### Task 3: Home page positioning and service expansion

**Files:**
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `projects` from `app/data/projects.ts`
- Consumes: `SiteHeader`, `SiteFooter`, and `ContactCTA`
- Produces: Home route content and links to `/projects`

- [ ] **Step 1: Add the failing Home requirements test**

```js
test("home positions Abdul across every requested capability", async () => {
  const html = await (await render("/")).text();
  for (const phrase of ["Web development", "Cybersecurity", "SEO", "Custom systems", "Team delivery"]) {
    assert.match(html, new RegExp(phrase, "i"));
  }
  assert.match(html, /href="\/projects"/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because cybersecurity, SEO, and custom systems are missing.

- [ ] **Step 3: Rebuild the Home page**

Use the shared shell. Replace agency-first copy with Abdul-first positioning. Add five capability rows: web development, cybersecurity, SEO, custom systems, and team delivery. Show three selected project previews sourced from the shared project array and link the section to `/projects`.

- [ ] **Step 4: Run tests and verify GREEN for Home**

Run: `npm test`

Expected: Home requirements pass. About and Projects requirements may remain RED.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: reposition Home for Abdul Moiz services"
```

### Task 4: About page

**Files:**
- Create: `app/about/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter`, and `ContactCTA`
- Produces: `/about` route with route-specific `metadata`

- [ ] **Step 1: Add the failing About requirements test**

```js
test("about explains professional focus, process, and team capabilities", async () => {
  const html = await (await render("/about")).text();
  assert.match(html, /Professional focus/i);
  assert.match(html, /Working approach/i);
  assert.match(html, /Team capabilities/i);
  assert.match(html, /<title>About Abdul Moiz/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL with a missing `/about` route or missing headings.

- [ ] **Step 3: Implement About**

Create a personal introduction, capability grid, four-step working approach, and team capability section. Avoid a portrait because none was supplied. Export metadata with title `About Abdul Moiz | Digital Solutions & Team` and a factual description.

- [ ] **Step 4: Run tests and verify GREEN for About**

Run: `npm test`

Expected: About requirements pass.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add Abdul Moiz About page"
```

### Task 5: Projects page and verified outbound links

**Files:**
- Create: `app/projects/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `projects` and `Project` from `app/data/projects.ts`
- Consumes: `SiteHeader`, `SiteFooter`, and `ContactCTA`
- Produces: `/projects` route with four rendered project records and route metadata

- [ ] **Step 1: Add the failing Projects behavior tests**

```js
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
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because `/projects` is missing.

- [ ] **Step 3: Implement Projects**

Map all four shared records into alternating case-study sections. Render `View live website` only when `project.href` is non-null. For the LMS, render its image and a contact link. Export metadata titled `Projects | Abdul Moiz`.

- [ ] **Step 4: Run the complete route test suite**

Run: `npm test`

Expected: all route, identity, capability, project, link, and metadata tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/projects/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add complete Projects page"
```

### Task 6: Shared responsive styling and em dash enforcement

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: class names from all three route components.
- Produces: consistent desktop and mobile presentation.

- [ ] **Step 1: Add failing copy safety tests**

```js
test("visible HTML and metadata contain no em dashes", async () => {
  for (const route of ["/", "/about", "/projects"]) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /—/);
  }
});
```

- [ ] **Step 2: Run tests and verify the current route state**

Run: `npm test`

Expected: PASS for the em dash test if copy is clean. If it passes immediately, retain it as a regression guard and verify the separate source scan in Step 5 catches any source-level character.

- [ ] **Step 3: Extend the design system**

Add `.page-hero`, `.capability-grid`, `.about-grid`, `.approach-list`, `.projects-list`, `.project-preview`, and responsive rules. Reuse the existing neutral, black, orange, blue, amber, and violet palette. Add a distinct green treatment for the 110 Solutions project.

- [ ] **Step 4: Run full tests and build**

Run: `npm test`

Expected: build completes and every test passes.

- [ ] **Step 5: Run source-level copy scans**

Run:

```bash
rg -n "—|Your Studio|110 Solutions portfolio home|110 Solutions</span>" app tests
```

Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css tests/rendered-html.test.mjs
git commit -m "style: complete responsive three-page portfolio"
```

### Task 7: Final verification and publishing handoff

**Files:**
- Modify: `README.md`
- Regenerate: `.openai/portfolio-site.tar.gz`

**Interfaces:**
- Consumes: final built `dist/`, `.openai/hosting.json`, and current Git commit.
- Produces: verified deployment archive and private review deployment when upload permission is approved.

- [ ] **Step 1: Update the README**

Document the three routes, five capabilities, four projects, and the remaining Fiverr profile URL replacement.

- [ ] **Step 2: Run final verification**

Run:

```bash
npm test
rg -n "—|Your Studio|110 Solutions portfolio home|110 Solutions</span>" app tests
git status --short
```

Expected: tests pass, the scan returns no matches, and only intentional local packaging or starter example files remain untracked.

- [ ] **Step 3: Commit the handoff documentation**

```bash
git add README.md
git commit -m "docs: update Abdul Moiz portfolio handoff"
```

- [ ] **Step 4: Package the validated build**

Run the Sites packaging helper with the project root and `.openai/portfolio-site.tar.gz` output path. Confirm the archive contains `dist/server/index.js` and `.openai/hosting.json`.

- [ ] **Step 5: Publish when permission is available**

Push the exact committed source, save one version using the matching commit SHA and archive, deploy privately, and poll until the deployment succeeds or fails.
