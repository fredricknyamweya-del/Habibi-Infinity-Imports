const options = [
  ['featured', 'Featured'],
  ['newest', 'Newest arrivals'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['rating', 'Top rated'],
];

export default function SortDropdown({ value = 'featured', onChange }) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted">
      Sort
      <select
        aria-label="Sort products"
        className="min-h-10 rounded-lg border border-white/15 bg-charcoal px-3 text-sm text-ivory"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select>
    </label>
  );
}