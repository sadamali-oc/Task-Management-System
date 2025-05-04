import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],  
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),  // Action to add a new task
}));

export default useTaskStore;