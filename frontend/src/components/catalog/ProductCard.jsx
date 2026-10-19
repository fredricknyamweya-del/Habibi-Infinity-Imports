import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCountry } from '../../context/CountryContext.jsx';
import { formatCurrency, getProductPrice } from '../../utils/formatCurrency.js';
import Badge from '../ui/Badge.jsx';

export default function ProductCard({ product }) {
  const { country } = useCountry();
  const badge = product.badges?.[0] || (product.isNew ? 'New' : null);
  return (
    <article className="group min-w-0">
      <Link className="relative block overflow-hidden rounded-card border border-white/10 bg-charcoal" to={`/product/${product.id}`}>
        <img alt={product.name} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" src={product.image} />
        {badge && <Badge className="absolute left-3 top-3">{badge}</Badge>}
        <span aria-hidden="true" className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-obsidian/80 text-gold opacity-0 transition group-hover:opacity-100"><FiArrowUpRight /></span>
      </Link>
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{product.categoryName}</p>
        <Link className="mt-1 block truncate font-heading text-lg text-ivory hover:text-gold" to={`/product/${product.id}`}>{product.name}</Link>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gold">{formatCurrency(getProductPrice(product, country), country)}</span>
          <span aria-label={`${product.rating} out of 5 stars`} className="text-xs text-muted">★ {product.rating}</span>
        </div>
      </div>
    </article>
  );
}