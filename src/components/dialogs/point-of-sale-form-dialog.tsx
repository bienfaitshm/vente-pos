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
import { useCreatePointOfSale, useUpdatePointOfSale } from "@/hooks/mutations";
import {
  PointOfSaleForm,
  TPointOfSaleDefaultValue,
} from "../forms/point-of-sale-form";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";
import React, { useRef } from "react";

type TPointOfSaleDefaultValueWithID = { id: number } & TPointOfSaleDefaultValue;
interface PointOfSaleUpdateFormRef {
  update(value: TPointOfSaleDefaultValueWithID): void;
}

interface UpdatePointOfSaleDialogFormProps {
  ref?: React.Ref<PointOfSaleUpdateFormRef>;
}

/**
 * Update PointOfSale Form
 * @param param0
 * @returns
 */
export const UpdatePointOfSaleDialogForm: React.FC<
  UpdatePointOfSaleDialogFormProps
> = ({ ref }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);

  const dialogAction = useDialogAction<TPointOfSaleDefaultValueWithID>();
  const mutation = useUpdatePointOfSale();
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
            Modifier l&apos;élément sélectionné{" "}
          </DialogDescription>
        </DialogHeader>
        <div>
          <PointOfSaleForm
            initialValues={dialogAction.value}
            onSubmit={mutation.mutateAsync}
          >
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
 * Add new PointOfSale Form
 * @returns
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

export function useUpdatePointOfSaleFormDialog() {
  return useRef<PointOfSaleUpdateFormRef>(null);
}
