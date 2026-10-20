import Input from '../../components/ui/Input.jsx';
import { localizedCopy } from '../../utils/localization.js';

export default function Payment({ method, onMethodChange, phone, onPhoneChange, currency, country }) {
  const methods = [
    { id: 'mpesa', title: 'M-Pesa', detail: localizedCopy(country, 'Secure STK push to your phone', 'Ombi salama la malipo la STK litatumwa kwenye simu yako') },
    { id: 'card', title: localizedCopy(country, 'Card', 'Kadi'), detail: localizedCopy(country, 'Card payment coming soon', 'Malipo kwa kadi yatapatikana hivi karibuni') },
    { id: 'cod', title: localizedCopy(country, 'Cash on delivery', 'Lipa unapopokea'), detail: localizedCopy(country, 'Pay when your order arrives', 'Lipa oda yako itakapowasili') },
  ];
  return (
    <section>
      <h2 className="mb-2 font-heading text-2xl">{localizedCopy(country, 'How would you like to pay?', 'Ungependa kulipa vipi?')}</h2>
      <p className="mb-5 text-sm text-muted">{localizedCopy(country, 'All payments are handled securely.', 'Malipo yote yanashughulikiwa kwa usalama.')}</p>
      <div className="grid gap-3">
        {methods.map((item) => (
          <label className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 ${method === item.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-charcoal'}`} key={item.id}>
            <input checked={method === item.id} className="mt-1 accent-[#D4B978]" name="payment-method" onChange={() => onMethodChange(item.id)} type="radio" />
            <span><span className="block text-sm font-semibold">{item.title}</span><span className="mt-1 block text-xs text-muted">{item.detail}</span></span>
          </label>
        ))}
      </div>
      {method === 'mpesa' && <div className="mt-5"><Input autoComplete="tel" id="mpesa-phone" label={`${localizedCopy(country, 'M-Pesa phone number', 'Nambari ya simu ya M-Pesa')} (${currency})`} onChange={(event) => onPhoneChange(event.target.value)} placeholder="+254..." required type="tel" value={phone} /></div>}
      {method === 'card' && <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs text-gold">{localizedCopy(country, 'Card payments are coming soon. Choose M-Pesa or cash on delivery to complete your order.', 'Malipo kwa kadi yatapatikana hivi karibuni. Chagua M-Pesa au ulipie unapopokea ili kukamilisha oda yako.')}</p>}
    </section>
  );
}