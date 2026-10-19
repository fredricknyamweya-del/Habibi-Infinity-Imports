import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../api/orders.js';
import Container from '../components/ui/Container.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import { formatCurrency, getProductPrice } from '../utils/formatCurrency.js';
import { DELIVERY_OPTIONS } from '../utils/constants.js';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { country } = useCountry();
  useEffect(() => {
    let active = true;
    getOrder(id).then((data) => { if (active) setOrder(data); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const orderCountry = order?.shipping?.country || country;
  const items = order?.items || [];
  const subtotal = order?.subtotal ?? items.reduce((sum, item) => sum + getProductPrice(item.product || {}, orderCountry) * item.qty, 0);
  const delivery = order?.shipping?.method || 'Standard';
  const total = subtotal + (subtotal ? DELIVERY_OPTIONS[orderCountry]?.[delivery] || 0 : 0);

  return (
    <Container className="max-w-2xl py-14">
      <div className="rounded-card border border-gold/20 bg-charcoal p-6 text-center shadow-glow sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-3xl text-obsidian"><FiCheck aria-hidden="true" /></span>
        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-gold">Thank you for choosing us</p>
        <h1 className="mt-2 font-heading text-4xl">Your order is in.</h1>
        <p className="mt-3 text-sm text-muted">{loading ? 'Loading order details…' : order ? 'We’re preparing your carefully chosen pieces.' : 'Your order was submitted. We could not retrieve its full details just now.'}</p>
        <div className="mt-7 rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-widest text-muted">Order number</p>
          <p className="mt-2 font-heading text-xl text-gold">{decodeURIComponent(id)}</p>
          {order?.customer?.name && <p className="mt-2 text-sm text-muted">We’ll keep you updated, {order.customer.name}.</p>}
        </div>
        {order && <div className="mt-6 text-left">
          <h2 className="font-heading text-xl">Order summary</h2>
          <div className="mt-3 divide-y divide-white/10">{items.map((item, index) => <p className="flex justify-between gap-3 py-3 text-sm" key={item.key || item.product_id || index}><span>{item.qty} × {item.product?.name || item.name || item.product_id}</span><span className="text-gold">{formatCurrency(getProductPrice(item.product || item, orderCountry) * item.qty, orderCountry)}</span></p>)}</div>
          <div className="mt-3 border-t border-white/10 pt-3 text-sm"><p className="flex justify-between text-muted"><span>Estimated total</span><span className="font-semibold text-gold">{formatCurrency(total, orderCountry)}</span></p></div>
        </div>}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-obsidian" to="/shop">Continue shopping</Link>
          <Link className="rounded-full border border-gold/40 px-5 py-3 text-sm text-gold" to={`/track?id=${encodeURIComponent(id)}`}>Track your order</Link>
        </div>
      </div>
    </Container>
  );
}