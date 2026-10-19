const steps = ['Shipping', 'Delivery', 'Payment'];

export default function CheckoutProgress({ currentStep }) {
  return (
    <ol aria-label="Checkout progress" className="mb-8 grid grid-cols-3 gap-2">
      {steps.map((label, index) => {
        const step = index + 1;
        return (
          <li aria-current={step === currentStep ? 'step' : undefined} className="min-w-0" key={label}>
            <div className={`h-1 rounded-full ${step <= currentStep ? 'bg-gold' : 'bg-white/15'}`} />
            <p className={`mt-2 text-xs ${step === currentStep ? 'text-gold' : 'text-muted'}`}><span className="mr-2">{String(step).padStart(2, '0')}</span>{label}</p>
          </li>
        );
      })}
    </ol>
  );
}