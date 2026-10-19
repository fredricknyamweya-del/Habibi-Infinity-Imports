import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import { FiInstagram, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { site } from '../../config/site.js';
import ContactCard from './ContactCard.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function Footer() {
  const { country } = useCountry();
  return (
    <footer className="mt-20 border-t border-white/10 bg-charcoal/50" id="site-footer">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link aria-label="Habibi Infinity Imports home" className="font-heading text-2xl text-gold" to="/">Habibi Infinity Imports</Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{localizedCopy(country, 'Thoughtfully sourced finds, delivered with care across East Africa.', 'Bidhaa zilizochaguliwa kwa umakini na kuwasilishwa kwa uangalifu kote Afrika Mashariki.')}</p>
          <div className="mt-5 flex gap-4 text-lg text-gold">
            <a aria-label="Instagram" href={site.socials.instagram} rel="noreferrer" target="_blank"><FiInstagram /></a>
            <a aria-label="TikTok" href={site.socials.tiktok} rel="noreferrer" target="_blank"><FaTiktok /></a>
            <a aria-label="Facebook" href={site.socials.facebook} rel="noreferrer" target="_blank"><FaFacebookF /></a>
          </div>
        </div>
        {site.locations.map((location) => <ContactCard key={location.code} location={location} />)}
        <section>
          <h2 className="font-heading text-lg text-ivory">{localizedCopy(country, 'Here to help', 'Tuko hapa kukusaidia')}</h2>
          <Link className="mt-4 block text-sm text-muted hover:text-gold" to={site.links.delivery}>{localizedCopy(country, 'Delivery information', 'Maelezo ya uwasilishaji')}</Link>
          <Link className="mt-3 block text-sm text-muted hover:text-gold" to={site.links.returns}>{localizedCopy(country, 'Returns & exchanges', 'Marejesho na ubadilishaji')}</Link>
          <Link className="mt-3 block text-sm text-muted hover:text-gold" to="/track">{localizedCopy(country, 'Track your order', 'Fuatilia oda yako')}</Link>
        </section>
      </div>
      <section aria-labelledby="pickup-points-heading" className="page-shell pb-10">
        <h2 className="font-heading text-2xl text-ivory" id="pickup-points-heading">{localizedCopy(country, 'Pickup points', 'Sehemu za kuchukulia bidhaa')}</h2>
        <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-3">
          {site.pickupPoints.map((point) => (
            <li className="flex min-h-14 items-center gap-3 rounded-card border border-white/10 bg-charcoal px-4 py-3" key={point.name}>
              <FiMapPin aria-hidden="true" className="shrink-0 text-gold" />
              <span>
                <span className="block text-sm font-semibold text-ivory">{point.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{point.country}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-muted">
          {localizedCopy(country, 'Outside these shop locations, deliveries across the region are handled by Trusted partners such as G4S, Wells Fargo, Easy Coach and other trusted shipping stakeholders of clients choice. Delivery fees are charged to the client and shown in the checkout details.', 'Nje ya maeneo haya ya maduka, bidhaa husafirishwa kote katika ukanda huu kupitia washirika wanaoaminika kama G4S, Wells Fargo, Easy Coach na wadau wengine wa usafirishaji wanaochaguliwa na mteja. Gharama za usafirishaji hulipwa na mteja na huonyeshwa kwenye maelezo ya malipo wakati wa kukamilisha oda.')}
        </p>
      </section>
      <div className="border-t border-white/10 py-4 text-center text-xs text-muted">© {new Date().getFullYear()} Habibi Infinity Imports. All rights reserved.</div>
    </footer>
  );
}