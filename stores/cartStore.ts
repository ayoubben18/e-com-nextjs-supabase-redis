import { CheckoutItemType } from "@/types/DtoTypes";
import { create } from "zustand";

type CartStore = {
  item: CheckoutItemType | null;
  addItem: (item: CheckoutItemType) => void;
};

const useCartStore = create<CartStore>((set) => ({
  item: null,
  addItem: (item) => set({ item }),
}));

export default useCartStore;
