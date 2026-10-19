import api, { withMockFallback } from './client.js';

export async function getAds(placement = '') {
  return withMockFallback(
    async () => (await api.get('/ads', { params: { placement } })).data,
    [],
    'Ads',
  );
}