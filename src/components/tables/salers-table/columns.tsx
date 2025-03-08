import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { EditDeleteCellAction } from "../actions/table-actions";

import { ColumnParamsWithAction, ColumnSalerType } from "../columns";

export type SalerColumnDefType = {
  id: number;
  name: string;
  username: number;
  email: number;
  image: string;
};

export function getSalerColumns(
  params?: ColumnParamsWithAction<ColumnSalerType>
): ColumnDef<ColumnSalerType>[] {
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
      accessorKey: "image",
      enableHiding: false,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile" />
      ),
      cell: ({}): React.ReactNode => {
        return (
          <div className="flex space-x-2">
            <Avatar className=" h-20 w-20 rounded-md">
              <AvatarFallback>IM</AvatarFallback>
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
        return <EditDeleteCellAction row={row} {...params?.actions} />;
      },
    },
  ];
}
