export function VegIcon({ isVeg, size = 16, className = '' }) {
  const color = isVeg ? '#16a34a' : '#dc2626';
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span
        className="flex items-center justify-center w-full h-full border-2 rounded-[3px]"
        style={{ borderColor: color }}
      >
        <span
          className="rounded-full"
          style={{ width: size * 0.5, height: size * 0.5, backgroundColor: color }}
        />
      </span>
    </span>
  );
}
