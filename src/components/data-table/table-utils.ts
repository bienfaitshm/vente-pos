import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table,
  TableState,
  OnChangeFn,
  VisibilityState,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  TableOptions,
} from "@tanstack/react-table";
import React from "react";

type TTableState = Partial<TableState> & {
  state: any;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
};

export function useDataStateTable(): TTableState {
  //
  const [columnVisibility, onColumnVisibilityChange] = React.useState<
    VisibilityState
  >({});
  const [rowSelection, onRowSelectionChange] = React.useState<
    RowSelectionState
  >({});
  const [sorting, onSortingChange] = React.useState<SortingState>([]);
  const [columnFilters, onColumnFiltersChange] = React.useState<
    ColumnFiltersState
  >([]);

  return {
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onColumnFiltersChange,
    onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
  };
}
export function useDataTable<T>({
  columns = [],
  data = [],
}: Partial<TableOptions<T>>): Table<T> {
  const tableState = useDataStateTable();
  return useReactTable({
    data,
    columns,
    enableRowSelection: true,
    ...tableState,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
}
