import { create } from "zustand";

type FilterStore = {
  rating: number | null;
  setRating: (rating: number) => void;
  topPrice: number | null;
  setTopPrice: (topPrice: number) => void;
  removeFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  rating: null,
  setRating: (rating) => set({ rating }),
  topPrice: null,
  setTopPrice: (topPrice) => set({ topPrice }),
  removeFilters: () => set({ rating: null, topPrice: null }),
}));
