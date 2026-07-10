import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, MapPin, Leaf, Search } from 'lucide-react';
import { useRestaurant } from '../hooks/useRestaurant';
import { MenuNav } from '../components/menu/MenuNav';
import { DishCard } from '../components/menu/DishCard';
import { OffersCarousel } from '../components/restaurant/OffersCarousel';
import { MenuPageSkeleton } from '../components/skeletons/Skeletons';
import { FloatingCartBanner } from '../components/cart/FloatingCartBanner';
import { RatingBadge } from '../components/common/RatingBadge';

export function RestaurantDetailPage() {
  const { id } = useParams();
  const { restaurant, loading } = useRestaurant(id);
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuSections = useMemo(() => {
    if (!restaurant?.menu) return [];
    return Object.keys(restaurant.menu);
  }, [restaurant]);

  const filteredMenu = useMemo(() => {
    if (!restaurant?.menu) return {};
    const result = {};
    for (const [section, dishes] of Object.entries(restaurant.menu)) {
      let filtered = dishes;
      if (vegOnly) {
        filtered = filtered.filter((d) => d.isVeg);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        );
      }
      if (filtered.length > 0) {
        result[section] = filtered;
      }
    }
    return result;
  }, [restaurant, vegOnly, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <MenuPageSkeleton />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-gray-400 text-lg font-semibold">Restaurant not found</p>
        <Link to="/" className="text-brand-500 font-bold mt-2 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="hover:text-brand-500 transition-colors cursor-pointer">Lucknow</span>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-semibold truncate">{restaurant.name}</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {restaurant.name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <RatingBadge rating={restaurant.rating} size="lg" />
            <span className="text-sm text-gray-500 font-medium">
              {restaurant.reviewCount.toLocaleString()} reviews
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {restaurant.cuisines.join(' • ')}
          </p>

          {restaurant.pureVeg && (
            <div className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
              <Leaf size={14} />
              Pure Veg
            </div>
          )}

          {/* Delivery time & distance box */}
          <div className="mt-4 bg-gray-100 rounded-xl p-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">{restaurant.deliveryTime}</p>
                <p className="text-xs text-gray-500">Delivery Time</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">{restaurant.distance}</p>
                <p className="text-xs text-gray-500">Distance</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900">₹{restaurant.costForTwo}</p>
              <p className="text-xs text-gray-500">For two</p>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Carousel */}
      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-4">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">Offers</h2>
          <OffersCarousel offers={restaurant.offers} />
        </div>
      )}

      {/* Veg Only toggle + search */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-green-600 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-6" />
          </div>
          <span className="text-sm font-bold text-gray-700">Veg Only</span>
        </label>

        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
      </div>

      {/* Sticky Menu Navigation */}
      {menuSections.length > 0 && (
        <div className="mt-4">
          <MenuNav sections={menuSections} restaurantId={restaurant.id} />
        </div>
      )}

      {/* Menu Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {Object.keys(filteredMenu).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg font-semibold">No dishes found</p>
            <p className="text-gray-500 text-sm mt-1">Try changing your filters</p>
          </div>
        ) : (
          Object.entries(filteredMenu).map(([section, dishes]) => (
            <div key={section} id={`menu-${restaurant.id}-${section}`} className="scroll-mt-44">
              <h3 className="text-lg font-extrabold text-gray-900 mt-6 mb-2 pb-2 border-b border-gray-200">
                {section} ({dishes.length})
              </h3>
              <div>
                {dishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    restaurantId={restaurant.id}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Cart Banner */}
      <FloatingCartBanner />
    </div>
  );
}
