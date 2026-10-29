import { normalizeRows } from "@/lib/normalize";
import type { CatalogResponse, Product } from "@/lib/types";

// This is a distinct, allowlisted catalog sheet, never the Owner workbook.
// Google Sheet must be explicitly shared as anyone-with-link VIEWER before release.
const PUBLIC_CATALOG_ID = "1nLFK_zAtJnbHmQZRV3n9jMtc3oiOQ6RZdFnFjypd0SI";
const PUBLIC_TAB = "KATALOG_PUBLIK";
const ALLOWED = ["Nama_Produk", "Harga", "Kategori", "Garansi", "Grade_Kondisi", "Battery_Health", "Foto_URL", "Status_Stok"];
const FETCH_TIMEOUT_MS = 12000;

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], value = "", quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (quoted && csv[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(value); value = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && csv[i + 1] === "\n") i++;
      row.push(value); rows.push(row); row = []; value = "";
    } else { value += char; }
  }
  if (quoted) throw new Error("Invalid public catalog CSV");
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

async function fetchPublicCatalog(): Promise<unknown[]> {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${PUBLIC_CATALOG_ID}/gviz/tq`);
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", PUBLIC_TAB);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal, next: { revalidate: 60 } });
    if (!response.ok) throw new Error("Public catalog not reachable");
    const csv = await response.text();
    if (csv.trimStart().startsWith("<")) throw new Error("Public catalog is not publicly readable");
    const [headers, ...values] = parseCsv(csv.replace(/^\uFEFF/, ""));
    if (!headers || !ALLOWED.every((key) => headers.includes(key))) throw new Error("Unexpected public catalog columns");
    return values.filter((row) => row.some((x) => x.trim())).map((row) =>
      Object.fromEntries(ALLOWED.map((key) => [key, row[headers.indexOf(key)] ?? ""])),
    );
  } finally { clearTimeout(timer); }
}

function uniqueById(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

export async function getCatalog(): Promise<CatalogResponse> {
  try {
    const products = uniqueById(normalizeRows(await fetchPublicCatalog(), "catalog"));
    return { ok: true, products, sourceSheet: PUBLIC_TAB, fetchedAt: new Date().toISOString() };
  } catch {
    return { ok: false, message: "Katalog sedang tidak dapat dimuat. Silakan coba lagi dalam beberapa saat." };
  }
}
