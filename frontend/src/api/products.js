import api, { withMockFallback } from './client.js';
import { mockProducts } from '../data/products.js';

export async function getProducts(params = {}) {
  return withMockFallback(
    async () => (await api.get('/products', { params })).data,
    filterMockProducts(params),
    'Products',
  );
}

export async function getProduct(id) {
  return withMockFallback(
    async () => (await api.get(`/products/${encodeURIComponent(id)}`)).data,
    mockProducts.find((product) => product.id === id) || null,
    'Product',
  );
}

export function filterMockProducts(params = {}) {
  const query = String(params.q || '').toLowerCase();
  const minimum = Number(params.min) || 0;
  const maximum = Number(params.max) || Number.POSITIVE_INFINITY;
  const filtered = mockProducts.filter((product) => {
    const price = product.price[params.country || 'KE'];
    return (!params.category || product.category === params.category)
      && (!params.subcategory || product.subcategory.toLowerCase() === String(params.subcategory).toLowerCase())
      && (!query || `${product.name} ${product.categoryName} ${product.subcategory}`.toLowerCase().includes(query))
      && price >= minimum && price <= maximum
      && (!params.rating || product.rating >= Number(params.rating));
  });
  if (params.sort === 'price-asc') filtered.sort((a, b) => a.price[params.country || 'KE'] - b.price[params.country || 'KE']);
  if (params.sort === 'price-desc') filtered.sort((a, b) => b.price[params.country || 'KE'] - a.price[params.country || 'KE']);
  if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (params.sort === 'newest') filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  const page = Math.max(1, Number(params.page) || 1);
  return { items: filtered.slice((page - 1) * 12, page * 12), total: filtered.length, page, pages: Math.ceil(filtered.length / 12) };
}