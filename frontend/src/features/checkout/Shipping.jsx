import Input from '../../components/ui/Input.jsx';

const regions = {
  KE: ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Kisumu', 'Uasin Gishu'],
  TZ: ['Dar es Salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Zanzibar', 'Kilimanjaro'],
};

export default function Shipping({ value, onChange }) {
  const update = (key, fieldValue) => onChange({ ...value, [key]: fieldValue });
  return (
    <section>
      <h2 className="mb-5 font-heading text-2xl">Where should we deliver?</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input autoComplete="name" id="customer-name" label="Full name" onChange={(event) => update('name', event.target.value)} required value={value.name} />
        <Input autoComplete="tel" id="customer-phone" label="Phone number" onChange={(event) => update('phone', event.target.value)} pattern="^\+?[0-9\s()-]{9,16}$" placeholder="+254..." required value={value.phone} />
        <Input autoComplete="email" id="customer-email" label="Email address (optional)" onChange={(event) => update('email', event.target.value)} type="email" value={value.email} />
        <label className="grid gap-2 text-sm text-muted" htmlFor="shipping-country">Country
          <select className="min-h-11 rounded-lg border border-white/15 bg-obsidian px-3 text-ivory" id="shipping-country" onChange={(event) => update('country', event.target.value)} value={value.country}>
            <option value="KE">Kenya</option><option value="TZ">Tanzania</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-muted" htmlFor="shipping-region">Region / county
          <select className="min-h-11 rounded-lg border border-white/15 bg-obsidian px-3 text-ivory" id="shipping-region" onChange={(event) => update('region', event.target.value)} required value={value.region}>
            <option value="">Choose a region</option>{regions[value.country].map((region) => <option key={region} value={region}>{region}</option>)}
          </select>
        </label>
        <Input autoComplete="address-level2" id="shipping-town" label="Town / city" onChange={(event) => update('town', event.target.value)} required value={value.town} />
        <div className="sm:col-span-2"><Input autoComplete="street-address" id="shipping-address" label="Street address / delivery directions" onChange={(event) => update('address', event.target.value)} required value={value.address} /></div>
      </div>
      <p className="mt-4 text-xs text-muted">We only use these details to deliver your order and provide updates.</p>
    </section>
  );
}