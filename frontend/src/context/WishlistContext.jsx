import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';

const WishlistContext = createContext(null);

function readWishlist() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn('Could not restore the saved wishlist.', error);
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readWishlist);
  const toggleWishlist = useCallback((id) => {
    setIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(next));
      return next;
    });
  }, []);
  const value = useMemo(() => ({ ids, toggleWishlist, isWishlisted: (id) => ids.includes(id) }), [ids, toggleWishlist]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
