import { Link } from 'react-router-dom';
import { categories } from '../../config/site.js';

export default function MegaMenu({ onNavigate }) {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-6 rounded-card border border-gold/20 bg-charcoal p-7 shadow-glow">
      {categories.map((category) => (
        <section key={category.slug}>
          <Link className="font-heading text-lg text-ivory hover:text-gold" onClick={onNavigate} to={`/category/${category.slug}`}>
            <span className="mr-2 text-sm font-semibold text-gold">{category.number}</span>
            {category.name}
          </Link>
          <p className="mt-2 text-xs leading-6 text-muted">{category.subcategories.join(' · ')}</p>
        </section>
      ))}
    </div>
  );
}