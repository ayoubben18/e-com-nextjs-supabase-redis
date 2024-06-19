import { create } from "zustand";

type SearchStore = {
  searchTerm: string | null;
  setSearchTerm: (term: string) => void;
};

const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearchStore;
