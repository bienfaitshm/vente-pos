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

type ColumnParamsWithAction<T> = { actions?: IEditDeleteActions<T> };

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
