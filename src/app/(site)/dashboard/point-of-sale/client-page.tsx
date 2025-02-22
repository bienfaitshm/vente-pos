"use client";

import { AlertDelete } from "@/components/alert-delete";
import {
  AddPointOfSaleDialogForm,
  UpdatePointOfSaleDialogForm,
  useUpdatePointOfSaleFormDialog,
} from "@/components/dialogs/point-of-sale-form-dialog";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-action-dialog";
import { DataTablePointOfSale } from "@/components/tables/table-point-of-sale";
import { useDeletePointOfSale } from "@/hooks/mutations";
import type { SelectPointOfSale } from "@/server/db";

interface PointOfSaleClientPageProps {
  data?: SelectPointOfSale[];
}
export const PointOfSaleClientPage: React.FC<PointOfSaleClientPageProps> = ({
  data = [],
}) => {
  const mutation = useDeletePointOfSale();
  const updateFormRef = useUpdatePointOfSaleFormDialog();
  const deleteDialogRef = useDeleteDialog();

  const onDeleteConfirm = (value: number) => {
    mutation.mutate(value, {
      onSuccess() {
        console.log("Deletation success");
      },
    });
  };
  return (
    <div className="space-y-5">
      <UpdatePointOfSaleDialogForm ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as number)}
      />
      {mutation.isPending && <AlertDelete />}
      <DataTablePointOfSale
        data={data}
        rightHeader={<AddPointOfSaleDialogForm />}
        cellActions={{
          onDelete(row) {
            deleteDialogRef.current?.delete(row.original.id);
          },
          onEdit(row) {
            updateFormRef.current?.update({
              ...row.original,
              description: row.original.description as string | undefined,
            });
          },
        }}
      />
    </div>
  );
};
