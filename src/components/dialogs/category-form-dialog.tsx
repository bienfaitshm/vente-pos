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
import { useCreateCategory, useUpdateCategory } from "@/hooks/mutations";
import { CategoryForm, TCategoryDefaultValue } from "../forms/category-form";
import React, { useRef } from "react";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";

type TCategoryDefaultValueWithID = { id: number } & TCategoryDefaultValue;
interface CategoryUpdateFormRef {
  update(value: TCategoryDefaultValueWithID): void;
}

interface AddCategoryDialogFormProps {}

interface UpdateCategoryDialogFormProps {
  ref?: React.Ref<CategoryUpdateFormRef>;
}

/**
 * Update Category Form
 * @param param0
 * @returns
 */
export const UpdateCategoryDialogForm: React.FC<
  UpdateCategoryDialogFormProps
> = ({ ref }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);

  const dialogAction = useDialogAction<TCategoryDefaultValueWithID>();
  const mutation = useUpdateCategory();
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
          <CategoryForm
            intialValues={dialogAction.value}
            onSubmit={mutation.mutateAsync}
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
 * Add new Category Form
 * @returns
 */
export const AddCategoryDialogForm: React.FC<
  AddCategoryDialogFormProps
> = () => {
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

export function useUpdateCategoryFormDialog() {
  return useRef<CategoryUpdateFormRef>(null);
}
