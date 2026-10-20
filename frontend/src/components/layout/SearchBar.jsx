import { useId, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function SearchBar({ onSearch, className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputId = useId();
  const { country } = useCountry();
  const searchLabel = localizedCopy(country, 'Search piece(s)', 'Tafuta bidhaa');
  const submit = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    if (onSearch) onSearch(value);
    else navigate(`/shop?q=${encodeURIComponent(value)}`);
  };

  return (
    <form className={`relative ${className}`} onSubmit={submit} role="search">
      <label className="sr-only" htmlFor={inputId}>{searchLabel}</label>
      <input
        id={inputId}
        aria-label={searchLabel}
        className="w-full rounded-full border border-white/10 bg-charcoal py-2.5 pl-4 pr-10 text-sm text-ivory placeholder:text-muted focus:border-gold"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchLabel}
        value={query}
      />
      <button aria-label={localizedCopy(country, 'Submit product search', 'Tafuta bidhaa')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gold" type="submit">
        <FiSearch aria-hidden="true" />
      </button>
    </form>
  );
}