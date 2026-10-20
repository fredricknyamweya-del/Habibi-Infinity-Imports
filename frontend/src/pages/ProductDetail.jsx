import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api/products.js';
import Gallery from '../features/product/Gallery.jsx';
import VariantPicker from '../features/product/VariantPicker.jsx';
import DeliveryEstimate from '../features/product/DeliveryEstimate.jsx';
import DescriptionTabs from '../features/product/DescriptionTabs.jsx';
import Button from '../components/ui/Button.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import { formatCurrency, getProductPrice } from '../utils/formatCurrency.js';
import { mockProducts } from '../data/products.js';
import WishlistButton from '../components/catalog/WishlistButton.jsx';
import { localizedCategoryName, localizedCopy, localizedProductName } from '../utils/localization.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { country } = useCountry();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProduct(id).then((item) => { if (active) setProduct(item); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="page-shell grid gap-8 py-12 md:grid-cols-2"><Skeleton className="aspect-[4/5]" /><div><Skeleton className="h-8 w-2/3" /><Skeleton className="mt-5 h-5 w-1/3" /><Skeleton className="mt-10 h-12 w-full" /></div></div>;
  if (!product) return <div className="page-shell py-24 text-center"><h1 className="font-heading text-3xl">{localizedCopy(country, 'We couldn’t find that piece.', 'Hatukuweza kupata bidhaa hiyo.')}</h1><Link className="mt-5 inline-block text-gold" to="/shop">{localizedCopy(country, 'Back to the collection', 'Rudi kwenye mkusanyiko')}</Link></div>;

  const related = mockProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const addToCart = () => {
    if (product.variants?.length && !variant) {
      toast.error(localizedCopy(country, 'Please choose a variant first.', 'Tafadhali chagua aina ya bidhaa kwanza.'));
      return;
    }
    addItem(product, quantity, variant);
    toast.success(`${localizedProductName(country, product)} ${localizedCopy(country, 'added to your cart', 'imeongezwa kwenye kikapu chako')}`);
  };

  return (
    <div className="page-shell py-8 md:py-12">
      <Link className="mb-7 inline-flex items-center gap-2 text-xs text-muted hover:text-gold" to="/shop"><FiArrowLeft /> {localizedCopy(country, 'Back to the collection', 'Rudi kwenye mkusanyiko')}</Link>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Gallery product={product} />
        <div className="lg:py-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{localizedCategoryName(country, product.categoryName)}</p>
          <h1 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">{localizedProductName(country, product)}</h1>
          <div className="mt-4 flex items-center gap-3"><span className="text-gold">★ {product.rating}</span><span className="text-xs text-muted">{product.reviewCount} {localizedCopy(country, 'reviews', 'maoni')}</span></div>
          <p className="mt-5 text-2xl font-semibold text-gold">{formatCurrency(getProductPrice(product, country), country)}</p>
          <p className={`mt-4 text-xs ${product.stock > 0 ? 'text-emerald-300' : 'text-red-300'}`}>{product.stock > 0 ? `${product.stock} ${localizedCopy(country, 'in stock', 'imebaki dukani')}` : localizedCopy(country, 'Currently out of stock', 'Bidhaa imeisha dukani kwa sasa')}</p>
          <p className="mt-6 leading-7 text-muted">{country === 'TZ' ? product.descriptionSwahili || 'Bidhaa hii imechaguliwa kwa umakini kwa ubora, mtindo na matumizi ya kila siku.' : product.description}</p>
          <div className="mt-8 grid gap-6">
            <VariantPicker country={country} onChange={setVariant} value={variant} variants={product.variants} />
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="text-xs text-muted">{localizedCopy(country, 'Quantity', 'Idadi')}</span>
              <div className="flex items-center rounded-full border border-white/15">
                <button aria-label={localizedCopy(country, 'Decrease quantity', 'Punguza idadi')} className="h-10 w-10 text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))} type="button">−</button>
                <span aria-live="polite" aria-label={`Quantity ${quantity}`} className="min-w-6 text-center text-sm" role="status">{quantity}</span>
                <button aria-label={localizedCopy(country, 'Increase quantity', 'Ongeza idadi')} className="h-10 w-10 text-lg" onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))} type="button">+</button>
              </div>
              <span className="text-xs text-muted">{localizedCopy(country, 'Max', 'Kikomo')} {product.stock}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Button className="flex-1" disabled={product.stock < 1} onClick={addToCart}>{localizedCopy(country, 'Add to cart', 'Ongeza kwenye kikapu')}</Button>
            <WishlistButton className="h-12 w-12" product={product} />
          </div>
          <div className="mt-6"><DeliveryEstimate /></div>
        </div>
      </div>
      <DescriptionTabs product={product} />
      {related.length > 0 && <section className="mt-12"><h2 className="mb-5 font-heading text-3xl">{localizedCopy(country, 'You may also love', 'Unaweza pia kupenda')}</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((item) => <Link className="group" key={item.id} to={`/product/${item.id}`}><img alt={localizedProductName(country, item)} className="aspect-[4/5] w-full rounded-card object-cover" loading="lazy" src={item.image} /><p className="mt-3 font-heading text-lg group-hover:text-gold">{localizedProductName(country, item)}</p><p className="mt-1 text-sm text-gold">{formatCurrency(getProductPrice(item, country), country)}</p></Link>)}</div></section>}
    </div>
  );
}