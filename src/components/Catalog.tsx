"use client";

import { Smartphone, Laptop, Tablet, Headphones, LayoutGrid } from "lucide-react";
import { useMemo, useState } from "react";
import { CatalogSkeleton } from "@/components/CatalogSkeleton";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { ProductDialog } from "@/components/ProductDialog";
import { filterProducts, uniqueCategories, uniqueConditions } from "@/lib/filter";
import type { CatalogResponse, Product, SortOption } from "@/lib/types";

type CatalogProps = {
  initial: CatalogResponse;
  heading?: string;
  compactHero?: boolean;
};

export function Catalog({ initial, heading = "Katalog", compactHero = false }: CatalogProps) {
  const [catalog, setCatalog] = useState<CatalogResponse>(initial);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [selected, setSelected] = useState<Product | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const products = useMemo(() => (catalog.ok ? catalog.products : []), [catalog]);
  const categories = useMemo(() => uniqueCategories(products), [products]);
  const conditions = useMemo(() => uniqueConditions(products), [products]);
  const visible = useMemo(
    () => filterProducts(products, query, category, condition, sort),
    [products, query, category, condition, sort],
  );

  const hasActiveFilters = Boolean(query || category || condition || sort !== "default");

  async function retry() {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      const payload = (await response.json()) as CatalogResponse;
      setCatalog(payload);
    } catch {
      setCatalog({
        ok: false,
        message: "Katalog sedang tidak dapat dimuat. Silakan coba lagi dalam beberapa saat.",
      });
    } finally {
      setLoading(false);
    }
  }

  function resetFilters() {
    setQuery("");
    setCategory("");
    setCondition("");
    setSort("default");
  }

  return (
    <section id="katalog" className={compactHero ? "pt-8" : "pt-10"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{heading}</h2>
            <p className="mt-1 text-sm text-muted">
              {catalog.ok
                ? `${visible.length} dari ${products.length} produk`
                : "Katalog belum dapat ditampilkan"}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2" aria-label="Pilih kategori">
          {["", ...categories].map((item) => {
            const Icon = !item ? LayoutGrid : /iphone|phone/i.test(item) ? Smartphone : /mac|laptop/i.test(item) ? Laptop : /ipad|tablet/i.test(item) ? Tablet : Headphones;
            return <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${category === item ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-ink hover:text-ink"}`}><Icon size={18} strokeWidth={1.5} />{item || "Semua produk"}</button>;
          })}
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-white p-4 md:grid-cols-[1.4fr_repeat(3,minmax(0,0.7fr))_auto]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Cari produk</span>
            <span className="relative block">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nama, kategori, atau atribut"
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-3 text-sm outline-none transition focus:border-accent"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Kategori</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-accent"
            >
              <option value="">Semua</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {conditions.length > 0 ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Kondisi</span>
              <select
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-accent"
              >
                <option value="">Semua</option>
                {conditions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="hidden md:block" />
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Urutkan</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-accent"
            >
              <option value="default">Default</option>
              <option value="name-asc">Nama A–Z</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:text-muted"
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="mt-8">
          {loading ? <CatalogSkeleton /> : null}

          {!loading && !catalog.ok ? (
            <div className="rounded-card border border-line bg-white px-6 py-12 text-center">
              <p className="text-base font-semibold">Katalog belum dapat dimuat</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{catalog.message}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Coba Lagi
              </button>
            </div>
          ) : null}

          {!loading && catalog.ok && products.length === 0 ? (
            <div className="rounded-card border border-line bg-white px-6 py-12 text-center">
              <p className="text-base font-semibold">Katalog masih kosong</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                Belum ada produk yang dapat ditampilkan dari data toko saat ini.
              </p>
            </div>
          ) : null}

          {!loading && catalog.ok && products.length > 0 && visible.length === 0 ? (
            <div className="rounded-card border border-line bg-white px-6 py-12 text-center">
              <p className="text-base font-semibold">Tidak ada hasil</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                Tidak ada produk yang cocok dengan pencarian atau filter. Ubah kata kunci atau reset filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 text-sm font-semibold"
              >
                <CloseIcon className="h-4 w-4" />
                Reset Filter
              </button>
            </div>
          ) : null}

          {!loading && catalog.ok && visible.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDetail={(item, button) => {
                    setTrigger(button);
                    setSelected(item);
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <ProductDialog product={selected} onClose={() => setSelected(null)} returnFocusTo={trigger} />
    </section>
  );
}
