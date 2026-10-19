import { FiArrowUpRight, FiMapPin, FiPhone } from 'react-icons/fi';
import { site } from '../../config/site.js';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function ContactCard({ location }) {
  const contact = site.contacts[location.code];
  const tel = contact.phone.replace(/\s/g, '');
  const { country } = useCountry();

  return (
    <section className="rounded-card border border-line bg-charcoal p-5 shadow-sm" aria-label={`${localizedCopy(country, 'Contact', 'Wasiliana na')} ${location.city}`}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold"><FiMapPin aria-hidden="true" /></span>
        <div>
          <h2 className="font-heading text-lg text-ivory">{location.city}</h2>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-muted">{location.country}</p>
        </div>
      </div>
      <a className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-obsidian px-3 text-sm font-semibold text-ivory transition hover:border-gold hover:text-gold" href={`tel:${tel}`}>
        <FiPhone aria-hidden="true" className="text-gold" />
        <span>{contact.phone}</span>
      </a>
      <a className="mt-3 flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gold px-4 text-sm font-semibold text-obsidian transition hover:bg-gold-soft" href={contact.whatsapp} rel="noreferrer" target="_blank">
        {localizedCopy(country, 'WhatsApp us', 'Wasiliana nasi WhatsApp')} <FiArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}
