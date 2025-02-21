import { useDataTable } from "@/components/data-table/table-utils";
import type { TableOptions } from "@tanstack/react-table";
import type { ChangeEvent } from "react";

export function useHookTable<ColumnType extends Record<string, unknown>>({
  searchKey,
  ...params
}: Partial<TableOptions<ColumnType>> & { searchKey: keyof ColumnType }) {
  const table = useDataTable<ColumnType>(params);
  const value =
    (table.getColumn(searchKey as string)?.getFilterValue() as string) ?? "";
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };
  return {
    table,
    searchField: {
      value,
      onChange: onChangeValue,
    },
  };
}
