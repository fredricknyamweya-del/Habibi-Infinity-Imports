import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { DELIVERY_OPTIONS } from '../../utils/constants.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import Button from '../../components/ui/Button.jsx';
import PromoCodeInput from './PromoCodeInput.jsx';

export default function CartSummary({ compact = false }) {
  const { subtotal } = useCart();
  const { country } = useCountry();
  const shipping = subtotal ? DELIVERY_OPTIONS[country].Standard : 0;
  return (
    <section className="rounded-card border border-white/10 bg-charcoal p-5">
      <h2 className="font-heading text-2xl">Order summary</h2>
      <div className="mt-5 grid gap-3 text-sm">
        <p className="flex justify-between text-muted"><span>Subtotal</span><span className="text-ivory">{formatCurrency(subtotal, country)}</span></p>
        <p className="flex justify-between text-muted"><span>Estimated delivery</span><span className="text-ivory">{shipping ? formatCurrency(shipping, country) : '—'}</span></p>
        <p className="flex justify-between border-t border-white/10 pt-3 font-semibold"><span>Total estimate</span><span className="text-gold">{formatCurrency(subtotal + shipping, country)}</span></p>
      </div>
      {!compact && <div className="mt-5"><PromoCodeInput /></div>}
      <Button className="mt-5 w-full" disabled={!subtotal} to="/checkout">Proceed to checkout</Button>
      <p className="mt-3 text-center text-[10px] text-muted">Shipping and taxes are confirmed at checkout.</p>
      {compact && <Link className="mt-3 block text-center text-xs text-gold" to="/cart">View full bag</Link>}
    </section>
  );
}