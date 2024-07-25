"use client";
import { CheckoutItemType } from "@/types/DtoTypes";
import CheckoutItemRow from "../MappingCompenents/CheckoutItemRow";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import useDeletionStore from "@/stores/deletionStore";
import useCartStore from "@/stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import { getCheckoutItems } from "@/db/service/orders-service";

interface Props {
  items: CheckoutItemType[];
}

export default function CheckoutItems({ items }: Props) {
  const { item } = useDeletionStore();
  const { item: cartItem } = useCartStore();
  const { data, isLoading } = useQuery({
    queryKey: ["checkout-items", item, cartItem],

    queryFn: async () => {
      //@ts-ignore
      const items = await getCheckoutItems();
      return items?.data;
    },
    initialData: items,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((item, i) => <CheckoutItemRow key={i} item={item} />)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
