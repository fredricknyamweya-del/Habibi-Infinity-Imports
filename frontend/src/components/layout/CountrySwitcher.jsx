import { useId } from 'react';
import { useCountry } from '../../context/CountryContext.jsx';

export default function CountrySwitcher({ className = '', compact = false }) {
  const { country, setCountry } = useCountry();
  const id = useId();

  return (
    <label className={`inline-flex ${compact ? 'items-center' : 'flex-col items-start gap-1'} text-xs text-muted ${className}`} htmlFor={id}>
      <span className={compact ? 'sr-only' : ''}>Select Country</span>
      <select
        id={id}
        aria-label={compact ? 'Select country and currency' : undefined}
        className={`min-h-10 rounded-full border border-line bg-charcoal text-xs text-ivory focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 ${compact ? 'max-w-[72px] px-1.5' : 'px-3'}`}
        onChange={(event) => setCountry(event.target.value)}
        value={country}
      >
        <option value="KE">KE · KES</option>
        <option value="TZ">TZ · TZS</option>
      </select>
    </label>
  );
}