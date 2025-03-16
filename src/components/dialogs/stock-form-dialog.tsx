"use client";

import React from "react";
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
import { ButtonLoader } from "@/components/button-loader";
import { useChangeStock } from "@/hooks/mutations";
import { StockForm, type StockFormProps } from "@/components/forms/stock-form";

/**
 * Props for the StockFormDialog component.
 */
export interface StockFormDialogProps {
  /**
   * Callback triggered when the stock operation is successful.
   */
  onSucces?(): void;

  /**
   * Admin ID to associate with the stock operation.
   */
  adminId: string;
}

/**
 * A dialog component for managing stock operations such as creating or adjusting stock.
 *
 * @param {StockFormDialogProps & Pick<StockFormProps, "pointOfSales" | "products" | "type" | "defaultValues">} props
 * Props for the component, including stock form data and dialog behavior.
 *
 * @returns {React.ReactElement} The rendered StockFormDialog component.
 */
export const StockFormDialog: React.FC<
  React.PropsWithChildren<
    StockFormDialogProps &
      Pick<
        StockFormProps,
        "pointOfSales" | "products" | "type" | "defaultValues"
      >
  >
> = ({
  children,
  onSucces,
  pointOfSales,
  products,
  adminId,
  defaultValues,
  type = "CREATE",
}) => {
  const btnSubmitRef = React.useRef<HTMLButtonElement>(null);

  // Mutation hook for handling stock changes
  const mutation = useChangeStock({
    onSuccess: () => {
      onSucces?.();
    },
    onError: (error) => {
      console.error("Stock change error:", error);
    },
  });

  return (
    <Dialog>
      {/* Trigger to open the dialog */}
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

        {/* Stock form for creating or adjusting stock */}
        <div>
          <StockForm
            type={type}
            pointOfSales={pointOfSales}
            products={products}
            defaultValues={defaultValues}
            onSubmit={(data) =>
              mutation.mutateAsync({
                ...data,
                action: data.action ?? "ADD",
                adminId,
              })
            }
          >
            {/* Hidden submit button to trigger form submission programmatically */}
            <Button type="submit" className="hidden" ref={btnSubmitRef} />
          </StockForm>
        </div>

        <DialogFooter>
          {/* Close button for the dialog */}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Terminer
            </Button>
          </DialogClose>

          {/* Submit button with loading state */}
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
