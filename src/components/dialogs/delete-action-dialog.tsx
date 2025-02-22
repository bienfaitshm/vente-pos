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
import { useImperativeHandle, useRef, useState } from "react";

interface DialogDeleteActionRef {
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
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<unknown>(null);

  useImperativeHandle(
    ref,
    () => ({
      delete(e) {
        setValue(e);
        onOpenChange(true);
      },
    }),
    []
  );

  const handleConfirm = () => {
    value && onConfirm?.(value);
    setOpen(false);
  };
  //
  const onOpenChange = (_open: boolean) => {
    !_open && setValue(null);
    setOpen(_open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="sm:text-center">
          <DialogTitle>Suppression</DialogTitle>
          <DialogDescription>
            Supprimer l'élément sélectionné{" "}
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
