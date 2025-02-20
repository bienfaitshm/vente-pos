import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { TableFraisRowActions } from "../actions/table-actions";

export type ColumnCategoryType = {
  id: number | string;
  name: string;
};

export type StudentPayementFraisType = {
  id: number | string;
  fullName: string;
  status: "TERMINE" | "ENCOURS";
  motant: number;
};

export const columnFraisPayment: ColumnDef<ColumnCategoryType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="max-w-12 truncate">{row.getValue("id")}</div>
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
];

export const columnStudentPayementfrais: ColumnDef<StudentPayementFraisType>[] =
  [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <div className="max-w-10 truncate">{row.getValue("id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Nom , Postnom et Prenom"
        />
      ),
      cell: ({ row }) => (
        <div className="max-w-32 truncate font-semibold">
          {row.getValue("fullName")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "motant",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Montant" />
      ),
      cell: ({ row }) => (
        <div className="max-w-24 truncate">{row.getValue("motant")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status: StudentPayementFraisType["status"] =
          row.getValue("status");
        return (
          <Badge variant={status === "TERMINE" ? "default" : "outline"}>
            {status}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];
