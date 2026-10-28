import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { getCatalog } from "@/lib/products";
import { store } from "@/lib/store";

export const metadata: Metadata = {
  title: `Katalog — ${store.name}`,
  description: "Cari dan bandingkan produk gadget PM STORE, lalu hubungi admin untuk ketersediaan.",
};

export default async function KatalogPage() {
  const catalog = await getCatalog();

  return (
    <div className="border-b border-line bg-white pb-4 pt-8">
      <Catalog initial={catalog} heading="Katalog PM STORE" />
    </div>
  );
}
