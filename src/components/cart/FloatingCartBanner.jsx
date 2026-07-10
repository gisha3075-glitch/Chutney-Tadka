import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export function FloatingCartBanner() {
  const { itemCount, subtotal, currentRestaurant } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 animate-slide-up">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/checkout"
          className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-2xl px-5 py-3.5 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-white text-green-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div>
              <p className="font-bold text-sm">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} | ₹{subtotal}
              </p>
              <p className="text-xs text-white/80">
                {currentRestaurant?.name || 'Your cart'}
              </p>
            </div>
          </div>
          <span className="font-bold text-sm flex items-center gap-1">
            View Cart
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
