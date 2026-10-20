import ProductCard from './ProductCard.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function ProductGrid({ products = [], loading = false }) {
  const { country } = useCountry();
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => <div key={index}><Skeleton className="aspect-[4/5]" /><Skeleton className="mt-3 h-5 w-3/4" /><Skeleton className="mt-2 h-4 w-1/3" /></div>)}
      </div>
    );
  }
  if (products.length === 0) {
    return <div className="rounded-card border border-white/10 bg-charcoal px-5 py-16 text-center"><p className="font-heading text-2xl">{localizedCopy(country, 'Nothing found just yet', 'Bado hatujapata bidhaa')}</p><p className="mt-2 text-sm text-muted">{localizedCopy(country, 'Try adjusting your filters or search for another piece.', 'Jaribu kubadilisha vichujio au kutafuta bidhaa nyingine.')}</p></div>;
  }
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}