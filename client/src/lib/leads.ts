/**
 * Lead delivery to TIGON IOT (Webhook Flows).
 *
 * Every lead form on the site posts multipart/form-data to `VITE_LEAD_ENDPOINT`,
 * which is baked in at build time:
 *
 *   - GitHub Pages: the TIGON webhook URL itself
 *     (https://tigoniot.com/hooks/<key>), from the `TIGON_WEBHOOK_URL`
 *     repository secret. The browser posts straight to TIGON, unsigned.
 *   - Cloudflare Pages: "/api/lead". functions/api/lead.ts signs the request
 *     with the webhook's own secret (server side) and forwards it to TIGON.
 *
 * The webhook URL is never committed to the repository because the key in it
 * acts as a password. The signing secret never reaches the browser at all.
 *
 * With no endpoint configured the form falls back to a pre-filled email so it
 * still works on a fresh fork or a local build.
 */

export const CONTACT_EMAIL = "info@allseasonsgolfcarts.com";
export const CONTACT_PHONE = "(844) 884-6744";
export const CONTACT_PHONE_HREF = "tel:1-844-884-6744";

/** Must always be sent with exactly this value (TIGON requirement). */
export const FORM_NAME = "Contact form";

/** Spam trap. Real visitors never see it; it must be posted empty. */
export const HONEYPOT_FIELD = "website";

export const IMAGE_FIELDS = ["image_1", "image_2", "image_3"] as const;
export const MAX_IMAGE_MB = 10;
export const IMAGE_ACCEPT =
  "image/jpeg,image/png,image/gif,image/webp,image/heic,image/heif,.heic,.heif";
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|heic|heif)$/i;

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export const TRACKING_FIELDS = [
  "url",
  "referrer",
  ...TRACKED_PARAMS,
  "ga_client_id",
] as const;

const FIRST_TOUCH_KEY = "tigon_first_touch";
const FIRST_TOUCH_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

const endpoint = (import.meta.env.VITE_LEAD_ENDPOINT || "").trim();

/** True when leads are POSTed to TIGON instead of opening an email. */
export const hasLeadEndpoint = endpoint.length > 0;

type FirstTouch = Record<(typeof TRACKED_PARAMS)[number], string>;

interface StoredFirstTouch {
  ts: number;
  v: Partial<FirstTouch>;
}

function readStoredFirstTouch(): StoredFirstTouch | null {
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(FIRST_TOUCH_KEY) || "null",
    ) as StoredFirstTouch | null;
    if (!saved || !saved.ts || Date.now() - saved.ts > FIRST_TOUCH_MAX_AGE_MS) {
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

/**
 * First-touch attribution: the first utm_* / gclid / fbclid values seen are
 * kept for 30 days. Called once on page load (so a visitor who lands on any
 * page with a campaign link and then navigates to a form is still attributed)
 * and again right before each submission.
 */
export function captureFirstTouch(): FirstTouch {
  const current: Partial<FirstTouch> = {};
  let found = false;
  try {
    const query = new URLSearchParams(window.location.search);
    for (const key of TRACKED_PARAMS) {
      const value = query.get(key);
      if (value) {
        current[key] = value;
        found = true;
      }
    }
  } catch {
    // Malformed query string: nothing to record.
  }

  let saved = readStoredFirstTouch();
  if (!saved && found) {
    saved = { ts: Date.now(), v: current };
    try {
      window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(saved));
    } catch {
      // Private mode or storage disabled: fall back to this page's values.
    }
  }

  const out = {} as FirstTouch;
  for (const key of TRACKED_PARAMS) {
    out[key] = saved?.v[key] || current[key] || "";
  }
  return out;
}

/** Google Analytics client id from the _ga cookie: GA1.1.123456.789012 -> 123456.789012 */
function gaClientId(): string {
  const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/);
  if (!match) return "";
  const parts = decodeURIComponent(match[1]).split(".");
  return parts.length >= 4 ? parts.slice(-2).join(".") : "";
}

export function trackingValues(): Record<(typeof TRACKING_FIELDS)[number], string> {
  return {
    url: window.location.href,
    referrer: document.referrer || "",
    ...captureFirstTouch(),
    ga_client_id: gaClientId(),
  };
}

export const digitsOnly = (value: string) => value.replace(/\D/g, "");
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an error message for a photo, or null when it is acceptable. */
export function imageError(file: File): string | null {
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    return `Each photo must be smaller than ${MAX_IMAGE_MB} MB.`;
  }
  if (!file.type.startsWith("image/") && !IMAGE_EXTENSIONS.test(file.name)) {
    return "Photos must be JPG, PNG, GIF, WEBP or HEIC.";
  }
  return null;
}

function buildMailtoUrl(data: FormData): string {
  const value = (name: string) => String(data.get(name) || "").trim();
  const lines = [
    `Name: ${value("first_name")} ${value("last_name")}`,
    `Email: ${value("email")}`,
    `Phone: ${value("phone1")}`,
    value("phone2") && `Alternate phone: ${value("phone2")}`,
    value("address") && `Address: ${value("address")}`,
    value("zip_code") && `ZIP code: ${value("zip_code")}`,
    `Interested in: ${[value("brand"), value("model")].filter(Boolean).join(" ") || "Not specified"}`,
    value("vin_number") && `VIN: ${value("vin_number")}`,
    value("sku_number") && `Stock # / SKU: ${value("sku_number")}`,
    `Page: ${value("url")}`,
    "",
    "Message:",
    value("comments"),
  ].filter((line) => line !== "");
  const params = new URLSearchParams({
    subject: `Website Inquiry: ${value("first_name")} ${value("last_name")}`,
    body: lines.join("\n"),
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export type LeadResult = { delivered: true } | { delivered: false };

export class LeadError extends Error {}

/**
 * Sends one lead. `data` is the form's FormData; tracking fields, form_name and
 * the spam trap are set here, and empty file inputs are dropped.
 */
export async function submitLead(data: FormData): Promise<LeadResult> {
  for (const field of IMAGE_FIELDS) {
    const file = data.get(field);
    if (!(file instanceof File) || file.size === 0 || !file.name) {
      data.delete(field);
    }
  }
  const tracking = trackingValues();
  for (const key of TRACKING_FIELDS) data.set(key, tracking[key]);
  data.set("form_name", FORM_NAME);
  if (!data.has(HONEYPOT_FIELD)) data.set(HONEYPOT_FIELD, "");
  // The server records these itself.
  data.delete("user_ip");
  data.delete("user_agent");

  if (!hasLeadEndpoint) {
    window.location.href = buildMailtoUrl(data);
    return { delivered: false };
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
  } catch {
    throw new LeadError(
      `We couldn't reach our server. Please check your connection and try again, or call us at ${CONTACT_PHONE}.`,
    );
  }

  let body: { ok?: boolean; error?: string; message?: string } | null = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.status === 429) {
    throw new LeadError(
      "Too many attempts. Please wait a minute and then try again.",
    );
  }
  if (!response.ok || !body || body.ok !== true) {
    throw new LeadError(
      body?.error ||
        body?.message ||
        `Sorry, something went wrong. Please try again or call us at ${CONTACT_PHONE}.`,
    );
  }
  return { delivered: true };
}
