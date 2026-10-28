import { ChatButton } from "@/components/ChatButton";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  onDetail: (product: Product, trigger: HTMLButtonElement) => void;
};

export function ProductCard({ product, onDetail }: ProductCardProps) {
  const attributes = [product.condition, product.capacity, product.stockLabel].filter(Boolean);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="aspect-square w-full">
        <ProductImage src={product.imageUrl} alt={product.name} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="line-clamp-2 min-h-[44px] text-sm font-semibold leading-5 text-ink sm:text-[15px]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-accent sm:text-base">{product.priceLabel}</p>
        {attributes.length > 0 ? (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{attributes.join(" · ")}</p>
        ) : (
          <div className="mt-1 min-h-5" aria-hidden="true" />
        )}
        <div className="mt-auto flex flex-col gap-2 pt-4 lg:flex-row">
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-canvas lg:flex-1"
            onClick={(event) => onDetail(product, event.currentTarget)}
          >
            Lihat Detail
          </button>
          <ChatButton href={product.chatUrl} className="w-full lg:flex-1" />
        </div>
      </div>
    </article>
  );
}
