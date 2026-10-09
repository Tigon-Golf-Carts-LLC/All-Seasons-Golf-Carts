/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin used for canonical tags, OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
  /**
   * Where lead forms POST: the TIGON webhook URL, or "/api/lead" on Cloudflare
   * Pages. Empty falls back to a mailto: link.
   */
  readonly VITE_LEAD_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
