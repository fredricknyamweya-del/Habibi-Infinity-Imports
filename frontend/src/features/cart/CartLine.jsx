import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { formatCurrency, getProductPrice } from '../../utils/formatCurrency.js';
import { localizedCategoryName, localizedCopy, localizedVariantName } from '../../utils/localization.js';

export default function CartLine({ item, compact = false }) {
  const { removeItem, updateQuantity } = useCart();
  const { country } = useCountry();
  return (
    <article className={`grid gap-4 ${compact ? 'grid-cols-[72px_1fr]' : 'grid-cols-[96px_1fr_auto]'} border-b border-white/10 py-4`}>
      <Link to={`/product/${item.product.id}`}><img alt={item.product.name} className={`${compact ? 'h-[88px]' : 'h-28'} w-full rounded-lg object-cover`} src={item.product.image} /></Link>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted">{localizedCategoryName(country, item.product.categoryName)}</p>
        <Link className="mt-1 block truncate font-heading text-lg hover:text-gold" to={`/product/${item.product.id}`}>{item.product.name}</Link>
        {item.variant && <p className="mt-1 text-xs text-muted">{localizedCopy(country, 'Variant:', 'Aina:')} {localizedVariantName(country, item.variant)}</p>}
        <p className="mt-2 text-sm font-semibold text-gold">{formatCurrency(getProductPrice(item.product, country), country)}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/15">
            <button aria-label={`${localizedCopy(country, 'Decrease quantity of', 'Punguza idadi ya')} ${item.product.name}`} className="h-8 w-8" onClick={() => updateQuantity(item.key, item.qty - 1)} type="button">−</button>
            <span className="min-w-5 text-center text-xs">{item.qty}</span>
            <button aria-label={`${localizedCopy(country, 'Increase quantity of', 'Ongeza idadi ya')} ${item.product.name}`} className="h-8 w-8" onClick={() => updateQuantity(item.key, item.qty + 1)} type="button">+</button>
          </div>
          <button aria-label={`${localizedCopy(country, 'Remove', 'Ondoa')} ${item.product.name} ${localizedCopy(country, 'from cart', 'kwenye kikapu')}`} className="text-xs text-muted hover:text-red-300" onClick={() => removeItem(item.key)} type="button"><FiTrash2 /></button>
        </div>
      </div>
      {!compact && <p className="text-sm font-semibold">{formatCurrency(getProductPrice(item.product, country) * item.qty, country)}</p>}
    </article>
  );
}