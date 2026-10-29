import { normalizeRows } from "@/lib/normalize";
import type { CatalogResponse, Product } from "@/lib/types";

const SHEETDB_BASE = process.env.SHEETDB_URL || "https://sheetdb.io/api/v1/jo2cdtmssq1bk";

/** Tab katalog publik. Sheet default API adalah data internal owner, bukan katalog. */
export const CATALOG_SHEETS = [
  { name: "KATALOG_WEBSITE", prefix: "catalog" },
] as const;

const FETCH_TIMEOUT_MS = 12000;

async function fetchSheet(sheet: string): Promise<unknown> {
  const url = new URL(SHEETDB_BASE);
  url.searchParams.set("sheet", sheet);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(process.env.SHEETDB_TOKEN ? { Authorization: `Bearer ${process.env.SHEETDB_TOKEN}` } : {}),
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Catalog request failed");
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error("Invalid catalog response");
    return payload;
  } finally {
    clearTimeout(timer);
  }
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
    const chunks = await Promise.all(
      CATALOG_SHEETS.map(async (sheet) => {
        const payload = await fetchSheet(sheet.name);
        return normalizeRows(payload, sheet.prefix);
      }),
    );

    const products = uniqueById(chunks.flat());
    return {
      ok: true,
      products,
      sourceSheet: CATALOG_SHEETS.map((sheet) => sheet.name).join(", "),
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      ok: false,
      message: "Katalog sedang tidak dapat dimuat. Silakan coba lagi dalam beberapa saat.",
    };
  }
}
