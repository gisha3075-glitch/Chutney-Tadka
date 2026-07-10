import { useState, useEffect, useCallback, useRef } from 'react';
import { RESTAURANTS, getRestaurantById } from '../data/mockData';
import { api } from '../lib/api';

function matchesSearchQuery(restaurant, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const menuText = Object.entries(restaurant.menu || {})
    .flatMap(([sectionName, dishes]) => [
      sectionName,
      ...(Array.isArray(dishes) ? dishes.map((dish) => dish.name) : []),
    ])
    .filter(Boolean);

  return [restaurant.name, ...(restaurant.cuisines || []), ...menuText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery);
}

// Simulates async data fetching with loading state
export function useRestaurants(filters = {}, searchQuery = '') {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    api.getRestaurants({ ...filters, q: searchQuery.trim() })
      .then(({ restaurants: nextRestaurants }) => {
        if (!ignore) {
          setRestaurants(nextRestaurants);
          setVisibleCount(6);
        }
      })
      .catch(() => {
        if (!ignore) {
          // Keep search functional even if the API is unavailable or has not been restarted.
          setRestaurants(RESTAURANTS.filter((restaurant) => matchesSearchQuery(restaurant, searchQuery)));
          setVisibleCount(6);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [
    filters.pureVeg,
    filters.minRating,
    filters.maxCost,
    filters.fastDelivery,
    filters.offersOnly,
    filters.sortBy,
    searchQuery,
  ]);

  const visibleRestaurants = restaurants.slice(0, visibleCount);
  const hasMore = visibleCount < restaurants.length;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoadingMore(false);
    }, 600);
  }, [loadingMore, hasMore]);

  return { restaurants: visibleRestaurants, loading, loadingMore, hasMore, loadMore, total: restaurants.length };
}

// Fetches a single restaurant with simulated loading
export function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    api.getRestaurant(id)
      .then(({ restaurant: nextRestaurant }) => {
        if (!ignore) setRestaurant(nextRestaurant);
      })
      .catch(() => {
        if (!ignore) setRestaurant(getRestaurantById(id));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return { restaurant, loading };
}

// Scroll-spy hook for sticky menu navigation
export function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + offset;
        let current = sectionIds[0] || '';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            current = id;
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds, offset]);

  return activeSection;
}

// Infinite scroll hook using IntersectionObserver
export function useInfiniteScroll(onLoadMore, hasMore) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore]);

  return sentinelRef;
}
