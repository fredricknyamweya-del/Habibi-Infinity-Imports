import { Link } from 'react-router-dom';
import CartLine from '../features/cart/CartLine.jsx';
import CartSummary from '../features/cart/CartSummary.jsx';
import Container from '../components/ui/Container.jsx';
import { useCart } from '../context/CartContext.jsx';
import { site } from '../config/site.js';
import { useCountry } from '../context/CountryContext.jsx';
import { localizedCopy } from '../utils/localization.js';

export default function Cart() {
  const { items, clearCart } = useCart();
  const { country } = useCountry();
  return (
    <Container className="py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.22em] text-gold">{localizedCopy(country, 'Your selection', 'Ulichokichagua')}</p><h1 className="mt-2 font-heading text-4xl">{localizedCopy(country, 'Shopping bag', 'Kikapu cha ununuzi')}</h1></div>
        {items.length > 0 && <button className="text-xs text-muted underline hover:text-gold" onClick={clearCart} type="button">{localizedCopy(country, 'Clear bag', 'Ondoa bidhaa zote')}</button>}
      </div>
      {items.length === 0 ? (
        <div className="rounded-card border border-white/10 bg-charcoal px-5 py-16 text-center"><p className="font-heading text-2xl">{localizedCopy(country, 'Your bag is beautifully empty.', 'Kikapu chako bado hakina bidhaa.')}</p><p className="mt-2 text-sm text-muted">{localizedCopy(country, 'Let’s find something you’ll love.', 'Tafuta bidhaa utakayoipenda.')}</p><Link className="mt-6 inline-block rounded-full bg-gold px-5 py-3 text-sm font-semibold text-obsidian" to="/shop">{localizedCopy(country, 'Explore the collection', 'Gundua mkusanyiko')}</Link></div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-card border border-white/10 bg-charcoal px-5">{items.map((item) => <CartLine item={item} key={item.key} />)}</div>
          <div className="lg:sticky lg:top-28"><CartSummary /><p className="mt-4 text-center text-xs text-muted">{localizedCopy(country, 'Need help?', 'Unahitaji msaada?')} <a className="font-semibold text-gold underline underline-offset-4" href={site.contacts[country].whatsapp} rel="noreferrer" target="_blank">{localizedCopy(country, 'Chat with us on WhatsApp', 'Tuandikie WhatsApp')}</a></p></div>
        </div>
      )}
    </Container>
  );
}