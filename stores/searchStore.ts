import { create } from "zustand";

type SearchStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearchStore;
