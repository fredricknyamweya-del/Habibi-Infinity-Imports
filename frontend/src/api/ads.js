import api, { withMockFallback } from './client.js';
import { mockAds } from '../data/ads.js';

export async function getAds(placement = '') {
  return withMockFallback(
    async () => (await api.get('/ads', { params: { placement } })).data,
    mockAds.filter((ad) => !placement || ad.placement === placement),
    'Ads',
  );
}