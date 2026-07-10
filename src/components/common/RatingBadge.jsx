export function RatingBadge({ rating, size = 'md' }) {
  const isHigh = rating >= 4.0;
  const bg = isHigh ? 'bg-green-700' : 'bg-yellow-600';
  const sizes = {
    sm: 'text-[10px] px-1 py-0.5 gap-0.5',
    md: 'text-xs px-1.5 py-0.5 gap-1',
    lg: 'text-sm px-2 py-1 gap-1',
  };

  return (
    <span
      className={`inline-flex items-center font-bold text-white rounded-md ${bg} ${sizes[size]}`}
    >
      <svg width={size === 'lg' ? 14 : 12} height={size === 'lg' ? 14 : 12} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 1l2.928 5.934 6.55.95-4.739 4.62 1.118 6.526L10 16.982l-5.857 3.048 1.118-6.526L.522 7.884l6.55-.95L10 1z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}
