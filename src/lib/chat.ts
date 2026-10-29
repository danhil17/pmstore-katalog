const STORE_WHATSAPP = "6281234560429";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "web.whatsapp.com",
  "whatsapp.com",
  "www.whatsapp.com",
]);

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

export function sanitizeExternalUrl(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isWhatsAppUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase();
  if (WHATSAPP_HOSTS.has(host)) return true;
  return host.endsWith(".whatsapp.com");
}

function hasMessageParam(url: URL): boolean {
  return Boolean(url.searchParams.get("text") || url.searchParams.get("body"));
}

export function buildAdminChatUrl(rawUrl: string | null, productName: string): string | null {
  const sanitized = sanitizeExternalUrl(rawUrl);
  if (!sanitized) {
    const message = `Halo Admin PM Store, saya tertarik dengan ${productName}. Apakah stoknya masih tersedia?`;
    return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
  }

  const url = new URL(sanitized);
  if (!isWhatsAppUrl(url) || hasMessageParam(url)) {
    return url.toString();
  }

  const message = `Halo Admin PM Store, saya tertarik dengan ${productName}. Apakah masih tersedia?`;
  url.searchParams.set("text", message);
  return url.toString();
}
