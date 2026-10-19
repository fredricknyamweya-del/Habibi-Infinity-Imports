import { useCart } from '../../context/CartContext.jsx';
import { DELIVERY_OPTIONS } from '../../utils/constants.js';
import { formatCurrency, getProductPrice } from '../../utils/formatCurrency.js';

export default function Review({ shipping, delivery, payment }) {
  const { items, subtotal } = useCart();
  const cost = DELIVERY_OPTIONS[shipping.country][delivery];
  return (
    <section>
      <h2 className="mb-5 font-heading text-2xl">Review your order</h2>
      <div className="grid gap-5 rounded-card border border-white/10 bg-charcoal p-5 text-sm">
        <div><h3 className="text-xs uppercase tracking-widest text-gold">Deliver to</h3><p className="mt-2">{shipping.name}</p><p className="text-muted">{shipping.address}, {shipping.town}, {shipping.region}, {shipping.country}</p><p className="text-muted">{shipping.phone}</p></div>
        <div className="border-t border-white/10 pt-4"><h3 className="text-xs uppercase tracking-widest text-gold">Delivery & payment</h3><p className="mt-2">{delivery} delivery · {payment.toUpperCase()}</p></div>
        <div className="border-t border-white/10 pt-4"><h3 className="text-xs uppercase tracking-widest text-gold">Items</h3>{items.map((item) => <p className="mt-2 flex justify-between gap-3 text-muted" key={item.key}><span>{item.qty} × {item.product.name}{item.variant ? ` · ${item.variant}` : ''}</span><span>{formatCurrency(getProductPrice(item.product, shipping.country) * item.qty, shipping.country)}</span></p>)}</div>
        <div className="border-t border-white/10 pt-4"><p className="flex justify-between text-muted"><span>Subtotal</span><span>{formatCurrency(subtotal, shipping.country)}</span></p><p className="mt-2 flex justify-between text-muted"><span>Delivery</span><span>{formatCurrency(cost, shipping.country)}</span></p><p className="mt-3 flex justify-between font-semibold"><span>Total</span><span className="text-gold">{formatCurrency(subtotal + cost, shipping.country)}</span></p></div>
      </div>
    </section>
  );
}