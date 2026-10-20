import { localizedCopy } from '../../utils/localization.js';

const steps = [
  { id: 'processing', label: 'Order received' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'shipped', label: 'On its way' },
  { id: 'delivered', label: 'Delivered' },
];

export default function TrackingTimeline({ status = 'processing', country }) {
  const labels = country === 'TZ'
    ? ['Oda imepokelewa', 'Imethibitishwa', 'Inasafirishwa', 'Imefikishwa']
    : steps.map((step) => step.label);
  const active = steps.findIndex((step) => step.id === String(status).toLowerCase());
  const currentIndex = active < 0 ? 0 : active;
  return (
    <ol aria-label={localizedCopy(country, 'Order progress', 'Maendeleo ya oda')} className="grid gap-0 sm:grid-cols-4">
      {steps.map((step, index) => (
        <li className="relative flex gap-3 pb-6 sm:flex-col sm:pb-0" key={step.id}>
          {index < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-px sm:left-6 sm:top-[11px] sm:h-px sm:w-[calc(100%-12px)] ${index < currentIndex ? 'bg-gold' : 'bg-white/15'}`} />}
          <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${index <= currentIndex ? 'border-gold bg-gold text-obsidian' : 'border-white/20 text-muted'}`}>{index < currentIndex ? '✓' : index + 1}</span>
          <span className={`pt-1 text-xs ${index <= currentIndex ? 'text-ivory' : 'text-muted'}`}>{labels[index]}</span>
        </li>
      ))}
    </ol>
  );
}