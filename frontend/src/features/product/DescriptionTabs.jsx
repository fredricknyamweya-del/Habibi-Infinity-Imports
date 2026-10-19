import { useState } from 'react';

const tabs = ['Details', 'Shipping & returns'];

export default function DescriptionTabs({ product }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <section className="mt-12 border-t border-white/10 pt-7">
      <div className="flex gap-6 border-b border-white/10" role="tablist" aria-label="Product information">
        {tabs.map((tab) => <button aria-selected={active === tab} className={`border-b-2 pb-3 text-sm ${active === tab ? 'border-gold text-gold' : 'border-transparent text-muted'}`} key={tab} onClick={() => setActive(tab)} role="tab" type="button">{tab}</button>)}
      </div>
      <div className="max-w-3xl py-5 text-sm leading-7 text-muted" role="tabpanel">
        {active === tabs[0] ? product.description : 'We deliver across Kenya and Tanzania with reliable local delivery partners. If your purchase is not quite right, contact our team within 7 days of delivery to arrange a return.'}
      </div>
    </section>
  );
}