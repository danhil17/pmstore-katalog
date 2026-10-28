export function parsePrice(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
  }

  const raw = String(value).trim();
  if (!raw) return null;
  if (/hubungi|tanya|n\/a|^-$/i.test(raw)) return null;

  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  const amount = Number(digits);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function displayPrice(value: number | null): string {
  if (value === null) return "Hubungi Admin";
  return formatRupiah(value);
}
