export function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-card border border-line bg-white">
          <div className="aspect-square animate-pulse bg-[#ECEFF3]" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#ECEFF3]" />
            <div className="h-4 w-2/5 animate-pulse rounded bg-[#ECEFF3]" />
            <div className="h-11 animate-pulse rounded-xl bg-[#ECEFF3]" />
            <div className="h-11 animate-pulse rounded-xl bg-[#ECEFF3]" />
          </div>
        </div>
      ))}
    </div>
  );
}
