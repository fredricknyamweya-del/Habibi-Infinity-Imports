import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../context/CartContext.jsx';
import { CountryProvider } from '../context/CountryContext.jsx';
import { WishlistProvider } from '../context/WishlistContext.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <CountryProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: 'rgb(var(--color-charcoal))',
                  color: 'rgb(var(--color-ivory))',
                  border: '1px solid rgb(var(--color-gold) / .45)',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </CountryProvider>
    </ThemeProvider>
  );
}