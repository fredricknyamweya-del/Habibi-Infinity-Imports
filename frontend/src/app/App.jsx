import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from '../pages/Home.jsx';
import Catalogue from '../pages/Catalogue.jsx';
import ProductDetail from '../pages/ProductDetail.jsx';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Catalogue />} />
        <Route path="category/:slug" element={<Catalogue />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}