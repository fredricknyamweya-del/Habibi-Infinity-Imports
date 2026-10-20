import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrder } from '../api/orders.js';
import Container from '../components/ui/Container.jsx';
import TrackingTimeline from '../features/orders/TrackingTimeline.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import { localizedCopy, localizedOrderStatus } from '../utils/localization.js';

export default function TrackOrder() {
  const { country } = useCountry();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get('id') || '';
  const [input, setInput] = useState(orderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    let active = true;
    setLoading(true);
    setSearched(true);
    getOrder(orderId).then((result) => { if (active) setOrder(result); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId]);

  return (
    <Container className="max-w-3xl py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{localizedCopy(country, 'Here for every step', 'Tuko nawe katika kila hatua')}</p>
      <h1 className="mt-2 font-heading text-4xl">{localizedCopy(country, 'Track your order', 'Fuatilia oda yako')}</h1>
      <p className="mt-3 text-sm text-muted">{localizedCopy(country, 'Enter the order number from your confirmation to see the latest status.', 'Weka nambari ya oda iliyo kwenye uthibitisho wako ili kuona hali yake ya sasa.')}</p>
      <form className="mt-7 flex gap-2" onSubmit={(event) => { event.preventDefault(); if (input.trim()) setSearchParams({ id: input.trim() }); }}>
        <label className="sr-only" htmlFor="tracking-order-id">{localizedCopy(country, 'Order number', 'Nambari ya oda')}</label>
        <input className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/15 bg-charcoal px-4 text-ivory placeholder:text-muted" id="tracking-order-id" onChange={(event) => setInput(event.target.value)} placeholder={localizedCopy(country, 'e.g. HAB-12345', 'mf. HAB-12345')} value={input} />
        <button className="rounded-lg bg-gold px-5 text-sm font-semibold text-obsidian" type="submit">{localizedCopy(country, 'Track', 'Fuatilia')}</button>
      </form>
      {loading && <p aria-live="polite" className="mt-8 text-sm text-muted">{localizedCopy(country, 'Looking up your order…', 'Tunatafuta oda yako…')}</p>}
      {!loading && searched && !order && <p className="mt-8 rounded-lg border border-white/10 bg-charcoal p-5 text-sm text-muted">{localizedCopy(country, 'We couldn’t find an order with that number. Check the number and try again.', 'Hatukuweza kupata oda yenye nambari hiyo. Hakiki nambari kisha ujaribu tena.')}</p>}
      {!loading && order && <section className="mt-8 rounded-card border border-white/10 bg-charcoal p-6">
        <div className="mb-7 flex flex-wrap justify-between gap-3"><div><p className="text-xs text-muted">{localizedCopy(country, 'Order number', 'Nambari ya oda')}</p><h2 className="mt-1 font-heading text-xl text-gold">{orderId}</h2></div><p className="self-end rounded-full border border-gold/20 px-3 py-1 text-xs capitalize text-gold">{localizedOrderStatus(country, order.status || 'processing')}</p></div>
        <TrackingTimeline country={country} status={order.status} />
      </section>}
    </Container>
  );
}
