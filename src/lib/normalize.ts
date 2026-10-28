import { buildAdminChatUrl, sanitizeExternalUrl } from "@/lib/chat";
import { displayPrice, parsePrice } from "@/lib/price";
import type { Product, ProductSpec, StockStatus } from "@/lib/types";

type SheetRow = Record<string, unknown>;

const NAME_KEYS = [
  "nama",
  "name",
  "produk",
  "product",
  "tipe",
  "tipe iphone",
  "model",
  "title",
  "barang",
  "item",
  "sku / kode barang",
  "nama produk",
  "product name",
];

const PRICE_KEYS = [
  "harga",
  "price",
  "harga jual",
  "harga_jual",
  "hargajual",
  "hrg",
  "harga toko",
  "harga customer",
  "sell",
];

const IMAGE_KEYS = [
  "foto",
  "gambar",
  "image",
  "img",
  "photo",
  "thumbnail",
  "link gambar",
  "foto produk",
  "image url",
];

const CHAT_KEYS = [
  "chat",
  "wa",
  "whatsapp",
  "link",
  "link admin",
  "link_wa",
  "link wa",
  "chat admin",
  "url",
  "hubungi",
  "kontak",
];

const CATEGORY_KEYS = ["kategori", "category", "jenis", "tipe", "tipe iphone", "brand"];
const CONDITION_KEYS = ["kondisi", "condition", "grade", "status"];
const CAPACITY_KEYS = ["kapasitas", "storage", "memori", "memory", "gb", "internal", "varian"];
const STOCK_KEYS = ["stok", "stock", "qty", "jumlah", "sisa", "jumlah stok"];
const DESCRIPTION_KEYS = [
  "deskripsi",
  "description",
  "ket",
  "keterangan",
  "spec",
  "spesifikasi",
  "notes",
  "catatan",
];
const ID_KEYS = ["id", "sku", "kode", "kode barang", "sku / kode barang"];

const INTERNAL_KEY =
  /modal|supplier|hpp|qc|retur|password|secret|cost|owner|tagihan|anggaran|akses|username|token|key/i;

const SKIP_NAME =
  /^(tipe iphone|sku\s*\/?\s*kode barang|no\.?|nama produk|total( sku| unit order)?|database|sumber:|ketentuan)/i;

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/\s+/g, " ").trim();
}

function firstValue(row: SheetRow, aliases: string[]): unknown {
  const entries = Object.entries(row);
  for (const alias of aliases) {
    for (const [key, value] of entries) {
      if (normalizeKey(key) === alias && isPresent(value)) return value;
    }
  }
  return null;
}

function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  return String(value).trim() !== "";
}

function asText(value: unknown): string | null {
  if (!isPresent(value)) return null;
  return String(value).replace(/\s+/g, " ").trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function fallbackName(row: SheetRow): string | null {
  const values = Object.values(row)
    .map((value) => asText(value))
    .filter((value): value is string => Boolean(value));

  if (values.length === 1) return values[0];

  const plausible = values.find((value) => !SKIP_NAME.test(value) && !/^\d+$/.test(value));
  return plausible ?? null;
}

function parseStock(value: unknown): { label: string | null; status: StockStatus } {
  if (!isPresent(value)) return { label: null, status: "unknown" };
  const text = asText(value) ?? "";
  const lower = text.toLowerCase();

  if (["habis", "sold", "sold out", "empty", "out"].includes(lower)) {
    return { label: "Habis", status: "out_of_stock" };
  }
  if (["tersedia", "ready", "available", "ada"].includes(lower)) {
    return { label: "Tersedia", status: "in_stock" };
  }

  const numeric = Number(String(text).replace(/[^\d-]/g, ""));
  if (String(text).trim() !== "" && Number.isFinite(numeric) && /^-?\d+$/.test(String(text).trim())) {
    if (numeric === 0) return { label: "Habis", status: "out_of_stock" };
    if (numeric > 0) return { label: `Stok ${numeric}`, status: "in_stock" };
  }

  return { label: text, status: "unknown" };
}

function publicSpecs(row: SheetRow, usedKeys: Set<string>): ProductSpec[] {
  const specs: ProductSpec[] = [];
  for (const [key, value] of Object.entries(row)) {
    const normalized = normalizeKey(key);
    if (usedKeys.has(normalized)) continue;
    if (INTERNAL_KEY.test(normalized)) continue;
    if (/^pm store/.test(normalized)) continue;
    const text = asText(value);
    if (!text) continue;
    specs.push({ label: key.trim(), value: text });
  }
  return specs.slice(0, 12);
}

export function shouldSkipRow(name: string | null): boolean {
  if (!name) return true;
  if (SKIP_NAME.test(name)) return true;
  if (/^\d+$/.test(name)) return true;
  if (name.length < 2) return true;
  return false;
}

export function normalizeProduct(row: SheetRow, index: number, prefix: string): Product | null {
  const named = asText(firstValue(row, NAME_KEYS)) ?? fallbackName(row);
  if (shouldSkipRow(named) || !named) return null;

  const rawId = asText(firstValue(row, ID_KEYS));
  const id = `${prefix}-${rawId ? slugify(rawId) : slugify(named) || "item"}-${index + 1}`;

  const priceValue = parsePrice(firstValue(row, PRICE_KEYS));
  const imageUrl = sanitizeExternalUrl(firstValue(row, IMAGE_KEYS));
  const chatUrl = buildAdminChatUrl(asText(firstValue(row, CHAT_KEYS)), named);
  const category = asText(firstValue(row, CATEGORY_KEYS));
  const condition = asText(firstValue(row, CONDITION_KEYS));
  const capacity = asText(firstValue(row, CAPACITY_KEYS));
  const description = asText(firstValue(row, DESCRIPTION_KEYS));
  const stock = parseStock(firstValue(row, STOCK_KEYS));

  const usedKeys = new Set(
    [...NAME_KEYS, ...PRICE_KEYS, ...IMAGE_KEYS, ...CHAT_KEYS, ...ID_KEYS].map(normalizeKey),
  );

  const specs = publicSpecs(row, usedKeys);
  const inferredCategory = category && category.toLowerCase() !== named.toLowerCase() ? category : named;

  const searchText = [named, inferredCategory, condition, capacity, description, stock.label, ...specs.map((spec) => spec.value)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id,
    name: named,
    priceValue,
    priceLabel: displayPrice(priceValue),
    imageUrl,
    chatUrl,
    category: inferredCategory,
    condition,
    capacity,
    stockLabel: stock.label,
    stockStatus: stock.status,
    description,
    specs,
    searchText,
  };
}

export function normalizeRows(rows: unknown, prefix: string): Product[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row, index) => {
      if (!row || typeof row !== "object") return null;
      return normalizeProduct(row as SheetRow, index, prefix);
    })
    .filter((product): product is Product => Boolean(product));
}
