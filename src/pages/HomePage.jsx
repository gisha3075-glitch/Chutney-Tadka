import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bike, Store, ChevronRight, SlidersHorizontal, Zap, Star, Leaf, BadgePercent, IndianRupee, X } from 'lucide-react';
import { FOOD_CATEGORIES, TOP_BRANDS, COLLECTIONS } from '../data/mockData';
import { useRestaurants, useInfiniteScroll } from '../hooks/useRestaurant';
import { RestaurantCard } from '../components/restaurant/RestaurantCard';
import { HomeFeedSkeleton, HorizontalScrollSkeleton } from '../components/skeletons/Skeletons';
import { handleImageError } from '../lib/images';

const FILTER_OPTIONS = [
  { key: 'sortBy', label: 'Sort by', icon: SlidersHorizontal, type: 'sort' },
  { key: 'fastDelivery', label: 'Fast Delivery', icon: Zap, type: 'toggle' },
  { key: 'minRating', label: 'Rating 4.0+', icon: Star, type: 'toggle', value: 4.0 },
  { key: 'pureVeg', label: 'Pure Veg', icon: Leaf, type: 'toggle' },
  { key: 'offersOnly', label: 'Offers', icon: BadgePercent, type: 'toggle' },
  { key: 'maxCost', label: 'Less than ₹300', icon: IndianRupee, type: 'toggle', value: 300 },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'deliveryTime', label: 'Delivery Time' },
  { value: 'costLow', label: 'Cost: Low to High' },
  { value: 'costHigh', label: 'Cost: High to Low' },
];

export function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [mode, setMode] = useState('delivery');
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    fastDelivery: false,
    minRating: null,
    pureVeg: false,
    offersOnly: false,
    maxCost: null,
  });
  const [sortOpen, setSortOpen] = useState(false);

  const { restaurants, loading, loadingMore, hasMore, loadMore, total } = useRestaurants(filters, query);
  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !loading);

  // The API searches the full catalogue before the infinite-scroll limit is applied.
  const filteredRestaurants = restaurants;

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => k !== 'sortBy' && v !== null && v !== false).length,
    [filters]
  );

  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? (key === 'minRating' ? null : false) : value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Master Toggle: Delivery / Dining Out */}
      <div className="sticky top-16 z-40 bg-gray-50/90 backdrop-blur-sm pt-4 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setMode('delivery')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                mode === 'delivery'
                  ? 'bg-white text-brand-500 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <Bike size={16} />
              Delivery
            </button>
            <button
              onClick={() => setMode('dining')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                mode === 'dining'
                  ? 'bg-white text-brand-500 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <Store size={16} />
              Dining Out
            </button>
          </div>
        </div>
      </div>

      {mode === 'dining' ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mb-4">
            <Store size={36} className="text-brand-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-sm">
            We're working on bringing dining-out experiences to Chutney&amp;Tadka. Stay tuned!
          </p>
        </div>
      ) : (
        <>
          {/* What's on your mind? */}
          <Section title="What's on your mind?">
            {loading ? (
              <HorizontalScrollSkeleton count={8} />
            ) : (
              <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
                {FOOD_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className="flex flex-col items-center gap-2 shrink-0 group"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-brand-400 transition-all">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Section>

          {/* Top Brands */}
          <Section title="Top Brands for you">
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
              {TOP_BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  className="flex flex-col items-center gap-2 shrink-0 group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-brand-400 transition-all">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center max-w-[80px] truncate">
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* Collections */}
          <Section title="Collections">
            <p className="text-sm text-gray-500 mb-3">Curated lists of the best restaurants in your city</p>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {COLLECTIONS.map((col) => (
                <div
                  key={col.id}
                  className="relative shrink-0 w-56 h-36 rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-bold text-sm">{col.title}</h4>
                    <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                      {col.subtitle}
                      <ChevronRight size={12} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Filters Row */}
          <div className="sticky top-[112px] z-30 bg-gray-50/90 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 border-y border-gray-200">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {FILTER_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isActive = opt.type === 'toggle'
                  ? (filters[opt.key] !== null && filters[opt.key] !== false)
                  : filters.sortBy !== 'relevance';
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      if (opt.type === 'sort') {
                        setSortOpen(!sortOpen);
                      } else {
                        toggleFilter(opt.key, opt.value);
                      }
                    }}
                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={14} />
                    {opt.label}
                    {opt.key === 'sortBy' && sortOpen && (
                      <X size={12} className="ml-0.5" />
                    )}
                  </button>
                );
              })}
              {activeFilterCount > 0 && (
                <button
                  onClick={() =>
                    setFilters({
                      sortBy: 'relevance',
                      fastDelivery: false,
                      minRating: null,
                      pureVeg: false,
                      offersOnly: false,
                      maxCost: null,
                    })
                  }
                  className="shrink-0 px-3 py-2 text-sm font-semibold text-brand-500 hover:text-brand-600"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            {sortOpen && (
              <div className="absolute top-full left-4 sm:left-6 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-down">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, sortBy: opt.value }));
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      filters.sortBy === opt.value ? 'text-brand-500 font-bold' : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Feed */}
          <div className="py-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              {total} restaurant{total === 1 ? '' : 's'} {query ? `for "${query}"` : 'near you'}
            </h2>
            {loading ? (
              <HomeFeedSkeleton count={6} />
            ) : filteredRestaurants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-gray-400 text-lg font-semibold">No restaurants found</p>
                <p className="text-gray-500 text-sm mt-1">Try a different search or adjust your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                  {filteredRestaurants.map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>

                {/* Infinite scroll sentinel */}
                {hasMore && (
                  <div ref={sentinelRef} className="py-8">
                    {loadingMore && <HomeFeedSkeleton count={3} />}
                  </div>
                )}

                {!hasMore && (
                  <div className="text-center py-8 text-gray-400 text-sm font-medium">
                    You've reached the end — that's all {total} restaurants!
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="py-6">
      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}
