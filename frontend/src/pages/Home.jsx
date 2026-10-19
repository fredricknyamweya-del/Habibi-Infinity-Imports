import { useEffect, useState } from 'react';
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
      <section className="py-10">
        <SectionTitle action={<Link className="text-sm text-gold hover:text-gold-soft" to="/shop">All categories ↗</Link>} eyebrow="The Habibi edit" title="Shop by category" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => <CategoryCard category={category} index={index} key={category.slug} />)}
        </div>
      </section>
      <ProductSection action={<Link className="text-sm text-gold" to="/shop">Shop popular ↗</Link>} eyebrow="Loved by our community" items={products.slice(0, 8)} loading={loading} title="Popular right now" />
      <section className="my-8 overflow-hidden rounded-card border border-gold/20 bg-gradient-to-r from-charcoal to-[#27231b] p-7 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div><p className="text-xs uppercase tracking-[0.2em] text-gold">A little something special</p><h2 className="mt-2 font-heading text-3xl">Your next favourite is waiting.</h2><p className="mt-2 text-sm text-muted">Discover new arrivals and thoughtful finds, chosen just for you.</p></div>
          <Link className="rounded-full border border-gold/50 px-5 py-3 text-sm text-gold hover:bg-gold hover:text-obsidian" to="/shop?sort=newest">Explore new arrivals</Link>
        </div>
      </section>
      <ProductSection eyebrow="Just landed" items={products.filter((product) => product.isNew).slice(0, 4)} loading={loading} title="New arrivals" />
      <ProductSection eyebrow="Limited-time finds" items={products.filter((product) => product.isDeal).slice(0, 4)} loading={loading} title="Featured deals" />
    </Container>
  );
}