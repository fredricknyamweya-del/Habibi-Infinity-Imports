import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../context/CartContext.jsx';
import { CountryProvider } from '../context/CountryContext.jsx';
import { WishlistProvider } from '../context/WishlistContext.jsx';

export default function Providers({ children }) {
  return (
    <CountryProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: { background: '#16161A', color: '#F7F3EA', border: '1px solid rgba(212,185,120,.35)' },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </CountryProvider>
  );
}