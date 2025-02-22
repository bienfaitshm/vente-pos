import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useImperativeHandle, useRef } from "react";
import { useDialogAction } from "@/hooks/dialog-action";

export interface DialogDeleteActionRef {
  delete<T>(value: T): void;
}

interface DialogDeleteActionProps {
  onConfirm?<T>(value: T): void;
  ref: React.Ref<DialogDeleteActionRef>;
}

export const DialogDeleteAction: React.FC<DialogDeleteActionProps> = ({
  ref,
  onConfirm,
}) => {
  const dialogAction = useDialogAction();

  useImperativeHandle(
    ref,
    () => ({
      delete(value) {
        dialogAction.handleOpenDialog(value);
      },
    }),
    [dialogAction]
  );

  const handleConfirm = () => {
    if (dialogAction.value) {
      onConfirm?.(dialogAction.value);
    }
    dialogAction.handleCloseDialog();
  };
  //

  return (
    <Dialog open={dialogAction.open} onOpenChange={dialogAction.onOpenChange}>
      <DialogContent>
        <DialogHeader className="sm:text-center">
          <DialogTitle>Suppression</DialogTitle>
          <DialogDescription>
            Supprimer l&apos;élément sélectionné{" "}
          </DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="text-2xl text-center">
            Voulez-vous vraiment supprimer?
          </h1>
        </div>
        <DialogFooter className="sm:justify-center justify-center gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Annuler
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function useDeleteDialog() {
  return useRef<DialogDeleteActionRef>(null);
}
