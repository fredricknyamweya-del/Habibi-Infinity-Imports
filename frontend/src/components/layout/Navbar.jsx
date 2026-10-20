import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../../config/site.js';
import Button from '../ui/Button.jsx';
import CountrySwitcher from './CountrySwitcher.jsx';
import MegaMenu from './MegaMenu.jsx';
import SearchBar from './SearchBar.jsx';
import CartDrawer from './CartDrawer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const discoverRef = useRef(null);
  const { itemCount } = useCart();
  const { country } = useCountry();
  const { pathname } = useLocation();

  useEffect(() => {
    setCartOpen(false);
    setDiscoverOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!discoverOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!discoverRef.current?.contains(event.target)) setDiscoverOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDiscoverOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [discoverOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-obsidian/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-2 md:h-[76px] md:gap-5">
        <Link aria-label={`${site.name} home`} className="shrink-0" to="/">
          <span className="block font-heading text-xl tracking-wide text-gold">HABIBI</span>
          <span className="block text-[9px] uppercase tracking-[0.18em] text-muted">Infinity Imports</span>
        </Link>
        <nav aria-label={localizedCopy(country, 'Main navigation', 'Urambazaji mkuu')} className="hidden items-center gap-7 md:flex">
          <div className="relative" ref={discoverRef}>
            <button
              aria-controls="discover-menu"
              aria-expanded={discoverOpen}
              className="flex items-center gap-1 text-sm text-ivory hover:text-gold"
              onClick={() => setDiscoverOpen((open) => !open)}
              type="button"
            >
              {localizedCopy(country, 'Discover', 'Gundua')} <FiChevronDown aria-hidden="true" />
            </button>
            {discoverOpen && (
              <div className="fixed left-1/2 top-[76px] z-[60] w-[min(900px,calc(100vw-2rem))] -translate-x-1/2 pt-3" id="discover-menu">
                <MegaMenu onNavigate={() => setDiscoverOpen(false)} />
              </div>
            )}
          </div>
          <Link className="text-sm text-ivory hover:text-gold" to="/shop">{localizedCopy(country, 'Shop all', 'Nunua zote')}</Link>
          <Link className="text-sm text-ivory hover:text-gold" to="/shop?sort=newest">{localizedCopy(country, 'New arrivals', 'Zilizowasili karibuni')}</Link>
        </nav>
        <SearchBar className="hidden w-56 lg:block" />
        <div className="hidden md:block"><CountrySwitcher /></div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <CountrySwitcher className="md:hidden" compact />
          <ThemeToggle />
          <Link aria-label="Wishlist" className="inline-flex p-2 text-lg text-ivory hover:text-gold" to="/wishlist"><FiHeart /></Link>
          <button aria-label={`Shopping cart, ${itemCount} items`} className="relative p-2 text-xl text-ivory hover:text-gold" onClick={() => setCartOpen(true)} type="button">
            <FiShoppingBag aria-hidden="true" />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-obsidian">{itemCount}</span>}
          </button>
          <Button className="hidden min-h-10 px-4 md:inline-flex" to="/shop">{localizedCopy(country, 'Shop now', 'Nunua sasa')}</Button>
        </div>
      </div>
      <div className="page-shell pb-3 md:hidden">
        <SearchBar />
      </div>
      <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />
    </header>
  );
}