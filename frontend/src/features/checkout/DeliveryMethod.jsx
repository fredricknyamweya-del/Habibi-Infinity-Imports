import { DELIVERY_OPTIONS } from '../../utils/constants.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { localizedCopy } from '../../utils/localization.js';

const options = (country) => [
  { id: 'Standard', estimate: localizedCopy(country, '2–7 business days', 'Siku 2–7 za kazi'), description: localizedCopy(country, 'Reliable delivery to your address.', 'Tutakuletea oda yako kwa uaminifu hadi kwenye anwani yako.') },
  { id: 'Express', estimate: localizedCopy(country, '1–3 business days', 'Siku 1–3 za kazi'), description: localizedCopy(country, 'Priority handling for a quicker arrival.', 'Oda yako itapewa kipaumbele ili ikufikie haraka.') },
  { id: 'Pickup', estimate: localizedCopy(country, 'Ready in 1–2 business days', 'Tayari ndani ya siku 1–2 za kazi'), description: localizedCopy(country, 'Collect from our local pickup point.', 'Chukua oda yako katika sehemu yetu ya karibu ya kuchukulia bidhaa.') },
];

export default function DeliveryMethod({ country, value, onChange }) {
  return (
    <section>
      <h2 className="mb-2 font-heading text-2xl">{localizedCopy(country, 'Choose delivery', 'Chagua njia ya kupokea bidhaa')}</h2>
      <p className="mb-5 text-sm text-muted">{localizedCopy(country, 'Select the option that suits you best.', 'Chagua njia inayokufaa zaidi.')}</p>
      <div className="grid gap-3">
        {options(country).map((option) => (
          <label className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition ${value === option.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-charcoal hover:border-white/25'}`} key={option.id}>
            <input checked={value === option.id} className="mt-1 accent-[#D4B978]" name="delivery-method" onChange={() => onChange(option.id)} type="radio" />
            <span className="flex-1"><span className="flex justify-between gap-3 text-sm font-semibold"><span>{option.id}</span><span className="text-gold">{formatCurrency(DELIVERY_OPTIONS[country][option.id], country)}</span></span><span className="mt-1 block text-xs text-muted">{option.description} · {option.estimate}</span></span>
          </label>
        ))}
      </div>
      <p className="mt-5 rounded-lg border border-gold/20 bg-obsidian p-4 text-sm leading-6 text-muted">
        {localizedCopy(country, 'Pickup is available at our Nairobi Shop, Mombasa Shop, and Dar es Salaam Shop. For other regions without a physical shop, trusted delivery partners such as G4S, Wells Fargo, Easy Coach, and others will deliver your order. Partner delivery fees are charged to the client and included in the delivery details and total shown at checkout.', 'Unaweza kuchukua oda katika Nairobi Shop, Mombasa Shop au Dar es Salaam Shop. Katika maeneo mengine yasiyo na duka letu, oda huwasilishwa na washirika wanaoaminika kama G4S, Wells Fargo, Easy Coach na wengine. Gharama za usafirishaji hulipwa na mteja na hujumuishwa kwenye maelezo ya uwasilishaji na jumla inayoonyeshwa wakati wa kukamilisha oda.')}
      </p>
    </section>
  );
}