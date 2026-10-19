import { useEffect, useState } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PROMO_KEY = 'habibi-promo-dismissed';

export default function PromoPopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(PROMO_KEY)) return undefined;
    const timer = window.setTimeout(() => setShow(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);
  const close = () => {
    sessionStorage.setItem(PROMO_KEY, 'true');
    setShow(false);
  };
  return (
    <Modal centered onHide={close} show={show}>
      <div className="rounded-card border border-gold/30 bg-charcoal p-6 text-ivory">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="font-heading text-2xl">A little welcome from us</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-sm leading-6 text-muted">Discover pieces worth keeping, thoughtfully sourced and delivered across East Africa.</Modal.Body>
        <Modal.Footer className="gap-2 border-0">
          <BootstrapButton className="rounded-full border border-white/20 px-4 py-2 text-sm text-muted" onClick={close} variant="link">Maybe later</BootstrapButton>
          <Link className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-obsidian" onClick={close} to="/shop">Explore the edit</Link>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
