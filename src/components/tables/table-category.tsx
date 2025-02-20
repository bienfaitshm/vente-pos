"use client";
import type { ChangeEvent, FunctionComponent, ReactNode } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/table-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { columnFraisPayment as columns } from "./columns/frais-columns";
import type { ColumnCategoryType } from "./columns/frais-columns";

const DataTableCategory: FunctionComponent<{
  data?: ColumnCategoryType[];
  header?: ReactNode;
}> = ({ data = [], header }) => {
  const table = useDataTable<ColumnCategoryType>({ data, columns });
  const searchValue =
    (table.getColumn("name")?.getFilterValue() as string) ?? "";
  const handlerChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };
  return (
    <div className="h-full w-full">
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Nom..."
              value={searchValue}
              onChange={handlerChangeSearchValue}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table}></DataTableToolbar>
            {header}
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

export { DataTableCategory };
