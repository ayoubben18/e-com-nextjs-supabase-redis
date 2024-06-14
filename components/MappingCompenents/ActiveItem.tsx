import { TableCell, TableRow } from "../ui/table";

export default function ActiveItem() {
  return (
    <TableRow>
      <TableCell>Acme Prism Tee</TableCell>
      <TableCell>2023-04-15</TableCell>
      <TableCell>$99.99</TableCell>
      <TableCell>
        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Active
        </div>
      </TableCell>
    </TableRow>
  );
}
