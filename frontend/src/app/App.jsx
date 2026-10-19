import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const Catalogue = lazy(() => import('../pages/Catalogue.jsx'));
const ProductDetail = lazy(() => import('../pages/ProductDetail.jsx'));
const Cart = lazy(() => import('../pages/Cart.jsx'));
const Checkout = lazy(() => import('../pages/Checkout.jsx'));
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation.jsx'));
const TrackOrder = lazy(() => import('../pages/TrackOrder.jsx'));
const Wishlist = lazy(() => import('../pages/Wishlist.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<div aria-live="polite" className="grid min-h-[55vh] place-items-center text-sm text-muted">Loading Habibi Infinity Imports…</div>}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Catalogue />} />
          <Route path="category/:slug" element={<Catalogue />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/success/:id" element={<OrderConfirmation />} />
          <Route path="track" element={<TrackOrder />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}