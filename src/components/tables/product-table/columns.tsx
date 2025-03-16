import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatCurrency } from "@/lib/formater";
import { ColumnDef } from "@tanstack/react-table";
import { TypographyP } from "@/components/ui/typography";
import { TableRowMenu } from "../types";
import { makeMenus } from "../core/utils";
import { MoreDropMenu } from "@/components/more-drop-menu";

/**
 * Represents the structure of a product column.
 */
export type ColumnProductType = {
  id: string;
  name: string;
  unitPrice: number;
  commission: number;
  quantity: number;
  categoryId: string;
  categoryName?: string | null;
  description?: string | null;
};

/**
 * Generates column definitions for the product table.
 *
 * @param menus - An array of row menu configurations for the product table.
 * @returns An array of column definitions for the product table.
 */
export function getProductColumns(
  menus: TableRowMenu<ColumnProductType>[] = []
): ColumnDef<ColumnProductType>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.id}</TypographyP>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.name}</TypographyP>,
    },
    {
      accessorKey: "unitPrice",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="max-w-28"
          column={column}
          title="Prix (CDF)"
        />
      ),
      cell: ({ row }) => (
        <TypographyP>{formatCurrency(row.original.unitPrice)}</TypographyP>
      ),
    },
    {
      accessorKey: "categoryName",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categorie" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.categoryName}</TypographyP>,
    },
    {
      accessorKey: "description",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.description}</TypographyP>,
    },
    {
      id: "actions",
      cell: ({ row }) => <MoreDropMenu menus={makeMenus(row, menus)} />,
    },
  ];
}
