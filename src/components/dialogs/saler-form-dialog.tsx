"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useUpdateUser } from "@/hooks/mutations";
import React, { useRef } from "react";
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";
import { SigninForm } from "../forms/signin-form";
import { RegistrationCredential } from "@/lib/schemas";

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
  const mutation = useUpdateUser();
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

export function useUpdateSalerFormDialog() {
  return useRef<SalerUpdateFormDialogRef>(null);
}
