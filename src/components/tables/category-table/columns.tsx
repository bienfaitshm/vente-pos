import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { TypographyP } from "@/components/ui/typography";
import { MoreDropMenu } from "@/components/more-drop-menu";
import { makeMenus } from "../core/utils";
import { SalerColumnDefType } from "../salers-table/columns";
import type { TableRowMenu } from "../types";

/**
 * Represents the structure of a category row in the table.
 */
export type ColumnCategoryType = {
  id: number; // Unique identifier for the category
  name: string; // Name of the category
  description?: string | null; // Optional description of the category
};

/**
 * Generates the column definitions for the category table.
 *
 * @param menus - An array of menu items to be displayed in the actions column.
 *                These menus are dynamically generated based on the row data.
 * @returns An array of column definitions for the category table.
 */
export function getCategoryColumns(
  menus: TableRowMenu<SalerColumnDefType>[] = []
): ColumnDef<ColumnCategoryType>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <TypographyP>{row.original.id}</TypographyP>,
      enableSorting: false, // Disables sorting for the ID column
      enableHiding: false, // Prevents the ID column from being hidden
    },
    {
      accessorKey: "name",
      enableHiding: false, // Prevents the Name column from being hidden
      enableResizing: true, // Allows resizing of the Name column
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      cell: ({ row }): React.ReactNode => (
        <TypographyP>{row.original.name}</TypographyP>
      ),
    },
    {
      accessorKey: "description",
      enableHiding: true, // Allows the Description column to be hidden
      enableResizing: false, // Disables resizing for the Description column
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }): React.ReactNode => (
        <TypographyP>{row.original.description}</TypographyP>
      ),
    },
    {
      id: "actions",
      cell({ row }) {
        // Renders a dropdown menu with actions for the current row
        return <MoreDropMenu menus={makeMenus(row, menus)} />;
      },
    },
  ];
}
