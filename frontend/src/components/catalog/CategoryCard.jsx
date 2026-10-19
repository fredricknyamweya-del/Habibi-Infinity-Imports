import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category, index = 0, tabIndex }) {
  return (
    <Link
      className="group relative isolate flex min-h-56 w-[min(76vw,260px)] shrink-0 overflow-hidden rounded-card border border-gold/20 bg-charcoal p-5 transition hover:border-gold hover:shadow-glow sm:w-[260px]"
      tabIndex={tabIndex}
      to={`/category/${category.slug}`}
    >
      <img
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
        loading="lazy"
        src={category.image || `https://images.unsplash.com/photo-${['1483985988355-763728e1935b', '1548036328-c9fa89d128fa', '1541643600914-78b084683601', '1611652022419-a9419f74343d', '1543163521-1bf539c55dd2', '1592899677977-9c10ca588bbd', '1608043152269-423dbba4e7e1'][index]}?auto=format&fit=crop&w=700&q=85`}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <span className="mt-auto flex w-full items-end justify-between gap-2">
        <span><span className="mb-2 block text-sm font-semibold text-gold">{category.number}</span><span className="font-heading text-xl text-ivory">{category.name}</span></span>
        <FiArrowUpRight aria-hidden="true" className="mb-1 text-xl text-gold transition group-hover:-translate-y-1 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}