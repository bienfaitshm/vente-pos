"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/mutations";
import { ProductForm, TProductDefaultValue } from "../forms/product-form";
import React, { useRef } from "react";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";

type TProductDefaultValueWithID = { id: number } & TProductDefaultValue;
interface ProductUpdateFormRef {
  update(value: TProductDefaultValueWithID): void;
}

interface AddProductDialogFormProps {}

interface UpdateProductDialogFormProps {
  ref?: React.Ref<ProductUpdateFormRef>;
}

/**
 * Update Product Form
 * @param param0
 * @returns
 */
export const UpdateProductDialogForm: React.FC<
  UpdateProductDialogFormProps
> = ({ ref }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);

  const dialogAction = useDialogAction<TProductDefaultValueWithID>();
  const mutation = useUpdateProduct();
  React.useImperativeHandle(
    ref,
    () => ({
      update(value) {
        dialogAction.handleOpenDialog(value);
      },
    }),
    []
  );

  return (
    <Dialog open={dialogAction.open} onOpenChange={dialogAction.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification</DialogTitle>
          <DialogDescription>Modifier l'élément sélectionné </DialogDescription>
        </DialogHeader>
        <div>
          <ProductForm
            initialValues={dialogAction.value}
            onSubmit={mutation.mutateAsync}
          >
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </ProductForm>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Annuler les modifications
            </Button>
          </DialogClose>
          <div>
            <ButtonLoader
              isLoading={mutation.isPending}
              loadingText="Enregistrement..."
              onClick={() => {
                btnSubmitRef.current?.click();
              }}
            >
              Enregistrer les modifications
            </ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Add new Product Form
 * @returns
 */
export const AddProductDialogForm: React.FC<AddProductDialogFormProps> = () => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useCreateProduct();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">
          <PlusCircle />
          <span>Ajouter</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Produit</DialogTitle>
          <DialogDescription>Ajouts d'un produit</DialogDescription>
        </DialogHeader>
        <div>
          <ProductForm onSubmit={mutation.mutateAsync}>
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </ProductForm>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Terminer
            </Button>
          </DialogClose>
          <div>
            <ButtonLoader
              isLoading={mutation.isPending}
              loadingText="Enregistrement..."
              onClick={() => {
                btnSubmitRef.current?.click();
              }}
            >
              Enregistrer
            </ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function useUpdateProductFormDialog() {
  return useRef<ProductUpdateFormRef>(null);
}
