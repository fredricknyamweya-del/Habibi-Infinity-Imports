import api, { withMockFallback } from './client.js';

export async function createOrder(payload) {
  const mockOrder = {
    id: `HAB-${Date.now().toString(36).toUpperCase()}`,
    status: 'processing',
    createdAt: new Date().toISOString(),
    ...payload,
  };
  return withMockFallback(async () => (await api.post('/orders', payload)).data, mockOrder, 'Orders');
}

export async function getOrder(id) {
  let savedOrder = null;
  try {
    savedOrder = JSON.parse(localStorage.getItem(`habibi-order-${id}`) || 'null');
  } catch (error) {
    console.warn(`Could not restore saved order ${id}.`, error);
  }
  return withMockFallback(
    async () => (await api.get(`/orders/${encodeURIComponent(id)}`)).data,
    savedOrder,
    'Order tracking',
  );
}