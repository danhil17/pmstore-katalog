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
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:border-[#bec6d0] hover:shadow-pop">
      <div className="relative aspect-square w-full p-3">
        {product.category ? <span className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-muted">{product.category}</span> : null}
        <ProductImage src={product.imageUrl} alt={product.name} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="line-clamp-2 min-h-[44px] text-sm font-semibold leading-5 text-ink sm:text-[15px]">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-semibold tracking-tight text-ink sm:text-xl">{product.priceLabel}</p>
        {attributes.length > 0 ? (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{attributes.join(" · ")}</p>
        ) : (
          <div className="mt-1 min-h-5" aria-hidden="true" />
        )}
        <div className="mt-auto flex flex-col gap-2 pt-5">
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-canvas lg:flex-1"
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
