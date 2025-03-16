import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { MoreDropMenu } from "@/components/more-drop-menu";
import { makeMenus } from "../core/utils";

import type { ColumnDef } from "@tanstack/react-table";
import type { TableRowMenu } from "../types";
import { TypographyP } from "@/components/ui/typography";

/**
 * Type definition for a Saler column.
 * Represents the structure of a row in the Salers table.
 */
export type SalerColumnDefType = {
  id: string; // Unique identifier for the saler
  name: string; // Full name of the saler
  username: string; // Username of the saler
  email: string; // Email address of the saler
  image: string; // URL or path to the saler's profile image
};

/**
 * Generates column definitions for the Salers table.
 *
 * @param menus - An array of menu items for the row actions dropdown.
 * @returns An array of column definitions for the Salers table.
 */
export function getSalerColumns(
  menus: TableRowMenu<SalerColumnDefType>[] = []
): ColumnDef<SalerColumnDefType>[] {
  return [
    {
      accessorKey: "image",
      enableHiding: false,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile" />
      ),
      cell: (): React.ReactNode => {
        return (
          <div className="flex space-x-2">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarFallback className="rounded-none">IM</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      enableHiding: false,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
      cell: ({ row }): React.ReactNode => (
        <TypographyP>{row.original.name}</TypographyP>
      ),
    },
    {
      accessorKey: "username",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Username" />
      ),
      cell: ({ row }): React.ReactNode => (
        <TypographyP>{row.original.name}</TypographyP>
      ),
    },
    {
      accessorKey: "email",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }): React.ReactNode => (
        <TypographyP>{row.original.email}</TypographyP>
      ),
    },
    {
      id: "actions",
      /**
       * Renders the actions dropdown menu for each row.
       *
       * @param row - The current row data.
       * @returns A dropdown menu with actions for the row.
       */
      cell({ row }) {
        return <MoreDropMenu menus={makeMenus(row, menus)} />;
      },
    },
  ];
}
