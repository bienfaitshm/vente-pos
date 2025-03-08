"use client";
import { useMemo, type FunctionComponent, type ReactNode } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { SalerColumnDefType, getSalerColumns } from "./columns";
import { useHookTable } from "../core/hooks";
import { TableRowMenu } from "../types";

interface DataTableSalerProps {
  data?: SalerColumnDefType[];
  mainHeader?: ReactNode;
  rightHeader?: ReactNode;
  menus?: TableRowMenu<SalerColumnDefType>[];
}
const DataTableSaler: FunctionComponent<DataTableSalerProps> = ({
  data = [],
  mainHeader,
  rightHeader,
  menus,
}) => {
  const columns = useMemo(() => getSalerColumns(menus), [menus]);
  const { searchField, table } = useHookTable<SalerColumnDefType>({
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
      <div className="max-w-5xl m-auto my-3">
        <DataTable table={table} columns={columns} />
      </div>
      <Separator />
      <div className="max-w-5xl mx-auto my-2 h-8">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export { DataTableSaler };
