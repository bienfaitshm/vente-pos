import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <ProductSelectDialog ref={productSelectDialogRef} />
      <h1>Input item</h1>
    </div>
  );
};

interface ProductSelectDialogRef {
  openDialog(): void;
  closeDialog(): void;
}
interface ProductSelectDialogProps {
  ref?: React.Ref<ProductSelectDialogRef>;
}
export const ProductSelectDialog: React.FC<ProductSelectDialogProps> = ({
  ref,
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
