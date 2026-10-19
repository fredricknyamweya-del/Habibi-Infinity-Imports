import { FiArrowUpRight, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { site } from '../../config/site.js';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-charcoal/50">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link aria-label="Habibi Imports home" className="font-heading text-2xl text-gold" to="/">Habibi Imports</Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">Thoughtfully sourced finds, delivered with care across East Africa.</p>
          <div className="mt-5 flex gap-4 text-lg text-gold">
            <a aria-label="Instagram" href={site.socials.instagram} rel="noreferrer" target="_blank"><FiInstagram /></a>
            <a aria-label="Facebook" href={site.socials.facebook} rel="noreferrer" target="_blank"><FiArrowUpRight /></a>
          </div>
        </div>
        {site.locations.map((location) => {
          const contact = site.contacts[location.code];
          return (
            <section key={location.code}>
              <h2 className="font-heading text-lg text-ivory">{location.city}</h2>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">{location.country}</p>
              <a className="mt-4 block text-sm text-ivory hover:text-gold" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              <a className="mt-2 inline-flex items-center gap-2 text-sm text-gold" href={contact.whatsapp} rel="noreferrer" target="_blank">WhatsApp <FiArrowUpRight /></a>
            </section>
          );
        })}
        <section>
          <h2 className="font-heading text-lg text-ivory">Here to help</h2>
          <Link className="mt-4 block text-sm text-muted hover:text-gold" to={site.links.delivery}>Delivery information</Link>
          <Link className="mt-3 block text-sm text-muted hover:text-gold" to={site.links.returns}>Returns & exchanges</Link>
          <Link className="mt-3 block text-sm text-muted hover:text-gold" to="/track">Track your order</Link>
        </section>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-muted">© {new Date().getFullYear()} Habibi Imports. All rights reserved.</div>
    </footer>
  );
}