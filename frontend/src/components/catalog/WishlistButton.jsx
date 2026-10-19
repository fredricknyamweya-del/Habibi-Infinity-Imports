import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function WishlistButton({ product, className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(product.id);
  return (
    <button
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={saved}
      className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-obsidian/85 text-lg transition hover:border-gold hover:text-gold ${className}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(product.id);
        toast(saved ? 'Removed from wishlist' : 'Saved to your wishlist');
      }}
      type="button"
    >
      <FiHeart aria-hidden="true" className={saved ? 'fill-gold text-gold' : ''} />
    </button>
  );
}