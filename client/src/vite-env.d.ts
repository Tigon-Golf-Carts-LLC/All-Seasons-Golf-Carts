/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin used for canonical tags, OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
  /** Where the contact form POSTs. Empty falls back to a mailto: link. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
