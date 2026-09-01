/**
 * Deployment-aware helpers.
 *
 * The site is a fully static bundle, so both the public origin and the path it
 * is mounted under have to be baked in at build time:
 *
 *   - `SITE_URL`  – the canonical origin, used for canonical/OG/sitemap URLs.
 *                   Override with `VITE_SITE_URL` when deploying a preview.
 *   - `BASE_PATH` – "/" for a custom domain or Cloudflare Pages, "/<repo>/"
 *                   for a GitHub Pages project page. Vite supplies it as
 *                   `import.meta.env.BASE_URL`.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://allseasonsgolfcarts.com"
).replace(/\/+$/, "");

export const BASE_PATH = import.meta.env.BASE_URL || "/";

/** Resolve a file in `client/public` to a URL that works under any base path. */
export function asset(publicPath: string): string {
  return `${BASE_PATH.replace(/\/+$/, "")}/${publicPath.replace(/^\/+/, "")}`;
}

/** Origin plus base path, i.e. the URL the site is actually served from. */
export const DEPLOY_URL = `${SITE_URL}${BASE_PATH.replace(/\/+$/, "")}`;

/** Absolute https URL for a route, for canonical tags, OG tags and sitemaps. */
export function canonicalUrl(routePath: string): string {
  const suffix = routePath === "/" ? "/" : `/${routePath.replace(/^\/+/, "")}`;
  return `${DEPLOY_URL}${suffix}`;
}

/**
 * Absolute URL for a bundled or public asset. Hashed assets already carry the
 * base path (Vite rewrites them), public files do not.
 */
export function absoluteAssetUrl(assetPath: string): string {
  if (/^https?:\/\//.test(assetPath)) return assetPath;
  const withBase = assetPath.startsWith(BASE_PATH)
    ? assetPath
    : asset(assetPath);
  return `${SITE_URL}${withBase}`;
}
