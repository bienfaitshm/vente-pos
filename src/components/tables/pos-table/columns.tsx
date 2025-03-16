import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import type { TableRowMenu } from "../types";
import { MoreDropMenu } from "@/components/more-drop-menu";
import { makeMenus } from "../core/utils";

export type ColumnPointOfSaleType = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  statut: "OPEN" | "CLOSE" | "RENOVATION";
  description?: string | null;
};

/**
 * Generates the column definitions for the Point of Sale (POS) table.
 *
 * This function returns an array of column definitions used to configure the
 * behavior and rendering of a data table for displaying Point of Sale (POS) information.
 * Each column is defined with properties such as `accessorKey`, `header`, `cell`, and
 * additional configuration options like sorting, resizing, and hiding.
 *
 * @param menus - An optional array of table row menu configurations. These menus
 *                are used to generate contextual actions for each row in the table.
 *
 * @returns An array of column definitions (`ColumnDef<ColumnPointOfSaleType>[]`) for the POS table.
 *
 * ### Column Definitions:
 * - **ID**: Displays the unique identifier of the POS entry. Sorting and hiding are disabled.
 * - **Nom**: Displays the name of the POS entry. Supports resizing and hiding.
 * - **Statut actuel**: Displays the current status of the POS entry as a numeric value.
 *                      Supports resizing and hiding.
 * - **Telephone**: Displays the phone number associated with the POS entry.
 *                  Supports resizing and hiding.
 * - **Adresse**: Displays the address of the POS entry. Supports resizing and hiding.
 * - **Description**: Displays a description of the POS entry. Supports resizing and hiding.
 * - **Actions**: Provides a dropdown menu with contextual actions for the row.
 *
 * ### Example Usage:
 * ```tsx
 * const columns = getPointOfSaleColumns([
 *   { label: "Edit", onClick: () => console.log("Edit clicked") },
 *   { label: "Delete", onClick: () => console.log("Delete clicked") },
 * ]);
 * ```
 */
export function getPointOfSaleColumns(
  menus: TableRowMenu<ColumnPointOfSaleType>[] = []
): ColumnDef<ColumnPointOfSaleType>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <span>{row.getValue("id")}</span>,
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
      cell: ({ row }): React.ReactNode => {
        return (
          <div>
            <span className="max-w-48 truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "statut",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Statut actuel" />
      ),
      cell: ({ row }): React.ReactNode => {
        const statut: number = row.getValue("statut");
        return (
          <div>
            <span className="  truncate font-medium">{statut}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Telephone" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <div>
            <span className="  truncate font-medium">
              {row.getValue("phoneNumber")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Adresse" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <div className="max-w-48 truncate font-medium">
            <span className="  truncate font-medium">
              {row.getValue("address")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <div className="max-w-48 truncate font-medium">
            <span>{row.getValue("description")}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell({ row }) {
        return <MoreDropMenu menus={makeMenus(row, menus)} />;
      },
    },
  ];
}
