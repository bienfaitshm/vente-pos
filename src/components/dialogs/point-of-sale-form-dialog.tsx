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
import { useCreatePointOfSale, useUpdatePointOfSale } from "@/hooks/mutations";
import {
  PointOfSaleForm,
  TPointOfSaleDefaultValue,
} from "../forms/point-of-sale-form";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";

/**
 * Type definition for the default values of the Point of Sale form, extended with an ID.
 */
type TPointOfSaleDefaultValueWithID = { id: string } & TPointOfSaleDefaultValue;

/**
 * Interface for the imperative handle of the UpdatePointOfSaleDialogForm component.
 */
interface PointOfSaleUpdateFormRef {
  /**
   * Opens the dialog and populates the form with the provided values.
   * @param value - The default values to populate the form.
   */
  update(value: TPointOfSaleDefaultValueWithID): void;
}

/**
 * Props for the UpdatePointOfSaleDialogForm component.
 */
interface UpdatePointOfSaleDialogFormProps {
  /**
   * A React ref to access the imperative handle of the component.
   */
  ref?: React.Ref<PointOfSaleUpdateFormRef>;
}

/**
 * Dialog form component for updating a Point of Sale.
 * This component allows users to modify an existing Point of Sale entry.
 */
export const UpdatePointOfSaleDialogForm: React.FC<
  UpdatePointOfSaleDialogFormProps
> = ({ ref }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const dialogAction = useDialogAction<TPointOfSaleDefaultValueWithID>();
  const mutation = useUpdatePointOfSale();

  // Expose the `update` method via the imperative handle
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
          <PointOfSaleForm
            initialValues={dialogAction.value}
            onSubmit={(values) =>
              mutation.mutateAsync({
                ...values,
                id: dialogAction.value?.id ?? "",
              })
            }
          >
            {/* Hidden submit button to trigger form submission programmatically */}
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </PointOfSaleForm>
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
 * Dialog form component for adding a new Point of Sale.
 * This component allows users to create a new Point of Sale entry.
 */
export const AddPointOfSaleDialogForm: React.FC = () => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useCreatePointOfSale();

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
          <DialogTitle>Point de vente</DialogTitle>
          <DialogDescription>Ajouts du point de vente</DialogDescription>
        </DialogHeader>
        <div>
          <PointOfSaleForm onSubmit={mutation.mutateAsync}>
            {/* Hidden submit button to trigger form submission programmatically */}
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </PointOfSaleForm>
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
 * Hook to create a ref for the UpdatePointOfSaleDialogForm component.
 * This ref can be used to programmatically open the dialog and populate the form.
 * @returns A React ref for the UpdatePointOfSaleDialogForm component.
 */
export function useUpdatePointOfSaleFormDialog() {
  return useRef<PointOfSaleUpdateFormRef>(null);
}
