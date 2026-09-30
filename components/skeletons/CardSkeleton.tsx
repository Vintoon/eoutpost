export function CardSkeleton() {
  return (
    <div className="glass rounded-xl2 p-4">
      <div className="skeleton mb-4 h-44 w-full" />
      <div className="skeleton mb-2 h-4 w-3/4" />
      <div className="skeleton mb-2 h-4 w-1/2" />
      <div className="skeleton h-8 w-24" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
