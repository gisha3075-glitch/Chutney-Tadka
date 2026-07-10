import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getDishById, getRestaurantById } from '../data/mockData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // items: { [dishId]: { dish, quantity } }
  const [items, setItems] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const [conflict, setConflict] = useState(null); // { newRestaurantId, newRestaurantName, currentRestaurantName }

  const currentRestaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  const itemCount = useMemo(
    () => Object.values(items).reduce((sum, { quantity }) => sum + quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => Object.values(items).reduce((sum, { dish, quantity }) => sum + dish.price * quantity, 0),
    [items]
  );

  const clearCart = useCallback(() => {
    setItems({});
    setRestaurantId(null);
  }, []);

  const addItemInternal = useCallback((dish) => {
    setItems((prev) => {
      const existing = prev[dish.id];
      return {
        ...prev,
        [dish.id]: { dish, quantity: (existing?.quantity || 0) + 1 },
      };
    });
    setRestaurantId(dish.restaurantId);
  }, []);

  const tryAddItem = useCallback(
    (dish) => {
      const dishRestaurantId = dish.restaurantId;
      if (restaurantId && restaurantId !== dishRestaurantId) {
        const currentName = currentRestaurant?.name || 'another restaurant';
        const newName = getRestaurantById(dishRestaurantId)?.name || 'this restaurant';
        setConflict({
          newRestaurantId: dishRestaurantId,
          newRestaurantName: newName,
          currentRestaurantName: currentName,
          dish,
        });
        return false;
      }
      addItemInternal(dish);
      return true;
    },
    [restaurantId, currentRestaurant, addItemInternal]
  );

  const resolveConflict = useCallback(
    (accept) => {
      if (accept && conflict) {
        setItems({});
        setRestaurantId(conflict.newRestaurantId);
        addItemInternal(conflict.dish);
      }
      setConflict(null);
    },
    [conflict, addItemInternal]
  );

  const incrementItem = useCallback((dishId) => {
    setItems((prev) => {
      if (!prev[dishId]) return prev;
      return {
        ...prev,
        [dishId]: { ...prev[dishId], quantity: prev[dishId].quantity + 1 },
      };
    });
  }, []);

  const decrementItem = useCallback((dishId) => {
    setItems((prev) => {
      const existing = prev[dishId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const { [dishId]: _removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [dishId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
    setItems((prev) => {
      if (Object.keys(prev).length === 0) {
        setRestaurantId(null);
      }
      return prev;
    });
  }, []);

  const getQuantity = useCallback(
    (dishId) => items[dishId]?.quantity || 0,
    [items]
  );

  const value = {
    items,
    restaurantId,
    currentRestaurant,
    itemCount,
    subtotal,
    conflict,
    tryAddItem,
    resolveConflict,
    incrementItem,
    decrementItem,
    getQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
