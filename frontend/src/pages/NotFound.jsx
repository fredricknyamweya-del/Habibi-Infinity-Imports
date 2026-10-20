import { Link } from 'react-router-dom';
import { useCountry } from '../context/CountryContext.jsx';
import { localizedCopy } from '../utils/localization.js';

export default function NotFound() {
  const { country } = useCountry();
  return (
    <main className="page-shell grid min-h-[60vh] place-items-center py-16 text-center">
      <div><p className="text-xs uppercase tracking-[0.3em] text-gold">404 · {localizedCopy(country, 'Page not found', 'Ukurasa haujapatikana')}</p><h1 className="mt-3 font-heading text-5xl">{localizedCopy(country, 'This page has wandered.', 'Ukurasa huu haupatikani.')}</h1><p className="mt-4 text-sm text-muted">{localizedCopy(country, 'Let’s take you back to beautiful things.', 'Turudi kwenye bidhaa nzuri.')}</p><Link className="mt-7 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-obsidian" to="/">{localizedCopy(country, 'Return home', 'Rudi mwanzo')}</Link></div>
    </main>
  );
}