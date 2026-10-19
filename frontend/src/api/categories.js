import api, { withMockFallback } from './client.js';
import { mockCategories } from '../data/products.js';

export async function getCategories() {
  return withMockFallback(
    async () => (await api.get('/categories')).data,
    mockCategories,
    'Categories',
  );
}