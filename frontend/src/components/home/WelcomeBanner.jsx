import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function WelcomeBanner() {
  const { country } = useCountry();

  return (
    <div className="text-right">
      <h2 className="welcome-banner">Karibu Habibi</h2>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-xs">
        {localizedCopy(country, 'A world of beautiful finds', 'Dunia ya bidhaa nzuri')}
      </p>
    </div>
  );
}
