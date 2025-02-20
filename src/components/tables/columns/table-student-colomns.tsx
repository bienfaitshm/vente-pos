import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export type TableStudentColumn = {
  id: number | string;
  fullName: string;
  sexe: "M" | "F";
  dateNaissance: string;
};

export const tableStudentColumn: ColumnDef<TableStudentColumn>[] = [
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
      <DataTableColumnHeader column={column} title="Nom , Postnom et Prenom" />
    ),
    cell: ({ row }) => (
      <div className="max-w-56 truncate font-semibold">
        {row.getValue("fullName")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "sexe",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sexe" />
    ),
    cell: ({ row }) => {
      const sexe: TableStudentColumn["sexe"] = row.getValue("sexe");
      return (
        <Badge variant={sexe === "F" ? "default" : "outline"}>{sexe}</Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "dateNaissance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date de naissance" />
    ),
    cell: ({ row }) => (
      <div className="max-w-24 truncate">{row.getValue("dateNaissance")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
];
