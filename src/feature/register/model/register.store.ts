import { create } from "zustand";

interface RegisterState {
  email: string | null;
  setEmail: (email: string) => void;
  resetState: () => void;
}

export const useRegister = create<RegisterState>((set) => ({
  email: null,
  setEmail: (email: string) => set({ email }),
  resetState: () => set({ email: null }),
}));
