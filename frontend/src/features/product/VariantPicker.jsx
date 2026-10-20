import { localizedCopy, localizedVariantName } from '../../utils/localization.js';

export default function VariantPicker({ variants = [], value, onChange, country }) {
  if (!variants.length) return null;
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{localizedCopy(country, 'Choose a variant', 'Chagua aina ya bidhaa')}</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button aria-pressed={value === variant} className={`min-h-10 rounded-full border px-4 text-xs ${value === variant ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 text-ivory hover:border-gold/60'}`} key={variant} onClick={() => onChange(variant)} type="button">{localizedVariantName(country, variant)}</button>
        ))}
      </div>
    </fieldset>
  );
}