import { useCountry } from '../../context/CountryContext.jsx';

export default function DeliveryEstimate() {
  const { country, countryName } = useCountry();
  const delivery = country === 'KE' ? '2–5 business days' : '3–7 business days';
  return <p className="rounded-lg border border-white/10 bg-charcoal px-4 py-3 text-xs text-muted">Delivery to <span className="text-ivory">{countryName}</span> · estimated in {delivery}</p>;
}