import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../../config/site.js';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

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
        <motion.a
          aria-label="Contact Habibi Imports on WhatsApp"
          className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-charcoal text-2xl text-gold shadow-glow transition-colors hover:bg-gold hover:text-obsidian"
          href={site.contacts.KE.whatsapp}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.65, rotate: -12 }}
          rel="noreferrer"
          target="_blank"
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.7, rotate: 12 }}
          transition={reducedMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 20 }}
        >
          <FaWhatsapp aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
