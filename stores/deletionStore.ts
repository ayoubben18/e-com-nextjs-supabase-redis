import { create } from "zustand";

type DeletionStore = {
  item: string;
  setItem: (id: string) => void;
};

const useDeletionStore = create<DeletionStore>((set) => ({
  item: "",
  setItem: (id: string) => set({ item: id }),
}));

export default useDeletionStore;
