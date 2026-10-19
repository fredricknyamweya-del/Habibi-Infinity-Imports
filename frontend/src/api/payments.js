import api, { withMockFallback } from './client.js';

export async function requestMpesaStk(payload) {
  const mockResponse = { success: true, checkoutRequestId: `MOCK-${Date.now()}`, message: 'Payment request simulated.' };
  return withMockFallback(async () => (await api.post('/payments/mpesa/stk', payload)).data, mockResponse, 'M-Pesa');
}