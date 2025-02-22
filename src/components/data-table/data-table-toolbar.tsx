"use client";
import { RotateCcw } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { type OptionType } from "./data-table-faceted-filter";
import type { PropsWithChildren } from "react";

// import {
//   priorities,
//   statuses,
// } from "@/components/data-table/data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export type Optiontype = OptionType;
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
}: PropsWithChildren<DataTableToolbarProps<TData>>): React.JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {children}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
