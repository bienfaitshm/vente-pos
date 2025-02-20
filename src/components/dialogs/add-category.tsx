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
import { useCreateCategory } from "@/hooks/mutations";
import { CategoryForm } from "../forms/category-form";
import React from "react";
import { ButtonLoader } from "../button-loader";

export const AddCategoryDialog = () => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useCreateCategory();
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
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
