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
| `VITE_LEAD_ENDPOINT` | *(unset)* | Where the lead forms POST: the TIGON IOT webhook URL, or `/api/lead` on Cloudflare Pages. Unset means the forms open a pre-filled email instead. |

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

## Lead forms (TIGON IOT Webhook Flows)

Every lead form sends to the site's own TIGON IOT webhook (Webhook Flows):

- **Contact page** (`/contact`): the full form.
- **Product pages** (`/evolution-d-max-xt4`, `/evolution-d-max-xt6`): **Call Now**
  and **Apply for Financing** buttons, with a **Get Pricing & Availability**
  button under them that opens the form in a modal. The **Get a Quote** and
  **Contact Us Today** buttons open the same modal. On these pages brand and
  model are pre-filled and read-only, and the selected color goes along as an
  extra `color` field.

The form lives in `client/src/components/LeadForm.tsx` (the modal is in
`LeadFormModal.tsx`), and sending and tracking live in `client/src/lib/leads.ts`.
Field names follow the TIGON spec exactly: `first_name`, `last_name`, `email`,
`phone1`, `phone2`, `address`, `zip_code`, `brand`, `model`, `vin_number`,
`sku_number`, `comments`, `image_1`–`image_3`. `form_name` is always
`Contact form`. Before each send the script fills in `url`, `referrer`, the
first-touch `utm_*`, `gclid` and `fbclid` (kept 30 days in localStorage), and
`ga_client_id`. A hidden `website` field is the spam trap and is always sent
empty. An extra `form_location` field records which form was used.

**Never commit the webhook URL or the signing secret.** This repository is
public, and the key in the URL works like a password.

### GitHub Pages (current setup): browser posts directly, unsigned

Add the webhook URL as a repository secret:
**Settings → Secrets and variables → Actions → Secrets → New repository secret**,
name `TIGON_WEBHOOK_URL`, value `https://tigoniot.com/hooks/<key>`. The deploy
workflow passes it to the build as `VITE_LEAD_ENDPOINT`. Without it the forms
fall back to a pre-filled email.

GitHub Pages cannot run server code, so it cannot sign requests. Leave
**Require signature** off in TIGON IOT for this setup, and never put the
signing secret in a GitHub Actions secret that the build reads: anything baked
into the build is downloadable by every visitor.

### Cloudflare Pages: signed server-side (recommended)

`functions/api/lead.ts` receives the form at `POST /api/lead`, signs the exact
raw body with `X-Tigon-Signature: sha256=<HMAC-SHA256>`, and forwards it to
TIGON. In the Pages project, under **Settings → Variables and Secrets**, add these
as type **Secret**:

| Name | Value |
| --- | --- |
| `TIGON_WEBHOOK_URL` | `https://tigoniot.com/hooks/<key>` |
| `TIGON_WEBHOOK_SECRET` | From TIGON IOT → Webhook Flows → Webhooks → this webhook → Setup packet → Developers → Create secret |

Add `VITE_LEAD_ENDPOINT=/api/lead` as a plain build variable, redeploy, send
a test lead, then turn on **Require signature** for the webhook in TIGON IOT.

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
    lib/leads.ts      Lead delivery to TIGON IOT + first-touch tracking
    pages/            Home, ModelXT4, ModelXT6, Contact, Financing, Blog,
                      BlogPost, LocationPage, not-found
    components/       Header, Footer, Seo, ColorSwatches, SpecTable,
                      FeatureCard, VehicleSchema, LeadForm,
                      LeadFormModal, ui/ (shadcn)
    data/             blogPosts.ts (8 posts), locations.ts (66 states/territories)
functions/api/        Cloudflare Pages Functions (signed lead forwarding)
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
