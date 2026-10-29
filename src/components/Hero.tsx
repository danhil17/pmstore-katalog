import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Smartphone } from "lucide-react";

// Product photograph from a retail listing, used as a design placeholder.
// Replace with a PM STORE-owned or licensed hero photo before final publication.
const HERO_PHOTO = "https://re.now/cdn/shop/files/OPM-3146_Apple_iPhone17ProMax_blue_image1_df5a3eed-3930-4238-a97d-6751f4318212.png?v=1768291851&width=1000";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f9fafc] via-[#eef3f9] to-[#dce7f5]">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[570px] lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#3d648e]">PM STORE LUMAJANG · GADGET PILIHAN</p>
          <h1 className="mt-5 text-[42px] font-semibold leading-[1.07] tracking-[-.055em] text-[#172334] sm:text-6xl lg:text-[72px]">
            Lebih premium.<br/><span className="text-[#5d7898]">Lebih personal.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#536276] sm:text-base lg:mx-0">
            Jelajahi pilihan iPhone dan gadget original di PM Store. Temukan produk yang kamu sukai, lalu konsultasikan ketersediaannya langsung dengan admin kami.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="#katalog" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0765d8] px-7 text-sm font-semibold text-white transition hover:bg-[#004dab]">
              Jelajahi Katalog <ArrowUpRight size={16}/>
            </Link>
            <a href="https://wa.me/6281234560429?text=Halo%20Admin%20PM%20Store%2C%20saya%20ingin%20bertanya%20tentang%20ketersediaan%20produk." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#a8bad0] bg-white/80 px-7 text-sm font-semibold text-[#1d3b60] transition hover:bg-white">
              Tanya Ketersediaan
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-[#536276] lg:justify-start sm:gap-6">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={16}/> Produk original</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={16}/> Pilihan bergaransi</span>
            <span className="inline-flex items-center gap-1.5"><Smartphone size={16}/> Konsultasi admin</span>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
          <div className="absolute inset-[12%_3%] rounded-full bg-[#ccdbed]/80 blur-3xl" aria-hidden="true"/>
          <div className="relative w-full overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-6 shadow-[0_25px_90px_-40px_rgba(28,62,105,.35)] sm:p-10">
            <div className="absolute left-6 top-6 rounded-full bg-[#e7f0fb] px-3 py-1 text-[11px] font-semibold text-[#315b87]">Pilihan Premium</div>
            {/* A genuine product listing photo, not an illustrative phone drawing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_PHOTO} alt="Foto produk iPhone 17 Pro Max warna Deep Blue sebagai contoh tampilan premium" className="mx-auto mt-5 aspect-square w-full max-w-[440px] object-contain" loading="eager"/>
            <p className="mt-1 text-center text-xs text-[#71839b]">Visual contoh produk · Ketersediaan mengikuti katalog PM Store</p>
          </div>
        </div>
      </div>
    </section>
  );
}
