import { useId } from 'react';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function CountrySwitcher({ className = '', compact = false }) {
  const { country, setCountry } = useCountry();
  const id = useId();

  return (
    <label className={`inline-flex ${compact ? 'items-center' : 'flex-col items-center gap-1'} text-xs text-muted ${className}`} htmlFor={id}>
      <span className={compact ? 'sr-only' : ''}>{localizedCopy(country, 'Select Country', 'Chagua nchi')}</span>
      <select
        id={id}
        aria-label={compact ? localizedCopy(country, 'Select country and currency', 'Chagua nchi na sarafu') : undefined}
        className={`h-10 rounded-full border border-line bg-charcoal font-semibold text-xs text-ivory [color-scheme:dark] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 ${compact ? 'w-[76px] px-1.5 text-[10px]' : 'px-3'}`}
        onChange={(event) => setCountry(event.target.value)}
        value={country}
      >
        <option value="KE">KE · KES</option>
        <option value="TZ">TZ · TZS</option>
      </select>
    </label>
  );
}