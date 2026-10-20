import { useState } from 'react';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function DescriptionTabs({ product }) {
  const { country } = useCountry();
  const [active, setActive] = useState('details');
  const tabs = [
    { id: 'details', label: localizedCopy(country, 'Details', 'Maelezo') },
    { id: 'shipping', label: localizedCopy(country, 'Shipping & returns', 'Uwasilishaji na marejesho') },
  ];
  return (
    <section className="mt-12 border-t border-white/10 pt-7">
      <div className="flex gap-6 border-b border-white/10" role="tablist" aria-label={localizedCopy(country, 'Product information', 'Taarifa za bidhaa')}>
        {tabs.map((tab) => <button aria-selected={active === tab.id} className={`border-b-2 pb-3 text-sm ${active === tab.id ? 'border-gold text-gold' : 'border-transparent text-muted'}`} key={tab.id} onClick={() => setActive(tab.id)} role="tab" type="button">{tab.label}</button>)}
      </div>
      <div className="max-w-3xl py-5 text-sm leading-7 text-muted" role="tabpanel">
        {active === 'details'
          ? country === 'TZ' ? product.descriptionSwahili || 'Bidhaa hii imechaguliwa kwa umakini kwa ubora, mtindo na matumizi ya kila siku.' : product.description
          : localizedCopy(country, 'We deliver across Kenya and Tanzania with reliable local delivery partners. If your purchase is not quite right, contact our team within 7 days of delivery to arrange a return.', 'Tunasafirisha bidhaa kote Kenya na Tanzania kupitia washirika wa usafirishaji wanaoaminika. Ikiwa bidhaa uliyonunua haikufai, wasiliana na timu yetu ndani ya siku 7 baada ya kuipokea ili kupanga marejesho.')}
      </div>
    </section>
  );
}