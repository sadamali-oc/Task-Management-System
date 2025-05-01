import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  loginUser: (userData) => set({ user: userData }),
  logoutUser: () => set({ user: null }),
}));

export default useUserStore;