// store/categoryStore.js

import create from 'zustand';

export const useCategoryStore = create((set) => ({
  categories: [],
  subcategories: [],
  category: '',
  subcategory: '',
  setCategories: (categories) => set({ categories }),
  setCategory: (category) => set({ category, subcategory: '' }), // Reset subcategory when category changes
  setSubcategory: (subcategory) => set({ subcategory }),
}));
