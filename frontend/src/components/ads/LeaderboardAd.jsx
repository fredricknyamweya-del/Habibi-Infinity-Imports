import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedAdText, localizedCopy } from '../../utils/localization.js';

export default function LeaderboardAd({ ad }) {
  const { country } = useCountry();
  return (
    <Link aria-label={`${localizedCopy(country, 'Sponsored', 'Imedhaminiwa')}: ${localizedAdText(country, ad, 'title')}`} className="group relative isolate flex min-h-36 items-center overflow-hidden rounded-card border border-gold/20 bg-charcoal sm:min-h-32" to={ad.href || '/shop'}>
      <img alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30 transition duration-500 group-hover:scale-[1.02]" loading="lazy" src={ad.image} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
      <div className="px-6 py-5 sm:px-10">
        <Badge>Sponsored</Badge>
        <h2 className="mt-2 font-heading text-2xl text-ivory sm:text-3xl">{localizedAdText(country, ad, 'title')}</h2>
        <p className="mt-1 text-xs text-muted sm:text-sm">{localizedAdText(country, ad, 'description')}</p>
      </div>
    </Link>
  );
}