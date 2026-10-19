import { useId } from 'react';
import { useCountry } from '../../context/CountryContext.jsx';

export default function CountrySwitcher({ className = '' }) {
  const { country, setCountry } = useCountry();
  const id = useId();

  return (
    <label className={`text-xs text-muted ${className}`} htmlFor={id}>
      Delivery country
      <select
        id={id}
        aria-label="Delivery country"
        className="rounded-full border border-white/15 bg-charcoal px-3 py-2 text-xs text-ivory"
        onChange={(event) => setCountry(event.target.value)}
        value={country}
      >
        <option value="KE">KE · KES</option>
        <option value="TZ">TZ · TZS</option>
      </select>
    </label>
  );
}