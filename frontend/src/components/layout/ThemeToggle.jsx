import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      aria-label={`Switch to ${nextTheme} mode`}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-charcoal text-lg text-ivory transition hover:border-gold hover:text-gold"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
    </button>
  );
}
