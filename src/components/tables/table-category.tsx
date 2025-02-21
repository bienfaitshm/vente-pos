"use client";
import { useMemo, type FunctionComponent, type ReactNode } from "react";
import type { ColumnCategoryType } from "./columns/frais-columns";
import { DataTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { getCategoryColumn } from "./columns/frais-columns";
import { useHookTable } from "./core/hooks";

const DataTableCategory: FunctionComponent<{
  data?: ColumnCategoryType[];
  mainHeader?: ReactNode;
  rightHeader?: ReactNode;
}> = ({ data = [], mainHeader, rightHeader }) => {
  const columns = useMemo(() => getCategoryColumn(), []);

  const { searchField, table } = useHookTable<ColumnCategoryType>({
    data,
    columns,
    enableRowSelection: true,
    searchKey: "name",
  });

  return (
    <div className="h-full w-full">
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Nom..."
              className="h-8 w-[150px] lg:w-[250px]"
              {...searchField}
            />
            {mainHeader}
          </div>
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table}></DataTableToolbar>
            {rightHeader}
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
