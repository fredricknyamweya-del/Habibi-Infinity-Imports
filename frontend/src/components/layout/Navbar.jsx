import { useEffect, useState } from 'react';
import { FiChevronDown, FiMenu, FiShoppingBag, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { categories, site } from '../../config/site.js';
import Button from '../ui/Button.jsx';
import CountrySwitcher from './CountrySwitcher.jsx';
import MegaMenu from './MegaMenu.jsx';
import SearchBar from './SearchBar.jsx';
import CartDrawer from './CartDrawer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { FiHeart } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-obsidian/95 backdrop-blur">
      <div className="page-shell flex h-[76px] items-center justify-between gap-5">
        <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="text-2xl text-ivory md:hidden" onClick={() => setMenuOpen(!menuOpen)} type="button">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link aria-label={`${site.name} home`} className="shrink-0" to="/">
          <span className="block font-heading text-xl tracking-wide text-gold">HABIBI</span>
          <span className="block text-[9px] uppercase tracking-[0.34em] text-muted">Imports</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 text-sm text-ivory hover:text-gold" type="button">
              Discover <FiChevronDown aria-hidden="true" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-[min(900px,90vw)] -translate-x-1/2 pt-5 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <MegaMenu />
            </div>
          </div>
          <Link className="text-sm text-ivory hover:text-gold" to="/shop">Shop all</Link>
          <Link className="text-sm text-ivory hover:text-gold" to="/shop?sort=newest">New arrivals</Link>
        </nav>
        <SearchBar className="hidden w-56 lg:block" />
        <div className="hidden md:block"><CountrySwitcher /></div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link aria-label="Wishlist" className="hidden p-2 text-lg text-ivory hover:text-gold sm:inline-flex" to="/wishlist"><FiHeart /></Link>
          <button aria-label={`Shopping cart, ${itemCount} items`} className="relative p-2 text-xl text-ivory hover:text-gold" onClick={() => setCartOpen(true)} type="button">
            <FiShoppingBag aria-hidden="true" />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-obsidian">{itemCount}</span>}
          </button>
          <Button className="hidden min-h-10 px-4 md:inline-flex" to="/shop">Shop now</Button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[76px] z-50 overflow-y-auto border-t border-white/10 bg-obsidian px-5 pb-8 pt-5 md:hidden">
          <SearchBar className="mb-5" />
          <div className="mb-5"><CountrySwitcher /></div>
          {categories.map((category) => {
            const isOpen = activeCategory === category.slug;
            return (
              <div className="border-b border-white/10 py-1" key={category.slug}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-4 text-left"
                  onClick={() => setActiveCategory(isOpen ? '' : category.slug)}
                  type="button"
                >
                  <span><span className="mr-3 text-sm font-semibold text-gold">{category.number}</span><span className="font-heading text-lg">{category.name}</span></span>
                  <FiChevronDown className={`text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="flex flex-wrap gap-x-2 pb-4 pl-9 text-sm text-muted">{category.subcategories.map((item, index) => <span key={item}><Link onClick={() => setMenuOpen(false)} to={`/category/${category.slug}?subcategory=${encodeURIComponent(item)}`}>{item}</Link>{index < category.subcategories.length - 1 && <span className="ml-2 text-gold/60">·</span>}</span>)}</div>}
              </div>
            );
          })}
          <Button className="mt-6 w-full" onClick={() => setMenuOpen(false)} to="/shop">Shop now</Button>
        </div>
      )}
      <CartDrawer onClose={() => setCartOpen(false)} open={cartOpen} />
    </header>
  );
}