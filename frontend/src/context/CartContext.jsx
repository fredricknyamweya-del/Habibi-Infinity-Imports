import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
  }, [items]);
  const addItem = useCallback((product, qty = 1, variant = '') => {
    const key = `${product.id}:${variant}`;
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      return existing
        ? current.map((item) => item.key === key ? { ...item, qty: item.qty + qty } : item)
        : [...current, { key, product, qty, variant }];
    });
  }, []);
  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);
  const updateQuantity = useCallback((key, qty) => {
    setItems((current) => qty < 1
      ? current.filter((item) => item.key !== key)
      : current.map((item) => item.key === key ? { ...item, qty: Math.min(qty, item.product.stock || 99) } : item));
  }, []);
  const clearCart = useCallback(() => setItems([]), []);
  const subtotal = items.reduce((sum, item) => sum + getProductPrice(item.product, country) * item.qty, 0);
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [addItem, clearCart, items, removeItem, subtotal, updateQuantity]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
