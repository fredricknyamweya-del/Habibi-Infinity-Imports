import { useState } from 'react';

export default function CountrySwitcher({ className = '' }) {
  const [country, setCountry] = useState(() => localStorage.getItem('habibi-country') || 'KE');
  const changeCountry = (event) => {
    setCountry(event.target.value);
    localStorage.setItem('habibi-country', event.target.value);
    window.dispatchEvent(new Event('habibi-country-change'));
  };

  return (
    <label className={`sr-only ${className}`} htmlFor="country-switcher">
      Delivery country
      <select
        id="country-switcher"
        aria-label="Delivery country"
        className="rounded-full border border-white/15 bg-charcoal px-3 py-2 text-xs text-ivory"
        onChange={changeCountry}
        value={country}
      >
        <option value="KE">KE · KES</option>
        <option value="TZ">TZ · TZS</option>
      </select>
    </label>
  );
}