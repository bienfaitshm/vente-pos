import { Ellipsis } from "lucide-react";
import type { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WithRowParams<T, TData> = T & { row: Row<TData> };
export interface IEditDeleteActions<TData> {
  onDelete?(row: Row<TData>): void;
  onEdit?(row: Row<TData>): void;
}

export function EditDeleteCellAction<TData>({
  row,
  onDelete,
  onEdit,
}: WithRowParams<IEditDeleteActions<TData>, TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-6 w-6 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onEdit?.(row)}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete?.(row)}>
          Supprimer
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
