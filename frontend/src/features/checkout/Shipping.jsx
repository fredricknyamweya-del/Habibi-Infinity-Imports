import Input from '../../components/ui/Input.jsx';
import { localizedCopy } from '../../utils/localization.js';

const regions = {
  KE: ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Kisumu', 'Uasin Gishu'],
  TZ: ['Dar es Salaam', 'Arusha', 'Dodoma', 'Mwanza', 'Zanzibar', 'Kilimanjaro'],
};

export default function Shipping({ value, onChange }) {
  const update = (key, fieldValue) => onChange({ ...value, [key]: fieldValue });
  return (
    <section>
      <h2 className="mb-5 font-heading text-2xl">{localizedCopy(value.country, 'Where should we deliver?', 'Tuwasilishe wapi?')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input autoComplete="name" id="customer-name" label={localizedCopy(value.country, 'Full name', 'Jina kamili')} onChange={(event) => update('name', event.target.value)} required value={value.name} />
        <Input autoComplete="tel" id="customer-phone" label={localizedCopy(value.country, 'Phone number', 'Nambari ya simu')} onChange={(event) => update('phone', event.target.value)} placeholder="+254..." required type="tel" value={value.phone} />
        <Input autoComplete="email" id="customer-email" label={localizedCopy(value.country, 'Email address (optional)', 'Barua pepe (si lazima)')} onChange={(event) => update('email', event.target.value)} type="email" value={value.email} />
        <label className="grid gap-2 text-sm text-muted" htmlFor="shipping-country">{localizedCopy(value.country, 'Country', 'Nchi')}
          <select className="min-h-11 rounded-lg border border-white/15 bg-obsidian px-3 text-ivory" id="shipping-country" onChange={(event) => update('country', event.target.value)} value={value.country}>
            <option value="KE">{localizedCopy(value.country, 'Kenya', 'Kenya')}</option><option value="TZ">{localizedCopy(value.country, 'Tanzania', 'Tanzania')}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-muted" htmlFor="shipping-region">{localizedCopy(value.country, 'Region / county', 'Mkoa / kaunti')}
          <select className="min-h-11 rounded-lg border border-white/15 bg-obsidian px-3 text-ivory" id="shipping-region" onChange={(event) => update('region', event.target.value)} required value={value.region}>
            <option value="">{localizedCopy(value.country, 'Choose a region', 'Chagua mkoa')}</option>{regions[value.country].map((region) => <option key={region} value={region}>{region}</option>)}
          </select>
        </label>
        <Input autoComplete="address-level2" id="shipping-town" label={localizedCopy(value.country, 'Town / city', 'Mji / jiji')} onChange={(event) => update('town', event.target.value)} required value={value.town} />
        <div className="sm:col-span-2"><Input autoComplete="street-address" id="shipping-address" label={localizedCopy(value.country, 'Street address / delivery directions', 'Anwani ya mtaa / maelekezo ya uwasilishaji')} onChange={(event) => update('address', event.target.value)} required value={value.address} /></div>
      </div>
      <p className="mt-4 text-xs text-muted">{localizedCopy(value.country, 'We only use these details to deliver your order and provide updates.', 'Tutatumia maelezo haya kuwasilisha oda yako na kukupa taarifa zake pekee.')}</p>
    </section>
  );
}