import type { Metadata } from "next";
import Link from "next/link";
import { store } from "@/lib/store";

export const metadata: Metadata = {
  title: `Tentang Toko — ${store.name}`,
  description: store.description,
};

export default function TentangPage() {
  const details = [
    { label: "Lokasi", value: store.location },
    { label: "Alamat", value: store.address },
    { label: "Jam operasional", value: store.hours },
    { label: "Telepon", value: store.phone },
    { label: "Email", value: store.email },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Tentang toko</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{store.name}</h1>
        <p className="mt-4 text-base leading-7 text-muted">{store.description}</p>

        {details.length > 0 ? (
          <dl className="mt-8 divide-y divide-line rounded-card border border-line">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-sm font-medium sm:col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {store.socials.length > 0 ? (
          <ul className="mt-6 space-y-2 text-sm">
            {store.socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm leading-6 text-muted">
            Alamat lengkap, jam operasional, nomor kontak toko, dan tautan media sosial belum dilengkapi pada
            konfigurasi situs. Gunakan tombol chat pada masing-masing produk jika tautannya tersedia.
          </p>
        )}

        <Link
          href="/katalog"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Lihat Katalog
        </Link>
      </div>
    </section>
  );
}
