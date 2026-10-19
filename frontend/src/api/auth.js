import api, { withMockFallback } from './client.js';

export async function requestOtp(payload) {
  return withMockFallback(async () => (await api.post('/auth/otp', payload)).data, { success: true, mock: true }, 'Authentication');
}