"use client";
import type { FunctionComponent, ChangeEvent } from "react";
import { getFichePayementColumns } from "./fiche-payement-table-columns";
import type { DataFraisType } from "./fiche-payement-table-columns";
import { useDataTable } from "../data-table/table-utils";
import { Input } from "../ui/input";
import { DataTableToolbar } from "../data-table/data-table-toolbar";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { DataTable } from "../data-table/data-table";
import { DataTablePagination } from "../data-table/data-table-pagination";

type FraisPayementType = {
  headers: { id: number | string; name: string }[];
  data: { [key: string]: DataFraisType }[];
};

type FichePayementTableProps = {
  fraisPayement: FraisPayementType;
};

const FULLNAME_KEY = "FULLNAME";

const FichePayementTable: FunctionComponent<FichePayementTableProps> = ({
  fraisPayement,
}) => {
  const columns = getFichePayementColumns(fraisPayement.headers);
  const table = useDataTable<any>({ data: fraisPayement.data, columns });
  const searchValue =
    (table.getColumn(FULLNAME_KEY)?.getFilterValue() as string) ?? "";
  const handlerChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn(FULLNAME_KEY)?.setFilterValue(event.target.value);
  };
  return (
    <div className="h-full w-full">
      <div className="h-8 max-w-5xl m-auto my-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Nom de l'eleve"
              value={searchValue}
              onChange={handlerChangeSearchValue}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          </div>
          <DataTableToolbar table={table}></DataTableToolbar>
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

export { FichePayementTable };
