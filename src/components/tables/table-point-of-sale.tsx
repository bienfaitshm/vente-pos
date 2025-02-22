"use client";
import { useMemo, type FunctionComponent, type ReactNode } from "react";
import type { ColumnPointOfSaleType } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { getPointOfSaleColumns } from "./columns";
import { useHookTable } from "./core/hooks";
import { IEditDeleteActions } from "./actions/table-actions";

interface DataTablePointOfSaleProps {
  data?: ColumnPointOfSaleType[];
  mainHeader?: ReactNode;
  rightHeader?: ReactNode;
  cellActions?: IEditDeleteActions<ColumnPointOfSaleType>;
}
const DataTablePointOfSale: FunctionComponent<DataTablePointOfSaleProps> = ({
  data = [],
  mainHeader,
  rightHeader,
  cellActions: actions,
}) => {
  const columns = useMemo(() => getPointOfSaleColumns({ actions }), [actions]);

  const { searchField, table } = useHookTable<ColumnPointOfSaleType>({
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

export { DataTablePointOfSale };
