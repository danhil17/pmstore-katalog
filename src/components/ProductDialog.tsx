"use client";

import { useEffect, useRef } from "react";
import { ChatButton } from "@/components/ChatButton";
import { CloseIcon } from "@/components/icons";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/types";

type ProductDialogProps = {
  product: Product | null;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
};

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProductDialog({ product, onClose, returnFocusTo }: ProductDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    const panel = panelRef.current;
    const previous = returnFocusTo;
    const closeButton = panel?.querySelector<HTMLElement>("[data-close]");
    closeButton?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => !node.hasAttribute("disabled") && node.tabIndex !== -1,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
      previous?.focus();
    };
  }, [product, onClose, returnFocusTo]);

  if (!product) return null;

  const specs = [
    product.condition ? { label: "Kondisi", value: product.condition } : null,
    product.capacity ? { label: "Kapasitas", value: product.capacity } : null,
    product.stockLabel ? { label: "Stok", value: product.stockLabel } : null,
    product.category ? { label: "Kategori", value: product.category } : null,
    ...product.specs,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Tutup detail produk"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-card border border-line bg-white shadow-pop sm:mx-4 sm:rounded-card"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-sm font-semibold">Detail produk</p>
          <button
            type="button"
            data-close
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-canvas"
            onClick={onClose}
          >
            <CloseIcon className="h-5 w-5" />
            <span className="sr-only">Tutup</span>
          </button>
        </div>
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="aspect-square overflow-hidden rounded-card border border-line">
              <ProductImage src={product.imageUrl} alt={product.name} className="h-full w-full" />
            </div>
            <div>
              <h2 id="product-dialog-title" className="text-xl font-semibold tracking-tight">
                {product.name}
              </h2>
              <p className="mt-2 text-lg font-semibold text-accent">{product.priceLabel}</p>
              {product.description ? (
                <p className="mt-4 text-sm leading-6 text-muted">{product.description}</p>
              ) : null}
              {specs.length > 0 ? (
                <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
                  {specs.map((spec) => (
                    <div key={`${spec.label}-${spec.value}`} className="grid grid-cols-2 gap-3 px-4 py-3 text-sm">
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-5 text-sm leading-6 text-muted">
                  Spesifikasi lengkap belum tersedia pada data katalog. Hubungi admin untuk konfirmasi detail unit.
                </p>
              )}
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <ChatButton href={product.chatUrl} className="w-full sm:flex-1" />
                <button
                  type="button"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-3 text-sm font-semibold sm:flex-1"
                  onClick={onClose}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
