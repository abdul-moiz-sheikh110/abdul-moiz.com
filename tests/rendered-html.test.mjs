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
  assert.match(html, /Start a Fiverr conversation/);
});

test("home positions Abdul across every requested capability", async () => {
  const html = await (await render("/")).text();
  for (const phrase of ["Web development", "Cybersecurity", "SEO", "Custom systems", "Team delivery"]) {
    assert.match(html, new RegExp(phrase, "i"));
  }
  assert.match(html, /href="\/projects"/);
});

test("about explains professional focus, process, and team capabilities", async () => {
  const html = await (await render("/about")).text();
  assert.match(html, /Professional background/i);
  assert.match(html, /Professional focus/i);
  assert.match(html, /Working approach/i);
  assert.match(html, /Team capabilities/i);
  assert.match(html, /<title>About Abdul Moiz/);
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
