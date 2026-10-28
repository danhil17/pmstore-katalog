import type { Product, SortOption } from "@/lib/types";

export function uniqueCategories(products: Product[]): string[] {
  return Array.from(
    new Set(products.map((product) => product.category).filter((value): value is string => Boolean(value))),
  ).sort((a, b) => a.localeCompare(b, "id"));
}

export function uniqueConditions(products: Product[]): string[] {
  return Array.from(
    new Set(products.map((product) => product.condition).filter((value): value is string => Boolean(value))),
  ).sort((a, b) => a.localeCompare(b, "id"));
}

export function filterProducts(
  products: Product[],
  query: string,
  category: string,
  condition: string,
  sort: SortOption,
): Product[] {
  const needle = query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchQuery = !needle || product.searchText.includes(needle);
    const matchCategory = !category || product.category === category;
    const matchCondition = !condition || product.condition === condition;
    return matchQuery && matchCategory && matchCondition;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (sort === "name-asc" || sort === "default") {
      const byName = a.name.localeCompare(b.name, "id");
      if (sort === "name-asc") return byName;
    }

    if (sort === "price-asc" || sort === "price-desc") {
      const aPrice = a.priceValue;
      const bPrice = b.priceValue;
      if (aPrice === null && bPrice === null) return a.name.localeCompare(b.name, "id");
      if (aPrice === null) return 1;
      if (bPrice === null) return -1;
      return sort === "price-asc" ? aPrice - bPrice : bPrice - aPrice;
    }

    return 0;
  });

  return sorted;
}
