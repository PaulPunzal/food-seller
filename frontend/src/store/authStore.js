import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth store — persisted to localStorage.
 * Stores the JWT and basic seller info.
 */
const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      seller: null,

      /** Called after successful login */
      setAuth: (token, seller) => set({ token, seller }),

      /** Called on logout or token expiry */
      clearAuth: () => set({ token: null, seller: null }),

      /** Convenience getter */
      isAuthenticated: () => !!useAuthStore.getState().token,
    }),
    {
      name: 'fsa-auth', // localStorage key
      partialize: (state) => ({ token: state.token, seller: state.seller }),
    }
  )
);

export default useAuthStore;