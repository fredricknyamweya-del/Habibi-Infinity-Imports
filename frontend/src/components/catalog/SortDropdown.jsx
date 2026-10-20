import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

const options = [
  ['featured', 'Featured', 'Zilizoangaziwa'],
  ['newest', 'Newest arrivals', 'Zilizowasili karibuni'],
  ['price-asc', 'Price: low to high', 'Bei: kutoka ya chini hadi ya juu'],
  ['price-desc', 'Price: high to low', 'Bei: kutoka ya juu hadi ya chini'],
  ['rating', 'Top rated', 'Zenye ukadiriaji wa juu'],
];

export default function SortDropdown({ value = 'featured', onChange }) {
  const { country } = useCountry();
  return (
    <label className="flex items-center gap-2 text-xs text-muted">
      {localizedCopy(country, 'Sort', 'Panga')}
      <select
        aria-label={localizedCopy(country, 'Sort products', 'Panga bidhaa')}
        className="min-h-10 rounded-lg border border-white/15 bg-charcoal px-3 text-sm text-ivory"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([id, label, swahili]) => <option key={id} value={id}>{localizedCopy(country, label, swahili)}</option>)}
      </select>
    </label>
  );
}