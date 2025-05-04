import { create } from "zustand";


//create the store
const useAuthStore = create((set) => (
  {

  user: null,
  name: null,
  role: null,

  
  loginUser: (user) => 
    set({ 
      user, 
      name: user.name, 
      role: user.role }),


  logoutUser: () => set({
     user: null, 
     name: null,
     role: null 
    }),
}

));

export default useAuthStore;
