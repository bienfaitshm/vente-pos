import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  EditDeleteCellAction,
  IEditDeleteActions,
} from "../actions/table-actions";
import { formatCurrency } from "@/lib/formater";

export type ColumnCategoryType = {
  id: number;
  name: string;
};

export type ColumnProductType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string | number;
};

export type ColumnPointOfSaleType = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  statut: "OPEN" | "CLOSE" | "RENOVATION";
  description?: string | null;
};

export type ColumnSalerType = {
  id: number;
  name: string;
  username: number;
  email: number;
  image: string;
  isAdmin: boolean;
};

type ColumnParamsWithAction<T> = { actions?: IEditDeleteActions<T> };

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

/**
 *
 * @param params
 * @returns
 */
export function getCategoryColumn(
  params?: ColumnParamsWithAction<ColumnCategoryType>
): ColumnDef<ColumnCategoryType>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="max-w-10 w-5 truncate">{row.getValue("id")}</div>
      ),
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
        // const label = labels.find((label) => label.value === row.original.label)

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-48 truncate font-medium">
              {row.getValue("name")}
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

/**
 *
 * @param params
 * @returns
 */
export function getProductColumns(
  params?: ColumnParamsWithAction<ColumnProductType>
): ColumnDef<ColumnProductType>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="max-w-10 w-5 truncate">{row.getValue("id")}</div>
      ),
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
        // const label = labels.find((label) => label.value === row.original.label)

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-48 truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="max-w-28"
          column={column}
          title="Prix (CDF)"
        />
      ),
      cell: ({ row }): React.ReactNode => {
        const price: number = row.getValue("price");
        return (
          <div className="max-w-28">
            <span className="  truncate font-medium">
              {formatCurrency(price, "EUR", "de-DE")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      enableHiding: true,
      enableResizing: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="En Stock" />
      ),
      cell: ({ row }): React.ReactNode => {
        // const label = labels.find((label) => label.value === row.original.label)

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
            <span className="max-w-48 truncate font-medium">
              {row.getValue("quantity")}
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

/**
 *
 * @param params
 * @returns
 */
export function getPointOfSaleColumns(
  params?: ColumnParamsWithAction<ColumnPointOfSaleType>
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
        return <EditDeleteCellAction row={row} {...params?.actions} />;
      },
    },
  ];
}
