import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { TypographySmall } from "@/components/ui/typography";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/formater";

export type ActivityColumnDefType = {
  orderId: string;
  sellerId: string | null;
  totalAmount: number;
  createdAt: Date;
  totalCommission: number;
  productsCount: number;
  quantitySum: number;
  totalPrice: number;
};

export function getActivitiesColumns(): ColumnDef<ActivityColumnDefType>[] {
  return [
    {
      accessorKey: "orderId",
      enableHiding: false,
      enableResizing: true,
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Facture" />
      ),
      cell: ({ row }): React.ReactNode => {
        return <TypographySmall>{row.original.orderId}</TypographySmall>;
      },
    },

    {
      accessorKey: "totalAmount",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Montant total" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <TypographySmall>
            {formatCurrency(row.original.totalAmount)}
          </TypographySmall>
        );
      },
    },
    {
      accessorKey: "totalCommission",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Commission" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <TypographySmall>
            {formatCurrency(row.original.totalCommission)}
          </TypographySmall>
        );
      },
    },
    {
      accessorKey: "productsCount",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="N. produit vendu" />
      ),
      cell: ({ row }): React.ReactNode => {
        return <TypographySmall>{row.original.productsCount}</TypographySmall>;
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
