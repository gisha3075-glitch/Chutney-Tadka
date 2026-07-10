import { useCart } from '../../context/CartContext';
import { VegIcon } from '../common/VegIcon';
import { Plus, Minus, Flame } from 'lucide-react';
import { handleImageError } from '../../lib/images';

export function DishCard({ dish, restaurantId, restaurantName }) {
  const { getQuantity, tryAddItem, incrementItem, decrementItem } = useCart();
  const fullDish = { ...dish, restaurantId, restaurantName };
  const quantity = getQuantity(dish.id);

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
      {/* Left: text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <VegIcon isVeg={dish.isVeg} size={16} />
          {dish.isSpicy && (
            <Flame size={14} className="text-red-500" />
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
          {dish.name}
        </h3>

        {/* Bestseller / Must Try tags */}
        {(dish.isBestseller || dish.isMustTry) && (
          <div className="flex gap-1.5 mt-1.5">
            {dish.isBestseller && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Bestseller
              </span>
            )}
            {dish.isMustTry && (
              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded">
                Must Try
              </span>
            )}
          </div>
        )}

        <p className="font-semibold text-gray-800 text-sm mt-1.5">₹{dish.price}</p>

        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {dish.description}
        </p>

        {dish.rating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-green-700 font-bold text-xs flex items-center gap-0.5">
              <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1l2.928 5.934 6.55.95-4.739 4.62 1.118 6.526L10 16.982l-5.857 3.048 1.118-6.526L.522 7.884l6.55-.95L10 1z" />
              </svg>
              {dish.rating}
            </span>
          </div>
        )}
      </div>

      {/* Right: image + ADD button */}
      <div className="relative shrink-0">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-200">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ADD / counter button — overlapping bottom of image */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {quantity === 0 ? (
            <button
              onClick={() => tryAddItem(fullDish)}
              className="bg-white border-2 border-brand-500 text-brand-500 font-bold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-brand-50 transition-colors min-w-[72px]"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-white border-2 border-brand-500 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => decrementItem(dish.id)}
                className="px-2.5 py-2 text-brand-500 hover:bg-brand-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-brand-500 text-sm min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => incrementItem(dish.id)}
                className="px-2.5 py-2 text-brand-500 hover:bg-brand-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
