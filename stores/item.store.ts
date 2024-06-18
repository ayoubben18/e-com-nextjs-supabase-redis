import { create } from "zustand";

type ItemStore = {
  color: string | null;
  setColor: (color: string) => void;
  size: string | null;
  setSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export const useItemStore = create<ItemStore>((set) => ({
  color: null,
  setColor: (color) => set({ color }),
  size: null,
  setSize: (size) => set({ size }),
  quantity: 1,
  setQuantity: (quantity) => set({ quantity }),
}));
