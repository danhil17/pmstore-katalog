"use client";

import { useState } from "react";

type ProductImageProps = {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
};

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`relative overflow-hidden bg-[#F3F5F8] ${className}`}>
      {showImage ? (
        // External sheet URLs vary; keep native img to avoid remote-host surprises.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src ?? undefined}
          alt={alt}
          className="h-full w-full object-contain p-4"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6">
          <svg viewBox="0 0 80 96" className="h-16 w-16 text-[#C5CDD8]" aria-hidden="true">
            <rect x="22" y="8" width="36" height="80" rx="8" fill="currentColor" opacity="0.35" />
            <rect x="28" y="14" width="24" height="4" rx="2" fill="#fff" />
            <rect x="30" y="76" width="20" height="4" rx="2" fill="#fff" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
