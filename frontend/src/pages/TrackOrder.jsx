import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrder } from '../api/orders.js';
import Container from '../components/ui/Container.jsx';
import TrackingTimeline from '../features/orders/TrackingTimeline.jsx';

export default function TrackOrder() {
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
      <p className="text-xs uppercase tracking-[0.22em] text-gold">Here for every step</p>
      <h1 className="mt-2 font-heading text-4xl">Track your order</h1>
      <p className="mt-3 text-sm text-muted">Enter the order number from your confirmation to see the latest status.</p>
      <form className="mt-7 flex gap-2" onSubmit={(event) => { event.preventDefault(); if (input.trim()) setSearchParams({ id: input.trim() }); }}>
        <label className="sr-only" htmlFor="tracking-order-id">Order number</label>
        <input className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/15 bg-charcoal px-4 text-ivory placeholder:text-muted" id="tracking-order-id" onChange={(event) => setInput(event.target.value)} placeholder="e.g. HAB-12345" value={input} />
        <button className="rounded-lg bg-gold px-5 text-sm font-semibold text-obsidian" type="submit">Track</button>
      </form>
      {loading && <p aria-live="polite" className="mt-8 text-sm text-muted">Looking up your order…</p>}
      {!loading && searched && !order && <p className="mt-8 rounded-lg border border-white/10 bg-charcoal p-5 text-sm text-muted">We couldn’t find an order with that number. Check the number and try again.</p>}
      {!loading && order && <section className="mt-8 rounded-card border border-white/10 bg-charcoal p-6">
        <div className="mb-7 flex flex-wrap justify-between gap-3"><div><p className="text-xs text-muted">Order number</p><h2 className="mt-1 font-heading text-xl text-gold">{orderId}</h2></div><p className="self-end rounded-full border border-gold/20 px-3 py-1 text-xs capitalize text-gold">{String(order.status || 'processing').replaceAll('_', ' ')}</p></div>
        <TrackingTimeline status={order.status} />
      </section>}
    </Container>
  );
}
