import { create } from "zustand";

type ImageStore = {
  image: string;
  setImage: (image: string) => void;
};

export const useImagetore = create<ImageStore>((set) => ({
  image:
    "https://cdn.pixabay.com/photo/2023/10/03/10/49/anonymous-8291223_1280.png",
  setImage: (image) => set({ image }),
}));
