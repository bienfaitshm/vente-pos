"use client";

import { useMemo, type FunctionComponent, type ReactNode } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import {
  getMonthCommisionColumns,
  type ColumnMonthCommissionType,
} from "./columns";
import { useHookTable } from "../core/hooks";

/**
 * Props for the DataTableMonthlyCommission component.
 */
interface DataTableMonthlyCommissionProps {
  /**
   * The data to be displayed in the table.
   */
  data?: ColumnMonthCommissionType[];

  /**
   * Optional ReactNode to render as the main header.
   */
  mainHeader?: ReactNode;

  /**
   * Optional ReactNode to render as the right-aligned header.
   */
  rightHeader?: ReactNode;

  /**
   * Optional array of row menu configurations.
   */
}

/**
 * DataTableMonthlyCommission Component
 *
 * A performant and reusable table component for displaying product data.
 * It includes search functionality, pagination, and customizable headers.
 *
 * @param {DataTableMonthlyCommissionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DataTableMonthlyCommission component.
 */
const DataTableMonthlyCommission: FunctionComponent<
  DataTableMonthlyCommissionProps
> = ({ data = [], mainHeader, rightHeader }) => {
  // Memoize columns to avoid unnecessary re-renders
  const columns = useMemo(getMonthCommisionColumns, []);

  // Hook to manage table state, search, and row selection
  const { table } = useHookTable<ColumnMonthCommissionType>({
    data,
    columns,
    enableRowSelection: true,
    searchKey: "month",
  });

  return (
    <div className="h-full w-full">
      {/* Header Section */}
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          {/* Left Header: Search Input and Main Header */}
          <div className="flex gap-2">{mainHeader}</div>

          {/* Right Header: Toolbar and Custom Header */}
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table} />
            {rightHeader}
          </div>
        </div>
      </div>

      <Separator />

      {/* Table Content Section */}
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

export { DataTableMonthlyCommission };
