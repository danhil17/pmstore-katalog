import Link from "next/link";
import { store } from "@/lib/store";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold tracking-tight">{store.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{store.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/katalog" className="hover:text-ink">
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-ink">
                Tentang Toko
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Informasi toko</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {store.location ? <li>{store.location}</li> : null}
            {store.address ? <li>{store.address}</li> : null}
            {store.hours ? <li>{store.hours}</li> : null}
            {store.phone ? <li>{store.phone}</li> : null}
            {store.socials.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
            {!store.address && !store.hours && !store.phone && store.socials.length === 0 ? (
              <li>Alamat, jam operasional, dan media sosial akan ditampilkan setelah dilengkapi.</li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        {store.name} · Katalog gadget {store.location}
      </div>
    </footer>
  );
}
