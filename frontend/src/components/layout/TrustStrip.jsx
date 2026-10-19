import { FiCreditCard, FiRefreshCw, FiShield, FiTruck } from 'react-icons/fi';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

const benefits = (country) => [
  { icon: FiCreditCard, title: localizedCopy(country, 'Secure M-Pesa', 'M-Pesa salama'), copy: localizedCopy(country, 'Easy local payments', 'Lipa kwa urahisi nchini') },
  { icon: FiTruck, title: localizedCopy(country, 'Delivery in KE & TZ', 'Uwasilishaji KE na TZ'), copy: localizedCopy(country, 'To your doorstep', 'Hadi mlangoni kwako') },
  { icon: FiShield, title: localizedCopy(country, 'Genuine imports', 'Bidhaa halisi zilizoagizwa'), copy: localizedCopy(country, 'Quality, always', 'Ubora kila wakati') },
  { icon: FiRefreshCw, title: localizedCopy(country, 'Easy returns', 'Urejeshaji rahisi'), copy: localizedCopy(country, 'Shop with confidence', 'Nunua kwa uhakika') },
];

export default function TrustStrip() {
  const { country } = useCountry();
  return (
    <section aria-label={localizedCopy(country, 'Shopping benefits', 'Faida za ununuzi')} className="grid grid-cols-2 gap-3 py-8 md:grid-cols-4">
      {benefits(country).map(({ icon: Icon, title, copy }) => (
        <div className="flex items-center gap-3 rounded-card border border-white/10 bg-charcoal/60 p-4" key={title}>
          <Icon aria-hidden="true" className="shrink-0 text-xl text-gold" />
          <div><h2 className="text-xs font-semibold text-ivory sm:text-sm">{title}</h2><p className="mt-1 text-[10px] text-muted sm:text-xs">{copy}</p></div>
        </div>
      ))}
    </section>
  );
}