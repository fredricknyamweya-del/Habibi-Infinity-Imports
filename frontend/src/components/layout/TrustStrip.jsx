import { FiCreditCard, FiRefreshCw, FiShield, FiTruck } from 'react-icons/fi';

const benefits = [
  { icon: FiCreditCard, title: 'Secure M-Pesa', copy: 'Easy local payments' },
  { icon: FiTruck, title: 'Delivery in KE & TZ', copy: 'To your doorstep' },
  { icon: FiShield, title: 'Genuine imports', copy: 'Quality, always' },
  { icon: FiRefreshCw, title: 'Easy returns', copy: 'Shop with confidence' },
];

export default function TrustStrip() {
  return (
    <section aria-label="Shopping benefits" className="grid grid-cols-2 gap-3 py-8 md:grid-cols-4">
      {benefits.map(({ icon: Icon, title, copy }) => (
        <div className="flex items-center gap-3 rounded-card border border-white/10 bg-charcoal/60 p-4" key={title}>
          <Icon aria-hidden="true" className="shrink-0 text-xl text-gold" />
          <div><h2 className="text-xs font-semibold text-ivory sm:text-sm">{title}</h2><p className="mt-1 text-[10px] text-muted sm:text-xs">{copy}</p></div>
        </div>
      ))}
    </section>
  );
}