import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function Pagination({ page = 1, pages = 1, onChange }) {
  const { country } = useCountry();
  if (pages < 2) return null;
  return (
    <nav aria-label={localizedCopy(country, 'Product pages', 'Kurasa za bidhaa')} className="mt-10 flex items-center justify-center gap-2">
      <button aria-label={localizedCopy(country, 'Previous page', 'Ukurasa uliotangulia')} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-ivory disabled:opacity-30" disabled={page <= 1} onClick={() => onChange(page - 1)} type="button"><FiChevronLeft /></button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button aria-current={number === page ? 'page' : undefined} aria-label={`${localizedCopy(country, 'Page', 'Ukurasa')} ${number}`} className={`h-10 min-w-10 rounded-full border px-3 text-sm ${number === page ? 'border-gold bg-gold text-obsidian' : 'border-white/15 text-ivory hover:border-gold'}`} key={number} onClick={() => onChange(number)} type="button">{number}</button>
      ))}
      <button aria-label={localizedCopy(country, 'Next page', 'Ukurasa unaofuata')} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-ivory disabled:opacity-30" disabled={page >= pages} onClick={() => onChange(page + 1)} type="button"><FiChevronRight /></button>
    </nav>
  );
}