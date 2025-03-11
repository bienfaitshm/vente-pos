import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import type { ColumnDef } from "@tanstack/react-table";
import { TypographySmall } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type StockHistoryColumnDefType = {
  id: string;
  action: "SUB" | "ADD";
  quantity: number;
  saler: string;
  pos: string;
  createdAt: Date;
};

export function getStockHistoryColumns(): ColumnDef<StockHistoryColumnDefType>[] {
  return [
    {
      accessorKey: "id",
      enableHiding: false,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }): React.ReactNode => {
        return <TypographySmall>{row.original.id}</TypographySmall>;
      },
    },
    {
      accessorKey: "quantity",
      enableHiding: false,
      enableResizing: true,
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantites" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <Badge
            className="rounded-full text-xs shadow-none"
            variant={row.original.action === "SUB" ? "destructive" : "default"}
          >
            <p className="text-xs">
              {row.original.action === "SUB" ? "-" : "+"}
              {row.original.quantity}
            </p>
          </Badge>
        );
      },
    },

    {
      accessorKey: "saler",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vendeur" />
      ),
      cell: ({ row }): React.ReactNode => {
        return <TypographySmall>{row.original.saler}</TypographySmall>;
      },
    },
    {
      accessorKey: "pos",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Point de vente" />
      ),
      cell: ({ row }): React.ReactNode => {
        return <TypographySmall>{row.original.pos}</TypographySmall>;
      },
    },
    {
      accessorKey: "createdAt",
      enableHiding: false,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <TypographySmall>
            {format(row.original.createdAt, "dd/MM/yyyy - hh:mm:ss")}
          </TypographySmall>
        );
      },
    },
  ];
}
