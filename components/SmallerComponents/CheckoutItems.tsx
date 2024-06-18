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

interface Props {
  items: CheckoutItemType[];
}

export default function CheckoutItems({ items }: Props) {
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
            {items.map((item, i) => (
              <CheckoutItemRow key={i} item={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
