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
import { useHookTable } from "../core/hooks";
import { TableRowMenu } from "../types";

/**
 * Props for the DataTablePointOfSale component.
 */
interface DataTablePointOfSaleProps {
  /** The data to be displayed in the table. */
  data?: ColumnPointOfSaleType[];

  /** Optional ReactNode to render as the main header. */
  mainHeader?: ReactNode;

  /** Optional ReactNode to render as the right-aligned header. */
  rightHeader?: ReactNode;

  /** Context menu options for table rows. */
  menus?: TableRowMenu<ColumnPointOfSaleType>[];
}

/**
 * DataTablePointOfSale is a reusable table component designed for displaying
 * point-of-sale data with features like search, pagination, and row selection.
 *
 * @param {DataTablePointOfSaleProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DataTablePointOfSale component.
 */
const DataTablePointOfSale: FunctionComponent<DataTablePointOfSaleProps> = ({
  data = [],
  mainHeader,
  rightHeader,
  menus,
}) => {
  // Memoize the columns to avoid unnecessary recalculations.
  const columns = useMemo(() => getPointOfSaleColumns(menus), [menus]);

  // Hook to manage table state, including search and row selection.
  const { searchField, table } = useHookTable<ColumnPointOfSaleType>({
    data,
    columns,
    enableRowSelection: true,
    searchKey: "name",
  });

  return (
    <div className="h-full w-full">
      {/* Header Section */}
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          {/* Left Header: Search Input and Main Header */}
          <div className="flex gap-2">
            <Input
              placeholder="Nom..."
              className="h-8 w-[150px] lg:w-[250px]"
              {...searchField}
            />
            {mainHeader}
          </div>

          {/* Right Header: Toolbar and Additional Header */}
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table} />
            {rightHeader}
          </div>
        </div>
      </div>

      <Separator />

      {/* Table Section */}
      <ScrollArea className="h-[calc(100%-8rem)]">
        <DataTable table={table} columns={columns} />
      </ScrollArea>

      <Separator />

      {/* Pagination Section */}
      <div className="max-w-5xl mx-auto my-2 h-8">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export { DataTablePointOfSale };
