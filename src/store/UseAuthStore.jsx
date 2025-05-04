import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      name: null,
      role: null,

      loginUser: (user) => set({ 
        user, 
        name: user.name, 
        role: user.role 
      }),

      logoutUser: () => set({ 
        user: null, 
        name: null, 
        role: null 
      }),
    }),
    {
      name: "auth-storage",     }
  )
);

export default useAuthStore;
