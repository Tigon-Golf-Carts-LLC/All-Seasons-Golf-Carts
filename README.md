# ALL Seasons Golf Carts

Marketing site for ALL Seasons Golf Carts (allseasonsgolfcarts.com), showcasing the
EVolution D-MAX XT4 and XT6 4X4 electric golf carts.

The site is a **fully static bundle** — no server, no database. It deploys to
GitHub Pages or Cloudflare Pages as-is.

## Technology stack

- **React 18 + TypeScript**, built with **Vite**
- **Wouter** for routing, **TailwindCSS** + **shadcn/ui** for styling
- **Pre-rendering at build time**: every route is written out as real HTML, so
  each URL returns 200 with complete markup and its own `<title>`, meta
  description, canonical and Open Graph tags — no SPA-fallback redirect tricks,
  and crawlers never need to run JavaScript.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload (http://localhost:5173) |
| `npm run build` | Builds and pre-renders the whole site into `dist/` |
| `npm run preview` | Serves the built `dist/` with Vite |
| `npm run check` | TypeScript type check |

## Build-time configuration

All configuration is baked in at build time, because a static host cannot read
runtime environment variables.

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_PATH` | `/` | Sub-path the site is served from. `/` for a custom domain, user page, or Cloudflare Pages; `<repo-name>` for a GitHub Pages project page. |
| `VITE_SITE_URL` | `https://allseasonsgolfcarts.com` | Origin used for canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt`. |
| `VITE_CONTACT_ENDPOINT` | *(unset)* | Where the contact form POSTs. Unset means the form opens a pre-filled email instead. |

## Deploying to GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes on every push to
`main`. To turn it on: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

The workflow figures out the base path and site URL by itself:

- **Custom domain** (the default here): `client/public/CNAME` contains
  `allseasonsgolfcarts.com`, so the site builds for the domain root. Point the
  domain's DNS at GitHub Pages and set the custom domain under Settings → Pages.
- **No custom domain**: delete `client/public/CNAME` and the workflow builds for
  `https://<owner>.github.io/<repo>/` with the matching base path.

### Why every URL works

GitHub Pages has no rewrite rules, so a single-page app normally 404s on deep
links. The build sidesteps that by emitting a real file per route:

- `dist/blog.html` and `dist/blog/index.html` — so both `/blog` and `/blog/`
  return 200 without a redirect
- `dist/404.html` — the fallback for anything unrecognised, which renders the
  in-app not-found page
- `dist/.nojekyll` — stops Jekyll from dropping files that start with `_`

## Deploying to Cloudflare Pages

Create a Pages project from this repo with:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variables**: `VITE_SITE_URL` (your domain). Leave `BASE_PATH`
  unset — Cloudflare Pages serves from the root.

`client/public/_headers` adds caching and security headers there (GitHub Pages
ignores the file).

## Contact form

A static host cannot send email, so the form has three modes:

1. **No `VITE_CONTACT_ENDPOINT`** (default) — the form opens the visitor's mail
   client with a pre-filled message to `info@allseasonsgolfcarts.com`. This
   always works, including on plain GitHub Pages.
2. **A hosted form service** — set `VITE_CONTACT_ENDPOINT` to a Formspree,
   Web3Forms or Getform URL. The form POSTs JSON there. In the GitHub Actions
   workflow this comes from the `CONTACT_ENDPOINT` repository variable
   (Settings → Secrets and variables → Actions → Variables).
3. **Cloudflare Pages Function** — build with
   `VITE_CONTACT_ENDPOINT=/api/contact` and `functions/api/contact.ts` sends the
   email through [Resend](https://resend.com). Set `RESEND_API_KEY`,
   `CONTACT_FROM` and `CONTACT_TO` in the Pages project's variables.

## Project structure

```
client/
  index.html          HTML shell; the <!--seo--> block is replaced per route
  public/             Static files copied verbatim (robots.txt, CNAME, icons, PDFs)
  src/
    routes.ts         Route manifest — the source of truth for pre-rendering,
                      per-page SEO metadata and the generated sitemap
    entry-server.tsx  Renders one route to HTML at build time
    main.tsx          Hydrates the pre-rendered markup in the browser
    lib/site.ts       Base-path and canonical-URL helpers
    lib/contact.ts    Contact form delivery
    pages/            Home, ModelXT4, ModelXT6, Contact, Financing, Blog,
                      BlogPost, LocationPage, not-found
    components/       Header, Footer, Seo, ColorSwatches, SpecTable,
                      FeatureCard, VehicleSchema, ui/ (shadcn)
    data/             blogPosts.ts (8 posts), locations.ts (66 states/territories)
functions/api/        Cloudflare Pages Functions (contact form)
scripts/build.ts      Build + pre-render + sitemap generation
attached_assets/      Product and blog imagery
```

### Adding a page

1. Add the page component under `client/src/pages/`.
2. Register the `<Route>` in `client/src/App.tsx`.
3. Add an entry to `client/src/routes.ts` with its title and description.

Step 3 is what gets the page pre-rendered, given SEO tags, and listed in
`sitemap.xml`.

## Models featured

1. **EVolution D-MAX XT4** — 4-passenger 4X4 golf cart (~$15,595 MSRP)
2. **EVolution D-MAX XT6** — 6-passenger 4X4 golf cart (~$17,595 MSRP)

Colors for both models: White, Black, Blue, Gray, Red, Sky Blue.

## Blog

Eight SEO-optimized articles live in `client/src/data/blogPosts.ts`, each with a
unique title, meta description, slug, hero image, full heading hierarchy,
internal links to the product pages, and `BlogPosting` structured data.
