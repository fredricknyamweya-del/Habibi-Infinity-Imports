import { DELIVERY_OPTIONS } from '../../utils/constants.js';
import { formatCurrency } from '../../utils/formatCurrency.js';

const options = [
  { id: 'Standard', estimate: '2–7 business days', description: 'Reliable delivery to your address.' },
  { id: 'Express', estimate: '1–3 business days', description: 'Priority handling for a quicker arrival.' },
  { id: 'Pickup', estimate: 'Ready in 1–2 business days', description: 'Collect from our local pickup point.' },
];

export default function DeliveryMethod({ country, value, onChange }) {
  return (
    <section>
      <h2 className="mb-2 font-heading text-2xl">Choose delivery</h2>
      <p className="mb-5 text-sm text-muted">Select the option that suits you best.</p>
      <div className="grid gap-3">
        {options.map((option) => (
          <label className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition ${value === option.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-charcoal hover:border-white/25'}`} key={option.id}>
            <input checked={value === option.id} className="mt-1 accent-[#D4B978]" name="delivery-method" onChange={() => onChange(option.id)} type="radio" />
            <span className="flex-1"><span className="flex justify-between gap-3 text-sm font-semibold"><span>{option.id}</span><span className="text-gold">{formatCurrency(DELIVERY_OPTIONS[country][option.id], country)}</span></span><span className="mt-1 block text-xs text-muted">{option.description} · {option.estimate}</span></span>
          </label>
        ))}
      </div>
    </section>
  );
}