import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function PromoCard({ ad }) {
  const { country } = useCountry();
  return (
    <Link className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-card border border-gold/20 bg-charcoal p-5 transition hover:border-gold hover:shadow-glow" to={ad.href || '/shop'}>
      <img alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60" loading="lazy" src={ad.image} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent" />
      <Badge className="mb-3 w-fit">Sponsored</Badge>
      <h2 className="font-heading text-2xl">{localizedCopy(country, ad.title, ad.titleSwahili || ad.title)}</h2>
      <p className="mt-2 text-sm text-white">{localizedCopy(country, ad.description, ad.descriptionSwahili || ad.description)}</p>
    </Link>
  );
}