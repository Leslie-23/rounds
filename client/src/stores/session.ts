import { create } from 'zustand';

export type Role = 'member' | 'restaurant_staff' | 'restaurant_owner' | 'admin';

type SessionUser = {
  sub: string;
  role: Role;
  venueIds: string[];
};

type SessionState = {
  accessToken: string | null;
  user: SessionUser | null;
  setSession: (session: { accessToken: string; user: SessionUser }) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  user: null,
  setSession: (session) => set(session),
  clearSession: () => set({ accessToken: null, user: null })
}));
