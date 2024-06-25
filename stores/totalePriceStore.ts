import { create } from "zustand";

type TotalPriceStore = {
  totalPrice: number;
  setPrice: (amount: number) => void;
  reset: () => void;
};

const useTotalPriceStore = create<TotalPriceStore>((set) => ({
  totalPrice: 0,
  setPrice: (amount) => set((state) => ({ totalPrice: amount })),

  reset: () => set({ totalPrice: 0 }),
}));

export default useTotalPriceStore;
