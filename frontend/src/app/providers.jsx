import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../context/CartContext.jsx';
import { CountryProvider } from '../context/CountryContext.jsx';

export default function Providers({ children }) {
  return (
    <CountryProvider>
      <CartProvider>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { background: '#16161A', color: '#F7F3EA', border: '1px solid rgba(212,185,120,.35)' },
          }}
        />
      </CartProvider>
    </CountryProvider>
  );
}