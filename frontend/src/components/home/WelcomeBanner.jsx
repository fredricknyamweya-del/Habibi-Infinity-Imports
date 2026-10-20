import { useCountry } from '../../context/CountryContext.jsx';

export default function WelcomeBanner() {
  const { country } = useCountry();

  return (
    <div className="text-right">
      <h2 className="welcome-banner">{country === 'TZ' ? 'Karibu Habibi' : 'Welcome Habibi'}</h2>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold sm:text-xs">
        A world of beautiful finds
      </p>
    </div>
  );
}
