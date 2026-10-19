import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function AnnouncementBar() {
  const { country } = useCountry();
  return (
    <div className="bg-gold px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-obsidian sm:text-xs">
      {localizedCopy(country, 'Curated imports · Delivered across Kenya & Tanzania', 'Bidhaa zilizoagizwa kwa uangalifu · Tunawasilisha Kenya na Tanzania')}
    </div>
  );
}