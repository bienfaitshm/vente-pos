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
import { useCreateCategory, useUpdateCategory } from "@/hooks/mutations";
import { CategoryForm, TCategoryDefaultValue } from "../forms/category-form";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";

type TCategoryDefaultValueWithID = { id: string } & TCategoryDefaultValue;

interface CategoryUpdateFormRef {
  /**
   * Opens the dialog and populates the form with the provided category data.
   * @param value - The category data to populate the form.
   */
  update(value: TCategoryDefaultValueWithID): void;
}

interface UpdateCategoryDialogFormProps {
  /**
   * A React ref to control the update dialog externally.
   */
  ref?: React.Ref<CategoryUpdateFormRef>;
}

/**
 * UpdateCategoryDialogForm
 *
 * A dialog component for updating an existing category. It uses a form to
 * collect the updated category data and submits it using a mutation hook.
 *
 * @param {UpdateCategoryDialogFormProps} props - The component props.
 * @returns {React.FC} The UpdateCategoryDialogForm component.
 */
export const UpdateCategoryDialogForm: React.FC<
  UpdateCategoryDialogFormProps
> = ({ ref }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const dialogAction = useDialogAction<TCategoryDefaultValueWithID>();
  const mutation = useUpdateCategory();

  // Expose the `update` method to the parent component via the ref.
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
          <CategoryForm
            initialValues={dialogAction.value}
            onSubmit={(values) =>
              mutation.mutateAsync({
                id: dialogAction.value?.id || "",
                ...values,
              })
            }
          >
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </CategoryForm>
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
 * AddCategoryDialogForm
 *
 * A dialog component for adding a new category. It uses a form to collect
 * the category data and submits it using a mutation hook.
 *
 * @returns {React.FC} The AddCategoryDialogForm component.
 */
export const AddCategoryDialogForm: React.FC = () => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useCreateCategory();

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
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>Ajouts de la categorie</DialogDescription>
        </DialogHeader>
        <div>
          <CategoryForm onSubmit={mutation.mutateAsync}>
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </CategoryForm>
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
 * useUpdateCategoryFormDialog
 *
 * A custom hook that provides a ref to control the UpdateCategoryDialogForm
 * externally. This can be used to programmatically open the dialog and
 * populate it with category data.
 *
 * @returns {React.RefObject<CategoryUpdateFormRef>} A ref to control the dialog.
 */
export function useUpdateCategoryFormDialog() {
  return useRef<CategoryUpdateFormRef>(null);
}
