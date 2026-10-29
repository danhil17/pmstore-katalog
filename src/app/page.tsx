import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CreditCard, Headphones, Laptop, PackageCheck, ShieldCheck, Smartphone, Tablet, Truck, Watch, Gift } from "lucide-react";
import { Catalog } from "@/components/Catalog";
import { Hero } from "@/components/Hero";
import { getCatalog } from "@/lib/products";

const categories = [
  { title: "iPhone", detail: "Pilih iPhone favorit", icon: Smartphone, href: "/katalog?category=iPhone" },
  { title: "iPad", detail: "Produktivitas & hiburan", icon: Tablet, href: "/katalog?category=iPad" },
  { title: "MacBook", detail: "Untuk kerja & belajar", icon: Laptop, href: "/katalog?category=MacBook" },
  { title: "Accessories", detail: "Pelengkap gadgetmu", icon: Headphones, href: "/katalog?category=Accessories" },
];
const advantages = [
  { label: "Pilihan original", detail: "Informasi kondisi transparan", icon: ShieldCheck },
  { label: "Garansi produk", detail: "Sesuai keterangan unit", icon: BadgeCheck },
  { label: "Pilihan pembayaran", detail: "Tanyakan metode ke admin", icon: CreditCard },
  { label: "Konsultasi langsung", detail: "WhatsApp Admin PM Store", icon: Headphones },
];

export default async function HomePage() {
  const catalog = await getCatalog();
  return (
    <>
      <Hero />
      <section className="border-b border-[#e4eaf2] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-7 sm:px-8 lg:grid-cols-4">
          {advantages.map(({label,detail,icon:Icon}) => (
            <div key={label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5fc] text-[#2765ad]"><Icon size={20} strokeWidth={1.7}/></span>
              <div><p className="text-sm font-semibold text-[#172334]">{label}</p><p className="mt-1 text-xs leading-5 text-[#66768b]">{detail}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#4776ad]">Jelajahi produk</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Pilih Kategori</h2></div>
          <Link href="/katalog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0765d8] hover:underline">Lihat semua <ArrowUpRight size={16}/></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map(({title,detail,href,icon:Icon}) => (
            <Link key={title} href={href} className="group flex min-h-[170px] flex-col items-center justify-center rounded-[24px] border border-[#e1e7f0] bg-gradient-to-b from-[#f8fafc] to-[#eef3f9] p-5 text-center transition hover:-translate-y-1 hover:border-[#8ab2e5] hover:shadow-lg">
              <span className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white text-[#476b98] shadow-sm transition group-hover:text-[#0765d8]"><Icon size={36} strokeWidth={1.3}/></span>
              <span className="text-base font-semibold text-[#172334]">{title}</span><span className="mt-1 text-xs text-[#78869a]">{detail}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#101c30] px-7 py-10 text-white sm:px-12 sm:py-12">
          <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full bg-[#286eb9]/25 blur-3xl" aria-hidden="true"/>
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-[#9ec3f2]"><Gift size={17}/> Program promo PM Store</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Beli iPhone, Gratis Kesempatan Dapat iPad</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#c8d3e4]">Kenali program Beli iPhone Gratis iPad PM Store. Tanyakan ketentuan dan periode promo yang berlaku kepada admin.</p>
            <a href="https://wa.me/6281234560429?text=Halo%20Admin%20PM%20Store%2C%20saya%20ingin%20bertanya%20tentang%20program%20Beli%20iPhone%20Gratis%20iPad." target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#143154] hover:bg-[#eaf2ff]">Tanya Promo <ArrowUpRight size={16}/></a>
          </div>
        </div>
      </section>
      <div className="pb-12"><Catalog initial={catalog} heading="Pilihan Produk PM STORE" compactHero /></div>
    </>
  );
}
