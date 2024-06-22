// Type for auth.users table
export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

// Type for products table
export interface Product {
  colors: string[] | null;
  description: string | null;
  general_rating: number;
  id: string;
  name: string;
  number_of_images: number | null;
  price: number;
  sizes: string[] | null;
  stock: number;
}

// Type for cart table
export interface Cart {
  id: string;
  number?: string;
  expirationDate?: boolean;
  userId: string;
  addedAt?: Date;
}

// Type for orders table
export type OrderStatus = "notplaced" | "placed" | "shipping" | "received";

export interface Order {
  color: string;
  delivery_id: string | null;
  id: string;
  order_date: string;
  price: number | null;
  product_id: string;
  quantity: number;
  size: string;
  status: string;
  user_id: string;
}

// Type for comments table
export interface Comment {
  created_at: string;
  description: string;
  id: string;
  product_id: string;
  user_id: string;
}

// Type for ratings table
export interface Rating {
  id: string;
  createdAt?: Date;
  userId: string;
  productId: string;
  description?: string;
  rate: number;
}

// Type for users_images table
export interface UserImage {
  id: string;
  objectId: string;
  createdAt?: Date;
  userId: string;
}

// Type for products_images table
export interface ProductImage {
  created_at: string;
  id: string;
  object_id: string;
  product_id: string;
}

export interface Delivery {
  check_out: string | null;
  created_at: string;
  delivered: string | null;
  id: string;
  shipping: string | null;
  state: string;
  user_id: string;
  total_price: number;
}
