import { create } from "zustand";
import { z } from "zod";
import cashSchema from "@/schema/cashSchema";

type StoreState = {
  credentials: z.infer<typeof cashSchema>;
  setCredentials: (credentials: StoreState["credentials"]) => void;
  reset: () => void;
};

const useCashStore = create<StoreState>((set) => ({
  credentials: {
    phoneNumber: "",
    address: "",
  },
  setCredentials: (credentials) => set({ credentials }),
  reset: () => set({ credentials: { phoneNumber: "", address: "" } }),
}));

export default useCashStore;
