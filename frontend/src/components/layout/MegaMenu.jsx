import { Link } from 'react-router-dom';
import { categories } from '../../config/site.js';

export default function MegaMenu({ onNavigate }) {
  return (
    <div className="grid max-h-[calc(100dvh-6rem)] grid-cols-1 gap-x-5 gap-y-5 overflow-y-auto rounded-card border border-gold/20 bg-charcoal p-4 shadow-glow sm:grid-cols-2 sm:p-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
      {categories.map((category) => (
        <section className="min-w-0" key={category.slug}>
          <Link className="flex items-start gap-2 font-heading text-base leading-snug text-ivory hover:text-gold sm:text-lg" onClick={onNavigate} to={`/category/${category.slug}`}>
            <span className="shrink-0 pt-0.5 text-sm font-semibold text-gold">{category.number}</span>
            <span className="min-w-0">{category.name}</span>
          </Link>
          <p className="mt-2 break-words text-xs leading-5 text-muted">{category.subcategories.join(' · ')}</p>
        </section>
      ))}
    </div>
  );
}