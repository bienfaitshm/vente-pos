import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { MoreDropMenu } from "@/components/more-drop-menu";
import { makeMenus } from "../core/utils";

import type { ColumnDef } from "@tanstack/react-table";
import type { TableRowMenu } from "../types";

export type SalerColumnDefType = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
};

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
      cell: ({}): React.ReactNode => {
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
      cell: ({ row }): React.ReactNode => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-48 truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Username" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-48 truncate font-medium">
              {row.getValue("username")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      enableHiding: true,
      enableResizing: true,
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }): React.ReactNode => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-48 truncate font-medium">
              {row.getValue("email")}
            </span>
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
