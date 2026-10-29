import { Catalog } from "@/components/Catalog";
import { Hero } from "@/components/Hero";
import { getCatalog } from "@/lib/products";

export default async function HomePage() {
  const catalog = await getCatalog();
  return (
    <>
      <Hero />
      <div className="pb-12">
        <Catalog initial={catalog} heading="Pilihan produk PM STORE" compactHero />
      </div>
    </>
  );
}
