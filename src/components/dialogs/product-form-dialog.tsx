"use client";

import React, { useRef } from "react";
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
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";

type TProductDefaultValueWithID = { id: string } & TProductDefaultValue;

type PropsWithCategories<Props> = Props & {
  categories: { id: string; name: string }[];
};

interface ProductUpdateFormRef {
  update(value: TProductDefaultValueWithID): void;
}

interface UpdateProductDialogFormProps {
  ref?: React.Ref<ProductUpdateFormRef>;
}

/**
 * UpdateProductDialogForm Component
 *
 * This component renders a dialog form for updating an existing product. It uses the `ProductForm` component
 * to handle the form fields and submission logic. The dialog can be opened programmatically using the `ref` prop.
 *
 * @param {PropsWithCategories<UpdateProductDialogFormProps>} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export const UpdateProductDialogForm: React.FC<
  PropsWithCategories<UpdateProductDialogFormProps>
> = ({ ref, categories }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const dialogAction = useDialogAction<TProductDefaultValueWithID>();
  const mutation = useUpdateProduct();

  // Expose the `update` method via the ref to allow programmatic dialog opening
  React.useImperativeHandle(
    ref,
    () => ({
      update(value) {
        dialogAction.handleOpenDialog(value);
      },
    }),
    [dialogAction]
  );

  return (
    <Dialog open={dialogAction.open} onOpenChange={dialogAction.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification</DialogTitle>
          <DialogDescription>
            Modifier l&apos;élément sélectionné
          </DialogDescription>
        </DialogHeader>
        <div>
          <ProductForm
            isUpdateForm
            categories={categories}
            initialValues={dialogAction.value}
            onSubmit={(data) =>
              mutation.mutateAsync({
                id: dialogAction.value?.id || "",
                ...data,
              })
            }
          >
            {/* Hidden submit button to trigger form submission programmatically */}
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
 * AddProductDialogForm Component
 *
 * This component renders a dialog form for adding a new product. It uses the `ProductForm` component
 * to handle the form fields and submission logic. The dialog is triggered by a button click.
 *
 * @param {PropsWithCategories<unknown>} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export const AddProductDialogForm: React.FC<PropsWithCategories<unknown>> = ({
  categories,
}) => {
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
          <DialogDescription>Ajouts d&apos;un produit</DialogDescription>
        </DialogHeader>
        <div>
          <ProductForm categories={categories} onSubmit={mutation.mutateAsync}>
            {/* Hidden submit button to trigger form submission programmatically */}
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

/**
 * useUpdateProductFormDialog Hook
 *
 * This hook provides a ref to control the `UpdateProductDialogForm` component programmatically.
 *
 * @returns {React.RefObject<ProductUpdateFormRef>} A ref object to control the dialog.
 */
export function useUpdateProductFormDialog() {
  return useRef<ProductUpdateFormRef>(null);
}
