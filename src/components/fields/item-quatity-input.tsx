"use client";
import { cn } from "@/lib/utils";
import { SelectProduct } from "@/server/db";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity?: number;
  category?: string | number;
}

interface Item {
  amount: number;
  quantity: number;
  product?: Product | null;
}

export const ItemQuantityInput: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "p-2 rounded-md border flex items-center justify-between relative",
        className
      )}
      {...props}
    ></div>
  );
};

export interface ButtonAddProductProps {
  onChange?(item: Item): void;
}

export const ButtonAddProduct: React.FC<ButtonAddProductProps> = ({
  onChange,
}) => {
  const handleAddProduct = React.useCallback(() => {
    onChange?.({
      amount: 0,
      quantity: 0,
      product: undefined,
    });
  }, [onChange]);

  return (
    <Button type="button" variant="link" onClick={handleAddProduct}>
      Ajouter un produit
      <PlusCircle />
    </Button>
  );
};

export interface ItemProductSelectProps {
  value: Product | null;
  onChange?(value: Product | null): void;
  products?: SelectProduct[];
}
export const ItemProductSelect: React.FC<ItemProductSelectProps> = ({
  value,
  onChange,
  products = [],
}) => {
  const handleSelect = React.useCallback(
    (currentValue: string) => {
      // 1. seleced items from the list
      const newValue = getById(products, currentValue);
      // 2. update the value
      onChange?.(value?.id?.toString() === currentValue ? null : newValue);
    },
    [products, onChange, value?.id]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between capitalize text-sm h-8"
        >
          {value ? value.name : "Selectionner un produit"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Recherche du client..." className="h-9" />
          <CommandList>
            <CommandEmpty>Aucun produit trouve</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  className="capitalize"
                  key={product.id}
                  value={product.id.toString()}
                  onSelect={handleSelect}
                >
                  {product.name.toLowerCase()}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id === product.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export function getById<T extends { id: number | string }>(
  items: T[],
  id?: number | string
): T | null {
  return items.find((item) => item.id.toString() === id?.toString()) ?? null;
}
