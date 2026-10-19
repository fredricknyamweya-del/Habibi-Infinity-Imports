import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function DeliveryEstimate() {
  const { country, countryName } = useCountry();
  const delivery = localizedCopy(country, country === 'KE' ? '2–5 business days' : '3–7 business days', country === 'KE' ? 'Siku 2–5 za kazi' : 'Siku 3–7 za kazi');
  return <p className="rounded-lg border border-white/10 bg-charcoal px-4 py-3 text-xs text-muted">{localizedCopy(country, 'Delivery to', 'Uwasilishaji hadi')} <span className="text-ivory">{countryName}</span> · {localizedCopy(country, 'estimated in', 'unakadiriwa kuchukua')} {delivery}</p>;
}