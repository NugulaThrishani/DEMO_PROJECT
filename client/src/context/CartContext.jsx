import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'petal-crumb-cart';

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (pastry, qty = 1) => {
    setItems(current => {
      const existing = current.find(item => item._id === pastry._id);
      if (existing) {
        return current.map(item => item._id === pastry._id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...current, { ...pastry, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems(current => qty < 1 ? current.filter(item => item._id !== id) : current.map(item => item._id === id ? { ...item, qty } : item));
  };

  const syncItems = pastries => {
    const byId = new Map(pastries.map(pastry => [pastry._id, pastry]));
    const byName = new Map(pastries.map(pastry => [pastry.name, pastry]));
    setItems(current => current.flatMap(item => {
      const freshItem = byId.get(item._id) || byName.get(item.name);
      return freshItem ? [{ ...freshItem, qty: item.qty }] : [];
    }));
  };

  const removeItem = id => setItems(current => current.filter(item => item._id !== id));
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = useMemo(() => ({ items, addItem, updateQty, syncItems, removeItem, clearCart, totalItems, total }), [items, totalItems, total]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
