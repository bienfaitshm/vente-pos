"use client";

import { useMemo, type FunctionComponent, type ReactNode } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { StockHistoryColumnDefType, getStockHistoryColumns } from "./columns";
import { useHookTable } from "../core/hooks";

/**
 * Props for the DataTableStockHistory component.
 */
interface DataTableStockHistoryProps {
  /**
   * The data to be displayed in the stock history table.
   * Defaults to an empty array if not provided.
   */
  data?: StockHistoryColumnDefType[];

  /**
   * Optional ReactNode to render as the main header of the table.
   */
  mainHeader?: ReactNode;

  /**
   * Optional ReactNode to render as the right-aligned header of the table.
   */
  rightHeader?: ReactNode;
}

/**
 * DataTableStockHistory is a reusable component for displaying stock history data
 * in a paginated and searchable table format.
 *
 * @param {DataTableStockHistoryProps} props - The props for the component.
 * @returns {JSX.Element} The rendered stock history table component.
 */
const DataTableStockHistory: FunctionComponent<DataTableStockHistoryProps> = ({
  data = [],
  mainHeader,
  rightHeader,
}) => {
  // Memoize the column definitions to avoid unnecessary re-renders.
  const columns = useMemo(() => getStockHistoryColumns(), []);

  // Initialize the table hook with data, columns, and additional configurations.
  const { table } = useHookTable<StockHistoryColumnDefType>({
    data,
    columns,
    enableRowSelection: true,
    searchKey: "sellerName",
  });

  return (
    <div className="h-full w-full">
      {/* Header Section */}
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          {/* Left-aligned header content */}
          <div className="flex gap-2">{mainHeader}</div>

          {/* Right-aligned header content */}
          <div className="flex items-center gap-2">
            <DataTableToolbar table={table} />
            {rightHeader}
          </div>
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Data Table Section */}
      <div className="max-w-5xl m-auto my-3">
        <DataTable table={table} columns={columns} />
      </div>

      {/* Separator */}
      <Separator />

      {/* Pagination Section */}
      <div className="max-w-5xl mx-auto my-2 h-8">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export { DataTableStockHistory };
