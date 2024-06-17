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
  general_rating: number | null;
  id: string;
  name: string;
  number_of_images: number | null;
  price: number | null;
  sizes: string[] | null;
  stock: number | null;
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
  id: string;
  userId: string;
  productId: string;
  color?: string;
  size?: string;
  quantity: number;
  orderDate?: Date;
  status: OrderStatus;
}

// Type for comments table
export interface Comment {
  created_at: string | null;
  description: string | null;
  id: string;
  product_id: string;
  user_id: string | null;
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
  created_at: string | null;
  id: string;
  object_id: string | null;
  product_id: string | null;
}
