export type CheckoutItemType = {
  id: string;
  image: string | null;
  price: number;
  quantity: number;
  color: string | null;
  size: string | null;
  products: {
    name: string;
  };
};
