import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/products.js';
import { categories } from '../config/site.js';
import CategoryCard from '../components/catalog/CategoryCard.jsx';
import ProductCard from '../components/catalog/ProductCard.jsx';
import HeroShowcase from '../components/home/HeroShowcase.jsx';
import TrustStrip from '../components/layout/TrustStrip.jsx';
import Container from '../components/ui/Container.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import AdSlot from '../components/ads/AdSlot.jsx';
import { localizedCopy } from '../utils/localization.js';

function ProductSection({ title, eyebrow, items, loading, action }) {
  return (
    <section className="py-10">
      <SectionTitle action={action} eyebrow={eyebrow} title={title} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }, (_, index) => <div key={index}><Skeleton className="aspect-[4/5]" /><Skeleton className="mt-3 h-5 w-3/4" /><Skeleton className="mt-2 h-4 w-1/3" /></div>)
          : items.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { country } = useCountry();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    getProducts({ country }).then((result) => {
      const list = Array.isArray(result) ? result : result.items || result.products || [];
      if (active) setProducts(list);
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [country]);

  return (
    <Container className="pt-6 md:pt-10">
      <HeroShowcase />
      <TrustStrip />
      <AdSlot className="my-6" placement="leaderboard" />
      <section className="py-10">
        <SectionTitle action={<Link className="text-sm text-gold hover:text-gold-soft" to="/shop">{localizedCopy(country, 'All categories', 'Aina zote')} ↗</Link>} eyebrow={localizedCopy(country, 'The Habibi edit', 'Chaguo la Habibi')} title={localizedCopy(country, 'Shop by category', 'Nunua kwa aina')} />
        <div aria-label={localizedCopy(country, 'Shop by category', 'Nunua kwa aina')} className={`category-marquee ${reducedMotion ? 'overflow-x-auto' : 'overflow-hidden'}`}>
          <div className={`category-marquee-track flex w-max ${reducedMotion ? '' : 'category-marquee-animated'}`}>
            {[0, ...(reducedMotion ? [] : [1])].map((copy) => (
              <div aria-hidden={copy === 1 ? 'true' : undefined} className="flex shrink-0 gap-3 pr-3" key={copy}>
                {categories.map((category, index) => (
                  <CategoryCard category={category} index={index} key={category.slug} tabIndex={copy === 1 ? -1 : undefined} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductSection action={<Link className="text-sm text-gold" to="/shop">{localizedCopy(country, 'Shop popular', 'Nunua zinazopendwa')} ↗</Link>} eyebrow={localizedCopy(country, 'Loved by our community', 'Zinazopendwa na wateja wetu')} items={products.slice(0, 8)} loading={loading} title={localizedCopy(country, 'Popular right now', 'Zinazopendwa sasa hivi')} />
      <section className="my-8 overflow-hidden rounded-card border border-gold/20 bg-gradient-to-r from-charcoal to-[#27231b] p-7 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div><p className="text-xs uppercase tracking-[0.2em] text-gold">{localizedCopy(country, 'A little something special', 'Kitu maalum kwa ajili yako')}</p><h2 className="mt-2 font-heading text-3xl">{localizedCopy(country, 'Your next favourite is waiting.', 'Kipenzi chako kipya kinakusubiri.')}</h2><p className="mt-2 text-sm text-muted">{localizedCopy(country, 'Discover new arrivals and thoughtful finds, chosen just for you.', 'Gundua bidhaa mpya na zilizochaguliwa kwa uangalifu kwa ajili yako.')}</p></div>
          <Link className="rounded-full border border-gold/50 px-5 py-3 text-sm text-gold hover:bg-gold hover:text-obsidian" to="/shop?sort=newest">{localizedCopy(country, 'Explore new arrivals', 'Gundua zilizowasili karibuni')}</Link>
        </div>
      </section>
      <ProductSection eyebrow={localizedCopy(country, 'Just landed', 'Zilizowasili sasa hivi')} items={products.filter((product) => product.isNew).slice(0, 4)} loading={loading} title={localizedCopy(country, 'New arrivals', 'Zilizowasili karibuni')} />
      <ProductSection eyebrow={localizedCopy(country, 'Limited-time finds', 'Ofa za muda mfupi')} items={products.filter((product) => product.isDeal).slice(0, 4)} loading={loading} title={localizedCopy(country, 'Featured deals', 'Ofa maalum')} />
      <AdSlot className="my-8" placement="leaderboard" />
    </Container>
  );
}