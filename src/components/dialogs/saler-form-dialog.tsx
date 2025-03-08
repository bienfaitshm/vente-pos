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
import React, { useRef } from "react";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";
import { SigninForm } from "../forms/signin-form";
import { RegistrationCredential } from "@/lib/schemas";
import { PlusCircle } from "lucide-react";
import { useUpdateSaler, useCreateSaler } from "@/hooks/mutations";

export type UpdateSelerFormDataType = Pick<
  RegistrationCredential,
  "name" | "email" | "username"
>;
interface SalerUpdateFormDialogRef {
  update(value: UpdateSelerFormDataType): void;
}

interface SalerUpdateFormDialogProps {
  ref?: React.Ref<SalerUpdateFormDialogRef>;
}

export const SalerUpdateFormDialog: React.FC<SalerUpdateFormDialogProps> = ({
  ref,
}) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const dialogAction = useDialogAction<UpdateSelerFormDataType>();
  const mutation = useUpdateSaler();
  React.useImperativeHandle(
    ref,
    () => ({
      update(value) {
        console.log({ value });
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
          <SigninForm
            defaultValues={dialogAction.value}
            onSubmit={mutation.mutateAsync}
          >
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </SigninForm>
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

export const SalerCreateFormDialog: React.FC = ({}) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useCreateSaler();
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
          <DialogTitle>Nouveau vendeur</DialogTitle>
          <DialogDescription>
            Nous vous recommandons d&apos;utiliser un gestionnaire de mots de
            passe ou un coffre-fort numérique pour stocker cette information.
          </DialogDescription>
        </DialogHeader>
        <div>
          <SigninForm showPassword onSubmit={mutation.mutateAsync}>
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </SigninForm>
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

export function useUpdateSalerFormDialog() {
  return useRef<SalerUpdateFormDialogRef>(null);
}
