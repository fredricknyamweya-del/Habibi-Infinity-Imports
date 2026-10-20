import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCountry } from '../../context/CountryContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatCurrency, getProductPrice } from '../../utils/formatCurrency.js';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import WishlistButton from './WishlistButton.jsx';
import { localizedCategoryName, localizedCopy } from '../../utils/localization.js';

export default function ProductCard({ product }) {
  const { country } = useCountry();
  const { addItem } = useCart();
  const badge = product.badges?.[0] || (product.isNew ? 'New' : null);
  const variants = product.variants || [];

  const handleAddToCart = () => {
    const variant = variants[0] || '';
    addItem(product, 1, variant);
    toast.success(`${product.name} ${localizedCopy(country, 'added to your cart', 'imeongezwa kwenye kikapu chako')}`);
  };

  return (
    <article className="group relative min-w-0">
      <Link className="relative block overflow-hidden rounded-card border border-white/10 bg-charcoal" to={`/product/${product.id}`}>
        <img alt={product.name} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" src={product.image} />
        {badge && <Badge className="absolute left-3 top-3">{badge}</Badge>}
        <span aria-hidden="true" className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-obsidian/80 text-gold opacity-0 transition group-hover:opacity-100"><FiArrowUpRight /></span>
      </Link>
      <WishlistButton className="absolute right-3 top-3" product={product} />
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{localizedCategoryName(country, product.categoryName)}</p>
        <Link className="mt-1 block truncate font-heading text-lg text-ivory hover:text-gold" to={`/product/${product.id}`}>{product.name}</Link>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gold">{formatCurrency(getProductPrice(product, country), country)}</span>
          <span aria-label={`${product.rating} out of 5 stars`} className="text-xs text-muted">★ {product.rating}</span>
        </div>
        <Button
          aria-label={`${localizedCopy(country, 'Add', 'Ongeza')} ${product.name} ${localizedCopy(country, 'to cart', 'kwenye kikapu')}`}
          className="mt-3 w-full"
          disabled={product.stock < 1}
          onClick={handleAddToCart}
        >
          {product.stock < 1 ? localizedCopy(country, 'Out of stock', 'Haipo dukani') : localizedCopy(country, 'Add to cart', 'Ongeza kwenye kikapu')}
        </Button>
      </div>
    </article>
  );
}