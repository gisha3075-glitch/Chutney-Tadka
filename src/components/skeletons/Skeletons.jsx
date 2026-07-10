export function RestaurantCardSkeleton() {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl aspect-video shimmer-bg" />
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 rounded shimmer-bg" />
        <div className="h-4 w-1/2 rounded shimmer-bg" />
        <div className="h-4 w-2/3 rounded shimmer-bg" />
      </div>
    </div>
  );
}

export function HomeFeedSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HorizontalScrollSkeleton({ count = 6 }) {
  return (
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-24 h-24 rounded-full shimmer-bg" />
          <div className="h-3 w-16 rounded shimmer-bg" />
        </div>
      ))}
    </div>
  );
}

export function DishCardSkeleton() {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-100">
      <div className="flex-1 space-y-2">
        <div className="h-4 w-6 rounded shimmer-bg" />
        <div className="h-5 w-3/4 rounded shimmer-bg" />
        <div className="h-4 w-1/4 rounded shimmer-bg" />
        <div className="h-3 w-full rounded shimmer-bg" />
        <div className="h-3 w-5/6 rounded shimmer-bg" />
      </div>
      <div className="w-28 h-28 rounded-xl shimmer-bg shrink-0" />
    </div>
  );
}

export function MenuPageSkeleton() {
  return (
    <div>
      <div className="h-48 w-full shimmer-bg rounded-2xl mb-6" />
      <div className="h-12 w-full shimmer-bg rounded-lg mb-6" />
      {Array.from({ length: 5 }).map((_, i) => (
        <DishCardSkeleton key={i} />
      ))}
    </div>
  );
}
