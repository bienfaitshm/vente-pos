"use client";
import { useMemo, type FunctionComponent, type ReactNode } from "react";
import type { ColumnCategoryType } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Separator } from "@/components/ui/separator";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Input } from "@/components/ui/input";
import { getCategoryColumns } from "./columns";
import { useHookTable } from "../core/hooks";
import { TableRowMenu } from "../types";

interface DataTableCategoryProps {
  data?: ColumnCategoryType[];
  mainHeader?: ReactNode;
  rightHeader?: ReactNode;
  menus?: TableRowMenu<ColumnCategoryType>[];
}
/**
 * A functional component that renders a data table for categories with search, pagination, and customizable headers.
 *
 * @component
 * @param {DataTableCategoryProps} props - The props for the `DataTableCategory` component.
 * @param {Array} [props.data=[]] - The data to be displayed in the table.
 * @param {ReactNode} props.mainHeader - A React node to be displayed as the main header on the left side.
 * @param {ReactNode} props.rightHeader - A React node to be displayed as the header on the right side.
 * @param {MenuType[]} props.menus - An array of menu items used to generate table columns.
 *
 * @returns {JSX.Element} The rendered `DataTableCategory` component.
 *
 * @remarks
 * - This component uses the `useHookTable` hook to manage table state, including search and row selection.
 * - The `getCategoryColumns` function is used to dynamically generate table columns based on the provided `menus`.
 * - Includes a search input field, a toolbar, and pagination controls for enhanced usability.
 *
 * @example
 * ```tsx
 * <DataTableCategory
 *   data={categoryData}
 *   mainHeader={<h1>Categories</h1>}
 *   rightHeader={<Button>Add Category</Button>}
 *   menus={menuItems}
 * />
 * ```
 */
const DataTableCategory: FunctionComponent<DataTableCategoryProps> = ({
  data = [],
  mainHeader,
  rightHeader,
  menus,
}) => {
  const columns = useMemo(() => getCategoryColumns(menus), [menus]);

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
