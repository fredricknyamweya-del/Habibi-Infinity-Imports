import { useState } from 'react';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy, localizedProductName } from '../../utils/localization.js';

export default function Gallery({ product }) {
  const [selected, setSelected] = useState(0);
  const { country } = useCountry();
  const images = [product.image, product.image].filter(Boolean);
  return (
    <div>
      <div className="overflow-hidden rounded-card border border-white/10 bg-charcoal">
        <img alt={`${localizedProductName(country, product)}, ${localizedCopy(country, 'view', 'picha')} ${selected + 1}`} className="aspect-[4/5] w-full object-cover" src={images[selected]} />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((image, index) => <button aria-label={`${localizedCopy(country, 'View product image', 'Tazama picha ya bidhaa')} ${index + 1}`} aria-pressed={selected === index} className={`overflow-hidden rounded-lg border ${selected === index ? 'border-gold' : 'border-white/10'}`} key={`${image}-${index}`} onClick={() => setSelected(index)} type="button"><img alt="" className="aspect-square w-full object-cover" loading="lazy" src={image} /></button>)}
      </div>
    </div>
  );
}