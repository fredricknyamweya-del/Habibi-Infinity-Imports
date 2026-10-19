import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { categories } from '../../config/site.js';

export default function FilterSidebar({ params, onChange, onClear, open = false, onClose }) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const update = (key, value) => onChange(key, value);
  return (
    <aside aria-label="Product filters" className={`${open ? 'fixed inset-0 z-50 block overflow-y-auto bg-obsidian p-5' : 'hidden'} lg:sticky lg:top-28 lg:block lg:h-fit lg:rounded-card lg:border lg:border-white/10 lg:bg-charcoal lg:p-5`}>
      {open && <button aria-label="Close filters" className="float-right text-xl" onClick={onClose} type="button"><FiX /></button>}
      <div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-xl">Filters</h2><button className="text-xs text-gold hover:text-gold-soft" onClick={onClear} type="button">Clear all</button></div>
      <section className="border-t border-white/10 py-4">
        <button aria-expanded={categoryOpen} className="flex w-full items-center justify-between text-sm font-semibold" onClick={() => setCategoryOpen(!categoryOpen)} type="button">Category <FiChevronDown className={categoryOpen ? 'rotate-180' : ''} /></button>
        {categoryOpen && <div className="mt-3 grid gap-1">{categories.map((category) => (
          <div key={category.slug}>
            <Link className={`block rounded-md py-2 text-xs ${params.category === category.slug ? 'text-gold' : 'text-ivory hover:text-gold'}`} to={`/category/${category.slug}`}>{category.number} <span className="ml-2">{category.name}</span></Link>
            {params.category === category.slug && <div className="flex flex-wrap gap-1 pb-2 pl-6">{category.subcategories.map((subcategory) => (
              <button className={`rounded-full px-2 py-1 text-[10px] ${params.subcategory === subcategory ? 'bg-gold/15 text-gold' : 'text-muted hover:text-ivory'}`} key={subcategory} onClick={() => update('subcategory', params.subcategory === subcategory ? '' : subcategory)} type="button">{subcategory}</button>
            ))}</div>}
          </div>
        ))}</div>}
      </section>
      <section className="border-t border-white/10 py-4">
        <button aria-expanded={priceOpen} className="flex w-full items-center justify-between text-sm font-semibold" onClick={() => setPriceOpen(!priceOpen)} type="button">Price range <FiChevronDown className={priceOpen ? 'rotate-180' : ''} /></button>
        {priceOpen && <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="text-[10px] text-muted">Min<input aria-label="Minimum price" className="mt-1 min-h-10 w-full rounded-lg border border-white/15 bg-obsidian px-2 text-xs text-ivory" min="0" onChange={(event) => update('min', event.target.value)} type="number" value={params.min || ''} /></label>
          <label className="text-[10px] text-muted">Max<input aria-label="Maximum price" className="mt-1 min-h-10 w-full rounded-lg border border-white/15 bg-obsidian px-2 text-xs text-ivory" min="0" onChange={(event) => update('max', event.target.value)} type="number" value={params.max || ''} /></label>
        </div>}
      </section>
      <section className="border-t border-white/10 py-4">
        <button aria-expanded={ratingOpen} className="flex w-full items-center justify-between text-sm font-semibold" onClick={() => setRatingOpen(!ratingOpen)} type="button">Customer rating <FiChevronDown className={ratingOpen ? 'rotate-180' : ''} /></button>
        {ratingOpen && <div className="mt-3 grid gap-2">{[4, 3, 2].map((rating) => <label className="flex items-center gap-2 text-xs text-muted" key={rating}><input checked={params.rating === String(rating)} onChange={() => update('rating', params.rating === String(rating) ? '' : String(rating))} type="checkbox" />{rating}+ stars <span className="text-gold">★</span></label>)}</div>}
      </section>
    </aside>
  );
}