import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: null,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));

export default useAuthStore;
