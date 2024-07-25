import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserOrders } from "@/db/service/orders-service";
import ActiveItem from "../MappingCompenents/ActiveItem";
export default async function ActiveItemsCard() {
  // @ts-ignore
  const orders = await getUserOrders();
  if (!orders) {
    return null;
  }
  return (
    <div className="col-span-2 w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <span>History</span>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                {orders.data?.length}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data?.map((order, i) => (
                <ActiveItem key={i} delivery={order} i={i + 1} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
