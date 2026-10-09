/**
 * Cloudflare Pages Function at POST /api/lead: signs each lead with this
 * webhook's own secret and forwards it to TIGON IOT (Webhook Flows).
 *
 * Only used when the site is deployed to Cloudflare Pages *and* the client is
 * built with `VITE_LEAD_ENDPOINT=/api/lead`. On GitHub Pages there is no
 * server, so the browser posts to the TIGON webhook directly (unsigned).
 *
 * Environment variables (Pages project -> Settings -> Variables and Secrets,
 * type "Secret" — never commit either value):
 *   TIGON_WEBHOOK_URL     https://tigoniot.com/hooks/<key>
 *   TIGON_WEBHOOK_SECRET  The webhook's signing secret (TIGON IOT -> Webhook
 *                         Flows -> Webhooks -> this webhook -> Setup packet ->
 *                         Developers -> Create secret)
 *   ALLOWED_ORIGIN        Optional, defaults to https://allseasonsgolfcarts.com
 *
 * The request body is forwarded byte-for-byte, so multipart photo uploads keep
 * their boundary and the signature covers exactly what TIGON receives:
 *   X-Tigon-Signature: sha256=<hex HMAC-SHA256 of the raw body>
 */
interface Env {
  TIGON_WEBHOOK_URL?: string;
  TIGON_WEBHOOK_SECRET?: string;
  ALLOWED_ORIGIN?: string;
}

const DEFAULT_ORIGIN = "https://allseasonsgolfcarts.com";
// Three 10 MB photos plus the text fields.
const MAX_BODY_BYTES = 32 * 1024 * 1024;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

async function sign(secret: string, body: ArrayBuffer): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, body));
  return Array.from(mac, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { TIGON_WEBHOOK_URL, TIGON_WEBHOOK_SECRET } = env;
  if (!TIGON_WEBHOOK_URL || !TIGON_WEBHOOK_SECRET) {
    console.error("Lead forwarding is not configured: missing TIGON_* variables");
    return json({ ok: false, error: "The form is not configured yet. Please call us." }, 503);
  }

  // Browsers always send Origin on a cross-site or form POST; only accept our own.
  const origin = request.headers.get("origin");
  const allowed = [
    (env.ALLOWED_ORIGIN || DEFAULT_ORIGIN).replace(/\/+$/, ""),
    new URL(request.url).origin,
  ];
  if (origin && !allowed.includes(origin)) {
    return json({ ok: false, error: "Origin not allowed" }, 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (
    !/^(multipart\/form-data|application\/x-www-form-urlencoded|application\/json)\b/i.test(
      contentType,
    )
  ) {
    return json({ ok: false, error: "Unsupported content type" }, 415);
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Photos are too large. Each must be under 10 MB." }, 413);
  }

  const signature = await sign(TIGON_WEBHOOK_SECRET, body);
  const headers: Record<string, string> = {
    "content-type": contentType,
    accept: "application/json",
    "x-tigon-signature": `sha256=${signature}`,
  };
  // Pass the visitor's browser and IP along so TIGON isn't left recording
  // Cloudflare's. These are headers, not body fields, so they aren't signed.
  const userAgent = request.headers.get("user-agent");
  const ip = request.headers.get("cf-connecting-ip");
  if (userAgent) headers["user-agent"] = userAgent;
  if (ip) headers["x-forwarded-for"] = ip;

  let upstream: Response;
  try {
    upstream = await fetch(TIGON_WEBHOOK_URL, { method: "POST", headers, body });
  } catch (error) {
    console.error("Could not reach TIGON", error);
    return json({ ok: false, error: "Sorry, something went wrong. Please try again or call us." }, 502);
  }

  // Relay TIGON's answer ({"ok":true,"id":...} or {"error":...}) unchanged.
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") || "application/json" },
  });
}
