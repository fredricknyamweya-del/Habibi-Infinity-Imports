import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy, localizedProductName } from '../../utils/localization.js';

export default function WishlistButton({ product, className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { country } = useCountry();
  const saved = isWishlisted(product.id);
  return (
    <button
      aria-label={saved
        ? `${localizedCopy(country, 'Remove', 'Ondoa')} ${localizedProductName(country, product)} ${localizedCopy(country, 'from wishlist', 'kwenye orodha ya vipendwa')}`
        : `${localizedCopy(country, 'Add', 'Ongeza')} ${localizedProductName(country, product)} ${localizedCopy(country, 'to wishlist', 'kwenye orodha ya vipendwa')}`}
      aria-pressed={saved}
      className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-obsidian/85 text-lg transition hover:border-gold hover:text-gold ${className}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(product.id);
        toast(saved
          ? localizedCopy(country, 'Removed from wishlist', 'Imeondolewa kwenye orodha ya vipendwa')
          : localizedCopy(country, 'Saved to your wishlist', 'Imehifadhiwa kwenye orodha ya vipendwa'));
      }}
      type="button"
    >
      <FiHeart aria-hidden="true" className={saved ? 'fill-gold text-gold' : ''} />
    </button>
  );
}