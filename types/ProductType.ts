import { ImageCache } from "./ImageCache";

export type ProductType = {
  images: ImageCache[];
  colors: string[] | null;
  description: string;
  embeddings: string | null;
  general_rating: number;
  id: string;
  name: string;
  number_of_images: number | null;
  price: number;
  rating_count: number;
  sizes: string[] | null;
  stock: number;
};
