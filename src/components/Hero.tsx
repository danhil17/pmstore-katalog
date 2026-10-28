import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">PM STORE · Lumajang</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            Temukan gadget yang pas untuk kebutuhanmu.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted sm:text-[17px]">
            Jelajahi pilihan produk PM Store, cek detailnya, lalu konsultasikan pilihanmu dengan admin.
          </p>
          <div className="mt-7">
            <Link
              href="/katalog"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Lihat Katalog
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
          <div className="aspect-[4/3] rounded-card border border-line bg-canvas p-6 shadow-card">
            <div className="flex h-full items-center justify-center rounded-[22px] border border-line bg-white">
              <svg viewBox="0 0 220 260" className="h-[210px] w-auto text-ink">
                <rect x="62" y="18" width="96" height="224" rx="22" fill="#fff" stroke="currentColor" strokeWidth="3" />
                <rect x="86" y="28" width="48" height="8" rx="4" fill="#E3E7EE" />
                <rect x="74" y="52" width="72" height="112" rx="8" fill="#EAF2FF" />
                <rect x="80" y="176" width="56" height="8" rx="4" fill="#E3E7EE" />
                <rect x="88" y="190" width="40" height="6" rx="3" fill="#1F6FEB" opacity="0.85" />
                <circle cx="110" cy="216" r="7" fill="none" stroke="#E3E7EE" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
