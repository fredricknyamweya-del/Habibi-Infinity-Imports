import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { site } from '../../config/site.js';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
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

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && !footerVisible && (
        <motion.div
          aria-label={`${localizedCopy(country, 'Contact', 'Wasiliana na')} Habibi Infinity Imports ${localizedCopy(country, 'in', 'nchini')} ${countryName}`}
          className="fixed bottom-4 right-3 z-30 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-gold/35 bg-charcoal/95 p-2.5 shadow-glow backdrop-blur-md md:bottom-5 md:right-5"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.65, rotate: -12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.7, rotate: 12 }}
          role="group"
          transition={reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 20 }}
        >
          <p className="mb-2 px-1 text-xs font-medium text-ivory">{localizedCopy(country, `Need a hand in ${countryName}?`, `Unahitaji msaada nchini ${countryName}?`)}</p>
          <div className="flex items-center">
            <a
              aria-label={`${localizedCopy(country, 'Message Habibi Infinity Imports on WhatsApp in', 'Tuma ujumbe kwa Habibi Infinity Imports kupitia WhatsApp nchini')} ${countryName}`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 text-xs font-semibold text-[#062b14] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href={contact.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              <FaWhatsapp aria-hidden="true" className="text-base" />
              WhatsApp
            </a>
            <a
              aria-label={`${localizedCopy(country, 'Call', 'Piga simu kwa')} ${localizedCopy(country, 'support in', 'huduma kwa wateja nchini')} ${countryName} ${localizedCopy(country, 'at', 'kwenye nambari')} ${contact.phone}`}
              className="ml-1 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-gold/50 bg-obsidian px-3 text-xs font-semibold text-gold transition hover:bg-gold hover:text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href={phoneLink}
            >
              <FiPhone aria-hidden="true" className="text-sm" />
              {localizedCopy(country, 'Call', 'Piga simu')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
