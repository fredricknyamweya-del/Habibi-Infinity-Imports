import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { site } from '../../config/site.js';
import { useCountry } from '../../context/CountryContext.jsx';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const { country, countryName } = useCountry();
  const contact = site.contacts[country];
  const phoneLink = `tel:${contact.phone.replace(/\s/g, '')}`;

  useEffect(() => {
    let showTimeout;
    let hideTimeout;

    const scheduleAppearance = () => {
      showTimeout = window.setTimeout(() => {
        setVisible(true);
        hideTimeout = window.setTimeout(() => {
          setVisible(false);
          scheduleAppearance();
        }, 20000);
      }, 6000);
    };

    scheduleAppearance();
    return () => {
      window.clearTimeout(showTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-label={`Contact Habibi Imports in ${countryName}`}
          className="fixed bottom-5 right-4 z-30 max-w-[calc(100vw-2rem)] rounded-2xl border border-gold/35 bg-charcoal/95 p-3 shadow-glow backdrop-blur-md sm:right-5"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.65, rotate: -12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.7, rotate: 12 }}
          role="group"
          transition={reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 20 }}
        >
          <p className="mb-2 text-xs font-medium text-ivory">Need a hand in {countryName}?</p>
          <div className="flex items-center gap-2">
            <a
              aria-label={`Message Habibi Imports on WhatsApp in ${countryName}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-semibold text-[#062b14] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href={contact.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              <FaWhatsapp aria-hidden="true" className="text-base" />
              WhatsApp
            </a>
            <a
              aria-label={`Call ${countryName} support at ${contact.phone}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gold/50 bg-obsidian px-3 text-xs font-semibold text-gold transition hover:bg-gold hover:text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href={phoneLink}
            >
              <FiPhone aria-hidden="true" className="text-sm" />
              Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
