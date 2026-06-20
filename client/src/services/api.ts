import { useSessionStore } from '@/stores/session';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useSessionStore.getState().accessToken;
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'request_failed' }));
    throw new Error(error.error);
  }

  return response.json();
}
