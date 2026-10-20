import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartLine from '../../features/cart/CartLine.jsx';
import CartSummary from '../../features/cart/CartSummary.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount } = useCart();
  const { country } = useCountry();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button aria-label={localizedCopy(country, 'Close cart', 'Funga kikapu')} className="fixed inset-0 z-50 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} type="button" />
          <motion.aside aria-label={localizedCopy(country, 'Shopping cart', 'Kikapu cha ununuzi')} aria-modal="true" className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-gold/20 bg-obsidian shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} role="dialog" transition={{ type: 'tween', duration: 0.25 }}>
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div><h2 className="font-heading text-2xl">{localizedCopy(country, 'Your bag', 'Kikapu chako')}</h2><p className="mt-1 text-xs text-muted">{itemCount} {localizedCopy(country, itemCount === 1 ? 'piece' : 'pieces', itemCount === 1 ? 'bidhaa' : 'bidhaa')}</p></div>
              <button aria-label={localizedCopy(country, 'Close cart', 'Funga kikapu')} className="grid h-10 w-10 place-items-center rounded-full border border-white/10" onClick={onClose} type="button"><FiX /></button>
            </div>
            {items.length === 0 ? <div className="grid flex-1 place-content-center text-center"><p className="font-heading text-2xl">{localizedCopy(country, 'Your bag is waiting.', 'Kikapu chako kinakusubiri.')}</p><Link className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-gold" onClick={onClose} to="/shop">{localizedCopy(country, 'Discover the collection', 'Gundua mkusanyiko')} <FiArrowRight /></Link></div> : (
              <>
                <div className="flex-1 overflow-y-auto px-5">{items.map((item) => <CartLine compact item={item} key={item.key} />)}</div>
                <div className="border-t border-white/10 p-5"><CartSummary compact /></div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}