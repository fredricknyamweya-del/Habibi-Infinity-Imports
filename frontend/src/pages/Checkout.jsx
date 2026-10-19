import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders.js';
import { requestMpesaStk } from '../api/payments.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import CheckoutProgress from '../features/checkout/CheckoutProgress.jsx';
import DeliveryMethod from '../features/checkout/DeliveryMethod.jsx';
import Payment from '../features/checkout/Payment.jsx';
import Review from '../features/checkout/Review.jsx';
import Shipping from '../features/checkout/Shipping.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useCountry } from '../context/CountryContext.jsx';
import { DELIVERY_OPTIONS } from '../utils/constants.js';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState('Standard');
  const [payment, setPayment] = useState('mpesa');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { country, setCountry, currency } = useCountry();
  const { items, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({ name: '', phone: '', email: '', country, region: '', town: '', address: '' });

  if (items.length === 0 && !submitting) return <Container className="py-20 text-center"><h1 className="font-heading text-3xl">Your bag is empty</h1><p className="mt-3 text-muted">Add a few favourites before checking out.</p><Link className="mt-5 inline-block text-gold" to="/shop">Back to the collection</Link></Container>;

  const goNext = (event) => {
    event.preventDefault();
    if (step === 1) {
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      setCountry(shipping.country);
      setStep(2);
    } else if (step === 2) setStep(3);
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    if (payment === 'card') {
      toast.error('Card payment is not available yet. Please select M-Pesa or cash on delivery.');
      return;
    }
    if (payment === 'mpesa' && !/^\+?[0-9\s()-]{9,16}$/.test(paymentPhone)) {
      toast.error('Enter a valid M-Pesa phone number.');
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder({
        customer: { name: shipping.name, phone: shipping.phone, email: shipping.email },
        shipping: { country: shipping.country, region: shipping.region, town: shipping.town, address: shipping.address, method: delivery },
        payment: { method: payment },
        items: items.map((item) => ({ product_id: item.product.id, qty: item.qty, variant: item.variant })),
        currency,
      });
      const orderId = order.id || order.order_id || `HAB-${Date.now()}`;
      localStorage.setItem(`habibi-order-${orderId}`, JSON.stringify({ ...order, id: orderId, customer: { name: shipping.name, phone: shipping.phone }, items, subtotal }));
      if (payment === 'mpesa') {
        await requestMpesaStk({
          phone: paymentPhone,
          amount: subtotal + DELIVERY_OPTIONS[shipping.country][delivery],
          order_id: orderId,
        });
      }
      clearCart();
      navigate(`/order/success/${encodeURIComponent(orderId)}`);
    } catch (error) {
      console.error('Unable to place the order.', error);
      toast.error('We could not place your order. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Container className="max-w-4xl py-10">
      <div className="mb-7 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-gold">Almost yours</p><h1 className="mt-2 font-heading text-4xl">Checkout</h1></div><Link className="text-xs text-muted hover:text-gold" to="/cart">Return to bag</Link></div>
      <CheckoutProgress currentStep={step} />
      <form className="rounded-card border border-white/10 bg-charcoal p-5 sm:p-8" onSubmit={step < 3 ? goNext : placeOrder}>
        {step === 1 && <Shipping onChange={(next) => setShipping(next)} value={shipping} />}
        {step === 2 && <DeliveryMethod country={shipping.country} onChange={setDelivery} value={delivery} />}
        {step === 3 && <><Payment currency={currency} method={payment} onMethodChange={setPayment} onPhoneChange={setPaymentPhone} phone={paymentPhone} /><div className="mt-8"><Review delivery={delivery} payment={payment} shipping={shipping} /></div></>}
        <div className="mt-8 flex justify-between gap-3 border-t border-white/10 pt-5">
          {step > 1 ? <Button onClick={() => setStep(step - 1)} type="button" variant="ghost">Back</Button> : <span />}
          <Button disabled={submitting || (step === 3 && payment === 'card')} type="submit">{submitting ? 'Placing order…' : step === 3 ? 'Place order' : 'Continue'}</Button>
        </div>
      </form>
    </Container>
  );
}