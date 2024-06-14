import { TableCell, TableRow } from "../ui/table";

export default function CheckoutItemRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <img
            src="/product.webp"
            alt="Product Image"
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
          <div>
            <h4 className="font-medium">Cozy Blanket</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Warm and Soft for Chilly Nights
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>2</TableCell>
      <TableCell>$59.98</TableCell>
    </TableRow>
  );
}
