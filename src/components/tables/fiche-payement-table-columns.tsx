import type { ColumnDef } from "@tanstack/react-table";
import { Suspense, type FunctionComponent } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { CircleCheckBig, Minus, LoaderCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FichePayementHoverInfo } from "@/components/items/fiche-payement-hover-info";
import type { FraiStatus, ID } from "@/lib/apis/types";
import { LoaderContent, LoaderSpiner } from "../feedbacks/loader";

export type DataFraisType = {
  id: ID;
  value: number | string;
  dataType: "NAME" | "FRAIS";
  status: FraiStatus;
};
export type FraisHeaderFichePayement = {
  id: number | string;
  name: string;
};

const RowFichePayement: FunctionComponent<DataFraisType> = (props) => {
  if (props.dataType === "NAME") {
    return (
      <div className="max-w-40 uppercase font-semibold text-xs truncate">
        {props.value}
      </div>
    );
  }
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger>
        <div className="max-w-40 truncate cursor-pointer">
          <Badge variant={props.status === "ENCOURS" ? "secondary" : "default"}>
            {props.status === "ENCOURS" ? (
              <LoaderCircle className="h-3 w-3 mr-2" />
            ) : (
              <CircleCheckBig className="h-3 w-3 mr-2" />
            )}
            {props.value}
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <Suspense fallback={
          <LoaderContent>
            <LoaderSpiner />
          </LoaderContent>
        }>

        <FichePayementHoverInfo payementId={props.id} />
        </Suspense>
      </HoverCardContent>
    </HoverCard>
  );
};

const RowEmptyFichePayement: FunctionComponent = () => (
  <div className="max-w-20 truncate">
    <Minus className="h-4 w-4" />
  </div>
);

export function getFichePayementColumns<T extends FraisHeaderFichePayement>(
  frais: T[],
): ColumnDef<T>[] {
  return frais.map((frai) => ({
    accessorKey: frai.id.toString(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={frai.name} />
    ),
    cell: ({ row }) => {
      const value: DataFraisType | undefined = row.getValue(frai.id.toString());
      if (!value) return <RowEmptyFichePayement />;
      return <RowFichePayement {...value} />;
    },
    enableSorting: false,
    enableHiding: false,
  }));
}
