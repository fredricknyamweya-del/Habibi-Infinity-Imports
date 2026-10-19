import Input from '../../components/ui/Input.jsx';

const methods = [
  { id: 'mpesa', title: 'M-Pesa', detail: 'Secure STK push to your phone' },
  { id: 'card', title: 'Card', detail: 'Card payment coming soon' },
  { id: 'cod', title: 'Cash on delivery', detail: 'Pay when your order arrives' },
];

export default function Payment({ method, onMethodChange, phone, onPhoneChange, currency }) {
  return (
    <section>
      <h2 className="mb-2 font-heading text-2xl">How would you like to pay?</h2>
      <p className="mb-5 text-sm text-muted">All payments are handled securely.</p>
      <div className="grid gap-3">
        {methods.map((item) => (
          <label className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 ${method === item.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-charcoal'}`} key={item.id}>
            <input checked={method === item.id} className="mt-1 accent-[#D4B978]" name="payment-method" onChange={() => onMethodChange(item.id)} type="radio" />
            <span><span className="block text-sm font-semibold">{item.title}</span><span className="mt-1 block text-xs text-muted">{item.detail}</span></span>
          </label>
        ))}
      </div>
      {method === 'mpesa' && <div className="mt-5"><Input autoComplete="tel" id="mpesa-phone" label={`M-Pesa phone number (${currency})`} onChange={(event) => onPhoneChange(event.target.value)} pattern="^\+?[0-9\s()-]{9,16}$" placeholder="+254..." required value={phone} /></div>}
      {method === 'card' && <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs text-gold">Card payments are coming soon. Choose M-Pesa or cash on delivery to complete your order.</p>}
    </section>
  );
}