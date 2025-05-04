import { create } from "zustand";

interface LoginState {
  email: string | null;
  setEmail: (email: string) => void;
  resetState: () => void;
}

export const useLogin = create<LoginState>((set) => ({
  email: null,
  setEmail: (email: string) => set({ email }),
  resetState: () => set({ email: null }),
}));
