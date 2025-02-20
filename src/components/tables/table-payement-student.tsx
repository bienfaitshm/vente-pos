"use client";
import type { FunctionComponent, ChangeEvent, ReactNode } from "react";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/table-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";
import { columnStudentPayementfrais as columns } from "./columns/frais-columns";
import type { StudentPayementFraisType } from "./columns/frais-columns";

const StudentPayementTablel: FunctionComponent<{
  data?: StudentPayementFraisType[];
  header?: ReactNode;
}> = ({ data = [], header }) => {
  const table = useDataTable<StudentPayementFraisType>({ data, columns });
  const searchValue =
    (table.getColumn("fullName")?.getFilterValue() as string) ?? "";
  const handlerChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("fullName")?.setFilterValue(event.target.value);
  };
  return (
    <div className="h-full w-full">
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Nom de l'eleve"
              value={searchValue}
              onChange={handlerChangeSearchValue}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            {header}
          </div>
          <div className="flex gap-4">
            <DataTableToolbar table={table} />
          </div>
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100%-8rem)]">
        <DataTable table={table} columns={columns} />
      </ScrollArea>
      <Separator />
      <div className="max-w-5xl mx-auto my-2 h-8">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export { StudentPayementTablel };
