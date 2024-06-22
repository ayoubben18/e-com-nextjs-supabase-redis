export type CheckoutItemType = {
  id: string;
  image: string | null;
  price: number;
  quantity: number;
  color: string | null;
  size: string | null;
  status: string;
  user_id: string;
  order_date: string;
  product_id: string;
  delivery_id: string | null;
  products: {
    name: string;
  };
};
