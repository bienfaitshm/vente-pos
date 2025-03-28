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

/**
 * Props for the `DataTableSaler` component.
 */
interface DataTableSalerProps {
  /**
   * The data to be displayed in the table.
   * @default []
   */
  data?: SalerColumnDefType[];

  /**
   * Optional ReactNode to render as the main header.
   */
  mainHeader?: ReactNode;

  /**
   * Optional ReactNode to render as the right-aligned header.
   */
  rightHeader?: ReactNode;

  /**
   * Array of menu items for each row in the table.
   */
  menus?: TableRowMenu<SalerColumnDefType>[];
}

/**
 * `DataTableSaler` is a reusable table component for displaying saler data.
 * It includes search functionality, row selection, and pagination.
 *
 * @param {DataTableSalerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DataTableSaler component.
 */
const DataTableSaler: FunctionComponent<DataTableSalerProps> = ({
  data = [],
  mainHeader,
  rightHeader,
  menus,
}) => {
  // Memoize the columns to avoid unnecessary re-renders when menus change.
  const columns = useMemo(() => getSalerColumns(menus), [menus]);

  // Hook to manage table state, including search and row selection.
  const { searchField, table } = useHookTable<SalerColumnDefType>({
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
          {/* Right Header: Toolbar and Right Header */}
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table} />
            {rightHeader}
          </div>
        </div>
      </div>

      <Separator />

      {/* Table Section */}
      <div className="max-w-5xl m-auto my-3">
        <DataTable table={table} columns={columns} />
      </div>

      <Separator />

      {/* Pagination Section */}
      <div className="max-w-5xl mx-auto my-2 h-8">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export { DataTableSaler };
