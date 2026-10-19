import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../../config/site.js';

export default function FloatingWhatsApp() {
  return (
    <a
      aria-label="Contact Habibi Imports on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-charcoal text-2xl text-gold shadow-glow transition hover:scale-105 hover:bg-gold hover:text-obsidian"
      href={site.contacts.KE.whatsapp}
      rel="noreferrer"
      target="_blank"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
