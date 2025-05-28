import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userImg: string;
  setIsLoggedIn: (value: boolean) => void;
  setUserImg: (value: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userImg: '',
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUserImg: (value) => set({ userImg: value }),
}));

export default useAuthStore;
