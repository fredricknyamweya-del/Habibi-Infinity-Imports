import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function PromoCodeInput() {
  const [code, setCode] = useState('');
  const { country } = useCountry();
  return (
    <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); toast(localizedCopy(country, 'Promo codes are not active yet.', 'Misimbo ya ofa bado haijaanza kutumika.')); }}>
      <label className="sr-only" htmlFor="promo-code">{localizedCopy(country, 'Promo code', 'Msimbo wa ofa')}</label>
      <input autoComplete="off" className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-obsidian px-3 text-sm text-ivory placeholder:text-muted" id="promo-code" onChange={(event) => setCode(event.target.value)} placeholder={localizedCopy(country, 'Promo code', 'Msimbo wa ofa')} value={code} />
      <button className="rounded-lg border border-gold/40 px-4 text-xs font-semibold text-gold hover:bg-gold hover:text-obsidian" type="submit">{localizedCopy(country, 'Apply', 'Tumia')}</button>
    </form>
  );
}