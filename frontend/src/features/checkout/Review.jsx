import { useCart } from '../../context/CartContext.jsx';
import { DELIVERY_OPTIONS } from '../../utils/constants.js';
import { formatCurrency, getProductPrice } from '../../utils/formatCurrency.js';
import { localizedCopy, localizedProductName, localizedVariantName } from '../../utils/localization.js';

export default function Review({ shipping, delivery, payment }) {
  const { items, subtotal } = useCart();
  const cost = DELIVERY_OPTIONS[shipping.country][delivery];
  return (
    <section>
      <h2 className="mb-5 font-heading text-2xl">{localizedCopy(shipping.country, 'Review your order', 'Kagua oda yako')}</h2>
      <div className="grid gap-5 rounded-card border border-white/10 bg-charcoal p-5 text-sm">
        <div><h3 className="text-xs uppercase tracking-widest text-gold">{localizedCopy(shipping.country, 'Deliver to', 'Peleka kwa')}</h3><p className="mt-2">{shipping.name}</p><p className="text-muted">{shipping.address}, {shipping.town}, {shipping.region}, {localizedCopy(shipping.country, shipping.country === 'KE' ? 'Kenya' : 'Tanzania', shipping.country === 'KE' ? 'Kenya' : 'Tanzania')}</p><p className="text-muted">{shipping.phone}</p></div>
        <div className="border-t border-white/10 pt-4"><h3 className="text-xs uppercase tracking-widest text-gold">{localizedCopy(shipping.country, 'Delivery & payment', 'Uwasilishaji na malipo')}</h3><p className="mt-2">{localizedCopy(shipping.country, delivery === 'Standard' ? 'Standard delivery' : delivery === 'Express' ? 'Express delivery' : 'Pickup', delivery === 'Standard' ? 'Uwasilishaji wa kawaida' : delivery === 'Express' ? 'Uwasilishaji wa haraka' : 'Kujichukulia')} · {payment === 'mpesa' ? 'M-Pesa' : payment === 'card' ? localizedCopy(shipping.country, 'Card', 'Kadi') : localizedCopy(shipping.country, 'Cash on delivery', 'Lipa unapopokea')}</p></div>
        <div className="border-t border-white/10 pt-4"><h3 className="text-xs uppercase tracking-widest text-gold">{localizedCopy(shipping.country, 'Items', 'Bidhaa')}</h3>{items.map((item) => <p className="mt-2 flex justify-between gap-3 text-muted" key={item.key}><span>{item.qty} × {localizedProductName(shipping.country, item.product)}{item.variant ? ` · ${localizedVariantName(shipping.country, item.variant)}` : ''}</span><span>{formatCurrency(getProductPrice(item.product, shipping.country) * item.qty, shipping.country)}</span></p>)}</div>
        <div className="border-t border-white/10 pt-4"><p className="flex justify-between text-muted"><span>{localizedCopy(shipping.country, 'Subtotal', 'Jumla ndogo')}</span><span>{formatCurrency(subtotal, shipping.country)}</span></p><p className="mt-2 flex justify-between text-muted"><span>{localizedCopy(shipping.country, 'Delivery', 'Uwasilishaji')}</span><span>{formatCurrency(cost, shipping.country)}</span></p><p className="mt-3 flex justify-between font-semibold"><span>{localizedCopy(shipping.country, 'Total', 'Jumla')}</span><span className="text-gold">{formatCurrency(subtotal + cost, shipping.country)}</span></p></div>
      </div>
    </section>
  );
}