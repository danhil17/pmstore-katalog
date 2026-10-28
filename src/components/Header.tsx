"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { store } from "@/lib/store";

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang Toko" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 rounded-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-[13px] font-bold tracking-tight text-white">
            {store.shortName}
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{store.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Utama">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`min-h-11 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, item.href)
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-canvas hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {store.contactUrl ? (
            <a
              href={store.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Hubungi Admin
            </a>
          ) : null}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium ${
                  isActive(pathname, item.href) ? "bg-accent-soft text-accent" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
