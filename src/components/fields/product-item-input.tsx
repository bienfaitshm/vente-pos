import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  name: string;
  price: number;
  quantity?: number;
  category?: string | number;
  id?: string | number | undefined;
}

interface ProductItem {
  amount: number;
  quantity: number;
  product: Product;
}

interface ProductItemInputRef {
  addItem(): void;
}

interface ProductItemInputProps {
  value?: ProductItem[];
  onChange?(value: ProductItem[]): void;
  products?: Product[];
  ref: React.Ref<ProductItemInputRef>;
}

export const ProductItemInput: React.FC<ProductItemInputProps> = ({
  value = [],
  products = [],
  onChange,
  ref,
}) => {
  const selectedItems = React.useMemo(
    () => value.map((i) => i.product.id),
    [value]
  );
  const productSelectDialogRef = useProductSelectDialog();
  React.useImperativeHandle(
    ref,
    () => ({
      addItem() {
        productSelectDialogRef.current?.openDialog();
      },
    }),
    []
  );
  return (
    <div>
      <ProductSelectDialog
        selectedItems={selectedItems}
        products={products}
        ref={productSelectDialogRef}
      />
      <h1>Input item</h1>
    </div>
  );
};

interface ProductSelectDialogRef {
  openDialog(): void;
  closeDialog(): void;
}
interface ProductSelectDialogProps {
  products: Product[];
  ref?: React.Ref<ProductSelectDialogRef>;
  selectedItems?: (number | string | undefined)[];
}
export const ProductSelectDialog: React.FC<ProductSelectDialogProps> = ({
  ref,
  products,
  selectedItems = [],
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  React.useImperativeHandle(
    ref,
    () => ({
      openDialog() {
        setOpen(true);
      },
      closeDialog() {
        setOpen(false);
      },
    }),
    []
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selection du produit</DialogTitle>
          <DialogDescription>Ajouter le produit a vendre</DialogDescription>
        </DialogHeader>
        <div>
          <Command>
            <CommandInput placeholder="Recherche..." />
            <CommandList>
              <CommandEmpty>Aucun Resultat.</CommandEmpty>
              {products.map((product) => (
                <CommandItem className="capitalize" key={product.id}>
                  {product.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      isSelectedIn(product.id, selectedItems)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function useProductSelectDialog() {
  return React.useRef<ProductSelectDialogRef>(null);
}

export function useProductItemInput() {
  return React.useRef<ProductItemInputRef>(null);
}

function isSelectedIn(
  id?: number | string,
  items: (number | string | undefined)[] = []
): boolean {
  if (!id) return false;
  return items.includes(id);
}
