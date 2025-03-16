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
import { ButtonLoader } from "../button-loader";
import { useDialogAction } from "@/hooks/dialog-action";
import { SigninForm } from "../forms/signin-form";
import { RegistrationCredential } from "@/lib/schemas";
import { PlusCircle } from "lucide-react";
import { useSigninUser, useUpdateSeller } from "@/hooks/mutations/accounts";

/**
 * Type definition for the data used in the seller update form.
 */
export type UpdateSelerFormDataType = { id: string } & Pick<
  RegistrationCredential,
  "name" | "email" | "username"
>;

/**
 * Interface for the imperative handle of the seller update form dialog.
 */
interface SalerUpdateFormDialogRef {
  /**
   * Opens the dialog and populates it with the provided data.
   * @param value - The data to populate the form with.
   */
  update(value: UpdateSelerFormDataType): void;
}

/**
 * Props for the `SalerUpdateFormDialog` component.
 */
interface SalerUpdateFormDialogProps {
  /**
   * Optional ref to access the imperative handle of the dialog.
   */
  ref?: React.Ref<SalerUpdateFormDialogRef>;
}

/**
 * A dialog component for updating seller information.
 *
 * @param props - The props for the component.
 */
export const SalerUpdateFormDialog: React.FC<SalerUpdateFormDialogProps> = ({
  ref,
}) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const dialogAction = useDialogAction<UpdateSelerFormDataType>();
  const mutation = useUpdateSeller();

  // Expose the `update` method via the imperative handle.
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
          <SigninForm
            defaultValues={dialogAction.value}
            onSubmit={({ name, phoneNumber, username, email }) =>
              mutation.mutateAsync({
                name,
                phoneNumber,
                username,
                role: "SELLER",
                email,
                sellerId: dialogAction.value?.id as string,
              })
            }
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

/**
 * A dialog component for creating a new seller.
 */
export const SalerCreateFormDialog: React.FC = () => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useSigninUser();

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
          <SigninForm
            showPassword
            onSubmit={(data) =>
              mutation.mutateAsync({ ...data, role: "SELLER" })
            }
          >
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

/**
 * Hook to create a ref for the `SalerUpdateFormDialog` component.
 *
 * @returns A ref object to control the `SalerUpdateFormDialog`.
 */
export function useDeleteSellerFormDialog() {
  return useRef<SalerUpdateFormDialogRef>(null);
}
