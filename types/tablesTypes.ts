import { Tables } from "./database.types";

export type Products = Tables<"products">;
export type Orders = Tables<"orders">;
export type Delivery = Tables<"delivery">;
export type Comments = Tables<"comments">;
export type ratings = Tables<"ratings">;
export type cart = Tables<"cart">;

export type ProductImages = Tables<"products_images">;
export type UsersImages = Tables<"users_images">;
