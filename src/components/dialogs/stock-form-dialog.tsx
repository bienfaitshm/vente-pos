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

import { Button } from "@/components/ui/button";
import React from "react";
import { ButtonLoader } from "@/components/button-loader";

import { useChangeStock } from "@/hooks/mutations";
import { StockForm } from "@/components/forms/stock-form";

export interface StockFormDialogProps {
  type?: "UPDATE" | "CREATE";
  onSucces?(): void;
}

export const StockFormDialog: React.FC<
  React.PropsWithChildren<StockFormDialogProps>
> = ({ children, onSucces, type = "CREATE" }) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);
  const mutation = useChangeStock({
    onSuccess() {
      onSucces?.();
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stock</DialogTitle>
          <DialogDescription>
            {type === "CREATE"
              ? "Enregistrez ce nouveau produit dans votre stock."
              : "Ajuster le stock"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <StockForm
            type={type}
            onSubmit={(data) =>
              mutation.mutateAsync({ ...data, action: data.action ?? "ADD" })
            }
          >
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </StockForm>
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
