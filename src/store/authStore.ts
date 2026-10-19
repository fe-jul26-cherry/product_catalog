import { create } from 'zustand';

import { isSupabaseConfigured, onAuthChange } from '@/services';

import { syncProfile } from './profileStore';
import { startUserSync, syncUser } from './userSync';

import type { AuthUser } from '@/types';

interface AuthState {
  user: AuthUser | null;
  isReady: boolean;
}

export const useAuthStore = create<AuthState>()(() => ({
  user: null,
  isReady: false,
}));

export const initAuth = () => {
  if (!isSupabaseConfigured) {
    useAuthStore.setState({ isReady: true });

    return;
  }

  startUserSync();

  onAuthChange((user) => {
    useAuthStore.setState({ user, isReady: true });
    setTimeout(() => {
      void syncUser(user);
      void syncProfile(user);
    }, 0);
  });
};
