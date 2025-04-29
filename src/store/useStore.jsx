import { create } from "zustand";

// Create a global Zustand store
const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));

export default useStore;
