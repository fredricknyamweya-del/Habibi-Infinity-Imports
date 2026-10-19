import { Link } from 'react-router-dom';
import ProductCard from '../components/catalog/ProductCard.jsx';
import Container from '../components/ui/Container.jsx';
import { mockProducts } from '../data/products.js';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function Wishlist() {
  const { ids } = useWishlist();
  const products = mockProducts.filter((product) => ids.includes(product.id));
  return (
    <Container className="py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Saved for later</p>
      <h1 className="mt-2 font-heading text-4xl">Your wishlist</h1>
      {products.length ? <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-8 rounded-card border border-white/10 bg-charcoal p-10 text-center"><p className="font-heading text-2xl">Keep the pieces you love close.</p><p className="mt-2 text-sm text-muted">Tap the heart on any product to save it here.</p><Link className="mt-5 inline-block text-sm text-gold" to="/shop">Explore the collection</Link></div>}
    </Container>
  );
}
