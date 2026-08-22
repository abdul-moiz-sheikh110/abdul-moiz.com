import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const fetchHandler = typeof worker === "function" ? worker : worker.fetch.bind(worker);
  return fetchHandler(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the professional 110 Solutions portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>Web Design &amp; Development Studio \| Portfolio<\/title>/i);
  assert.match(html, /110 Solutions/);
  assert.match(html, /Crest View Academy/);
  assert.match(html, /Teleco Solutions/);
  assert.match(html, /School LMS/);
  assert.match(html, /UI\/UX design/);
  assert.match(html, /Start a Fiverr conversation/);
});

test("removes every starter and generic studio placeholder", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /Your Studio|Starter Project|codex-preview|react-loading-skeleton/i);
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
