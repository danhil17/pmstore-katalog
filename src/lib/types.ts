export type StockStatus = "in_stock" | "out_of_stock" | "unknown";

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  priceValue: number | null;
  priceLabel: string;
  imageUrl: string | null;
  chatUrl: string | null;
  category: string | null;
  condition: string | null;
  capacity: string | null;
  stockLabel: string | null;
  stockStatus: StockStatus;
  description: string | null;
  specs: ProductSpec[];
  searchText: string;
};

export type CatalogResult = {
  ok: true;
  products: Product[];
  sourceSheet: string;
  fetchedAt: string;
};

export type CatalogError = {
  ok: false;
  message: string;
};

export type CatalogResponse = CatalogResult | CatalogError;

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";
