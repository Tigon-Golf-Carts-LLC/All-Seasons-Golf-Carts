/**
 * Static site build.
 *
 * 1. Builds the client bundle with Vite.
 * 2. Builds an SSR bundle and pre-renders every known route to real HTML, so
 *    that GitHub Pages (which has no server-side rewrite) can serve every URL
 *    with a 200 and crawlers get full markup and per-route meta tags.
 * 3. Emits 404.html (the SPA fallback for anything unrecognised), sitemap.xml,
 *    .nojekyll and the base-path/site-URL rewrites the static hosts need.
 */
import { build as viteBuild } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { RouteMeta } from "../client/src/routes";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(projectRoot, "dist");
const ssrOutDir = path.join(projectRoot, "node_modules/.cache/ssr-build");

const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;
const siteUrl = (
  process.env.VITE_SITE_URL || "https://allseasonsgolfcarts.com"
).replace(/\/+$/, "");

/** The origin+path the site is actually served from. */
const deployPrefix = `${siteUrl}${base.replace(/\/+$/, "")}`;

interface EntryServer {
  routes: RouteMeta[];
  render(path: string): { body: string; head: string };
}

async function buildClient() {
  console.log(`building client (base "${base}", site "${siteUrl}")...`);
  await viteBuild({ logLevel: "warn" });
}

async function buildSsrBundle(): Promise<EntryServer> {
  console.log("building pre-render bundle...");
  await viteBuild({
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });
  const entry = path.join(ssrOutDir, "entry-server.js");
  return (await import(pathToFileURL(entry).href)) as EntryServer;
}

function renderPage(
  template: string,
  rendered: { body: string; head: string },
): string {
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, rendered.head)
    .replace('<div id="root"></div>', `<div id="root">${rendered.body}</div>`);
}

/**
 * Write a route as both `<route>.html` and `<route>/index.html`. GitHub Pages
 * serves the first for `/route` and the second for `/route/`, so both spellings
 * return 200 instead of redirecting.
 */
async function writeRoute(routePath: string, html: string) {
  if (routePath === "/") {
    await fs.writeFile(path.join(outDir, "index.html"), html);
    return;
  }
  const relative = routePath.replace(/^\/+/, "");
  const dir = path.join(outDir, relative);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), html);
  await fs.writeFile(path.join(outDir, `${relative}.html`), html);
}

async function prerender(entryServer: EntryServer) {
  const template = await fs.readFile(path.join(outDir, "index.html"), "utf-8");

  for (const route of entryServer.routes) {
    await writeRoute(route.path, renderPage(template, entryServer.render(route.path)));
  }
  console.log(`pre-rendered ${entryServer.routes.length} routes`);

  // Fallback for unknown URLs. GitHub Pages and Cloudflare Pages both serve
  // 404.html for paths that do not resolve to a file, and the router then
  // renders the not-found page for whatever URL the visitor asked for.
  const notFound = renderPage(
    template,
    entryServer.render("/__not-found__"),
  );
  await fs.writeFile(path.join(outDir, "404.html"), notFound);
}

async function writeSitemap(routes: RouteMeta[]) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = `${deployPrefix}${route.path === "/" ? "/" : route.path}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${route.lastmod ?? today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  await fs.writeFile(path.join(outDir, "sitemap.xml"), sitemap);
  console.log(`wrote sitemap.xml with ${routes.length} urls`);
}

/**
 * The static text files under client/public hardcode the production origin and
 * root-relative paths. Rewrite them so preview and project-page deployments
 * point at themselves instead of at production.
 */
async function rewriteStaticReferences() {
  const files = [
    "robots.txt",
    "manifest.json",
    "site.webmanifest",
    "browserconfig.xml",
    "opensearch.xml",
    "humans.txt",
    "security.txt",
    "llms.txt",
    "ai.txt",
  ];

  for (const file of files) {
    const filePath = path.join(outDir, file);
    let content: string;
    try {
      content = await fs.readFile(filePath, "utf-8");
    } catch {
      continue;
    }

    let next = content.replaceAll("https://allseasonsgolfcarts.com", deployPrefix);
    if (base !== "/") {
      const prefix = base.replace(/\/+$/, "");
      // "src": "/icon.png" / "start_url": "/" / src="/icon.png"
      next = next
        .replace(/("(?:src|url|start_url|scope)":\s*")\/(?!\/)/g, `$1${prefix}/`)
        .replace(/(\ssrc=")\/(?!\/)/g, `$1${prefix}/`);
    }
    if (next !== content) await fs.writeFile(filePath, next);
  }
}

async function main() {
  await fs.rm(outDir, { recursive: true, force: true });
  await buildClient();
  const entryServer = await buildSsrBundle();
  await prerender(entryServer);
  await writeSitemap(entryServer.routes);
  await rewriteStaticReferences();
  // Stops GitHub Pages from running the output through Jekyll, which would
  // drop files and directories whose names begin with an underscore.
  await fs.writeFile(path.join(outDir, ".nojekyll"), "");
  console.log(`done -> ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
