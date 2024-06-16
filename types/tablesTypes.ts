// Type for auth.users table
export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

// Type for products table
export interface Product {
  id: string;
  name: string;
  description?: string;
  colors?: string;
  sizes?: string;
  stock: number;
  generalRating?: number;
  sellerId: string;
  numberOfImages?: number;
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
  id: string;
  description: string;
  createdAt?: Date;
  userId: string;
  productId: string;
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
  id: string;
  objectId: string;
  createdAt?: Date;
  productId: string;
}
