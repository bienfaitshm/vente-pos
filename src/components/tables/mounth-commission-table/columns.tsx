import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatCurrency } from "@/lib/formater";
import { ColumnDef } from "@tanstack/react-table";
import { TypographyP } from "@/components/ui/typography";

export type ColumnMonthCommissionType = {
  year: number;
  month: number;
  totalCommission: number;
  totalSales: number;
  totalOrders: number;
};

export function getMonthCommisionColumns(): ColumnDef<ColumnMonthCommissionType>[] {
  return [
    {
      accessorKey: "month",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mois" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.month}</TypographyP>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "totalSales",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Vendu" />
      ),
      cell: ({ row }) => (
        <TypographyP>{formatCurrency(row.original.totalSales)}</TypographyP>
      ),
    },
    {
      accessorKey: "totalCommission",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="max-w-28"
          column={column}
          title="Commission gangée"
        />
      ),
      cell: ({ row }) => (
        <TypographyP>
          {formatCurrency(row.original.totalCommission)}
        </TypographyP>
      ),
    },
    {
      accessorKey: "totalOrders",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Produit vendus" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.totalOrders}</TypographyP>,
    },
  ];
}
