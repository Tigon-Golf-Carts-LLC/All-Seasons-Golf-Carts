/**
 * Cloudflare Pages Function backing the contact form at POST /api/contact.
 *
 * Only used when the site is deployed to Cloudflare Pages *and* the client is
 * built with `VITE_CONTACT_ENDPOINT=/api/contact`. On GitHub Pages there is no
 * server, so the form uses a hosted form service or a mailto: fallback instead.
 *
 * Required environment variables (Pages project -> Settings -> Variables):
 *   RESEND_API_KEY  API key for https://resend.com
 *   CONTACT_FROM    Verified sender, e.g. "website@allseasonsgolfcarts.com"
 *   CONTACT_TO      Comma-separated recipients
 */
interface Env {
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
}

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  model?: string;
  message?: string;
}

const MODEL_LABELS: Record<string, string> = {
  xt4: "EVolution D-MAX XT4 (4-Seat)",
  xt6: "EVolution D-MAX XT6 (6-Seat)",
  both: "Both Models",
  general: "General Inquiry",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      char
    ] as string,
  );

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ success: false, message: "Invalid JSON body" }, 400);
  }

  const firstName = (payload.firstName || "").trim();
  const lastName = (payload.lastName || "").trim();
  const email = (payload.email || "").trim();
  const message = (payload.message || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return json(
      { success: false, message: "First name, last name, email and message are required" },
      400,
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: "Invalid email address" }, 400);
  }

  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    console.error("Contact form is not configured: missing RESEND_* variables");
    return json({ success: false, message: "Contact form is not configured" }, 503);
  }

  const interest = payload.model
    ? MODEL_LABELS[payload.model] || payload.model
    : "Not specified";
  const phone = (payload.phone || "").trim() || "Not provided";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO.split(",").map((address) => address.trim()),
      reply_to: email,
      subject: `New Contact Form: ${firstName} ${lastName} - ${interest}`,
      text: [
        "New Contact Form Submission",
        "",
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Interested In: ${interest}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: [
        "<h2>New Contact Form Submission</h2>",
        `<p><strong>Name:</strong> ${escapeHtml(`${firstName} ${lastName}`)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
        `<p><strong>Interested In:</strong> ${escapeHtml(interest)}</p>`,
        "<hr />",
        `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the message", response.status, await response.text());
    return json({ success: false, message: "Failed to send message" }, 502);
  }

  return json({ success: true, message: "Contact form submitted successfully" }, 201);
}
