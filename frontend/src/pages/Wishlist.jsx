import { Link } from 'react-router-dom';
import ProductCard from '../components/catalog/ProductCard.jsx';
import Container from '../components/ui/Container.jsx';
import { mockProducts } from '../data/products.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import { localizedCopy } from '../utils/localization.js';

export default function Wishlist() {
  const { ids } = useWishlist();
  const { country } = useCountry();
  const products = mockProducts.filter((product) => ids.includes(product.id));
  return (
    <Container className="py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">{localizedCopy(country, 'Saved for later', 'Zilizohifadhiwa kwa baadaye')}</p>
      <h1 className="mt-2 font-heading text-4xl">{localizedCopy(country, 'Your wishlist', 'Orodha yako ya vipendwa')}</h1>
      {products.length ? <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-8 rounded-card border border-white/10 bg-charcoal p-10 text-center"><p className="font-heading text-2xl">{localizedCopy(country, 'Keep the pieces you love close.', 'Hifadhi bidhaa unazopenda hapa.')}</p><p className="mt-2 text-sm text-muted">{localizedCopy(country, 'Tap the heart on any product to save it here.', 'Bonyeza alama ya moyo kwenye bidhaa ili kuihifadhi hapa.')}</p><Link className="mt-5 inline-block text-sm text-gold" to="/shop">{localizedCopy(country, 'Explore the collection', 'Gundua mkusanyiko')}</Link></div>}
    </Container>
  );
}
