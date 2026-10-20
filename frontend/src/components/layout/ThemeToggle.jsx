import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { country } = useCountry();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      aria-label={localizedCopy(country, `Switch to ${nextTheme} mode`, `Badilisha kwenda hali ya ${nextTheme === 'dark' ? 'giza' : 'mwanga'}`)}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-charcoal text-lg text-ivory transition hover:border-gold hover:text-gold"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
    </button>
  );
}
