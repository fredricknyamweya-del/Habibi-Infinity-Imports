import { useCountry } from '../../context/CountryContext.jsx';

export default function CountrySwitcher({ className = '' }) {
  const { country, setCountry } = useCountry();

  return (
    <label className={`sr-only ${className}`} htmlFor="country-switcher">
      Delivery country
      <select
        id="country-switcher"
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