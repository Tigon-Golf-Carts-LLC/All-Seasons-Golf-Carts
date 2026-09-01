/**
 * Contact form delivery for a static deployment.
 *
 * GitHub Pages cannot run server code, so submissions go to whatever endpoint
 * is configured at build time via `VITE_CONTACT_ENDPOINT`:
 *
 *   - a form service such as Formspree / Web3Forms / Getform, or
 *   - "/api/contact", which the Cloudflare Pages Function in functions/
 *     handles when the site is deployed there.
 *
 * With no endpoint configured the form falls back to opening a pre-filled
 * email, so it still works on a plain GitHub Pages deployment.
 */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  model: string;
  message: string;
}

export const CONTACT_EMAIL = "info@allseasonsgolfcarts.com";
export const CONTACT_PHONE = "(844) 884-6744";

export const MODEL_LABELS: Record<string, string> = {
  xt4: "EVolution D-MAX XT4 (4-Seat)",
  xt6: "EVolution D-MAX XT6 (6-Seat)",
  both: "Both Models",
  general: "General Inquiry",
};

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || "").trim();

/** True when submissions are POSTed somewhere instead of opening an email. */
export const hasContactEndpoint = endpoint.length > 0;

function subjectFor(data: ContactFormData): string {
  const interest = MODEL_LABELS[data.model] || "General Inquiry";
  return `Website Inquiry: ${data.firstName} ${data.lastName} - ${interest}`;
}

function bodyFor(data: ContactFormData): string {
  return [
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Interested In: ${MODEL_LABELS[data.model] || "Not specified"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export function buildMailtoUrl(data: ContactFormData): string {
  const params = new URLSearchParams({
    subject: subjectFor(data),
    body: bodyFor(data),
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export type ContactResult =
  | { delivered: true }
  | { delivered: false; mailtoUrl: string };

export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactResult> {
  if (!hasContactEndpoint) {
    const mailtoUrl = buildMailtoUrl(data);
    window.location.href = mailtoUrl;
    return { delivered: false, mailtoUrl };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...data,
      subject: subjectFor(data),
      // Field names used by common form services so the same payload works
      // without per-provider handling.
      name: `${data.firstName} ${data.lastName}`,
      _subject: subjectFor(data),
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact endpoint responded with ${response.status}`);
  }

  return { delivered: true };
}
