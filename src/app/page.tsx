import { Catalog } from "@/components/Catalog";
import { Hero } from "@/components/Hero";
import { getCatalog } from "@/lib/products";

export default async function HomePage() {
  const catalog = await getCatalog();

  return (
    <>
      <Hero />
      <Catalog initial={catalog} heading="Katalog" compactHero />
    </>
  );
}
