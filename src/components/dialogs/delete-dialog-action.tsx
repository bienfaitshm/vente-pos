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
  const [value, setValue] = useState<unknown>(null);

  useImperativeHandle(
    ref,
    () => ({
      delete(e) {
        setValue(e);
      },
    }),
    []
  );

  const handleConfirm = () => {
    value && onConfirm?.(value);
  };
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suppression</DialogTitle>
          <DialogDescription>suppresion action</DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="text-2xl text-center">
            Voulez-vous vraiment supprimer?
          </h1>
        </div>
        <DialogFooter className="flex items-center justify-center gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Annuler
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm}>Supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function useDeleteDialog() {
  return useRef<DialogDeleteActionRef>(null);
}
