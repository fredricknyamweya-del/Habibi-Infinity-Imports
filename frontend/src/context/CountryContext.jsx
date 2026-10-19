import { createContext, useContext, useMemo, useState } from 'react';
import { COUNTRIES, STORAGE_KEYS } from '../utils/constants.js';

const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const [country, setCountryState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.country);
    return stored === 'TZ' ? 'TZ' : 'KE';
  });
  const setCountry = (nextCountry) => {
    if (!COUNTRIES[nextCountry]) throw new Error(`Unsupported country: ${nextCountry}`);
    localStorage.setItem(STORAGE_KEYS.country, nextCountry);
    setCountryState(nextCountry);
  };
  const value = useMemo(() => ({
    country,
    currency: COUNTRIES[country].currency,
    countryName: COUNTRIES[country].name,
    setCountry,
  }), [country]);
  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) throw new Error('useCountry must be used within CountryProvider');
  return context;
}
