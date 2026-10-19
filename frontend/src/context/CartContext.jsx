import { createContext, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';
import { getProductPrice } from '../utils/formatCurrency.js';
import { useCountry } from './CountryContext.jsx';

const CartContext = createContext(null);

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn('Could not restore saved cart; starting with an empty cart.', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const { country } = useCountry();
  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(nextItems));
  };
  const addItem = (product, qty = 1, variant = '') => {
    const key = `${product.id}:${variant}`;
    const existing = items.find((item) => item.key === key);
    const nextItems = existing
      ? items.map((item) => item.key === key ? { ...item, qty: item.qty + qty } : item)
      : [...items, { key, product, qty, variant }];
    persist(nextItems);
  };
  const removeItem = (key) => persist(items.filter((item) => item.key !== key));
  const updateQuantity = (key, qty) => {
    if (qty < 1) return removeItem(key);
    persist(items.map((item) => item.key === key ? { ...item, qty: Math.min(qty, item.product.stock || 99) } : item));
  };
  const clearCart = () => persist([]);
  const subtotal = items.reduce((sum, item) => sum + getProductPrice(item.product, country) * item.qty, 0);
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [items, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
