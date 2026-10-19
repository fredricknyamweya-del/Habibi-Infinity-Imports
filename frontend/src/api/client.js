import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

export async function withMockFallback(request, fallback, label) {
  try {
    return await request();
  } catch (error) {
    console.warn(`${label} API unavailable; using local mock data.`, error.message);
    return fallback;
  }
}

export default api;