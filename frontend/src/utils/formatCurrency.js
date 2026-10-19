import { COUNTRIES } from './constants.js';

export function formatCurrency(amount, country = 'KE') {
  const config = COUNTRIES[country] || COUNTRIES.KE;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function getProductPrice(product, country = 'KE') {
  if (typeof product?.price === 'number') return product.price;
  return Number(product?.price?.[country] ?? product?.price?.KE ?? 0);
}
