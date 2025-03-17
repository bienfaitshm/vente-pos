"use client";

import * as React from "react";
import { MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ProductItemProps {
  onDelete?: () => void;
  onEdit?: () => void;
  quantity: number | string;
  amount: number | string;
  productName: string;
}
export const ProductItem: React.FC<ProductItemProps> = ({
  onDelete,
  onEdit,
  amount,
  productName,
  quantity,
}) => {
  return (
    <div className="flex w-full flex-row items-start justify-between rounded-md border px-4 py-3">
      <div className="text-sm font-medium leading-none ">
        <div className="grid grid-cols-3 gap-5 truncate">
          <div className="w-16">
            <p className="text-xs text-muted-foreground">Produit</p>
            <p className="font-medium">{productName}</p>
          </div>
          <div className="w-14">
            <p className="text-xs text-muted-foreground">Quantite</p>
            <p className="font-medium">{quantity}</p>
          </div>
          <div className="w-14">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-medium">{amount}</p>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={onEdit}>
              Modifier{" "}
              <DropdownMenuShortcut>
                <Pencil className="w-4 h-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onSelect={onDelete}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
