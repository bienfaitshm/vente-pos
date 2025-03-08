"use client";

import { AlertDelete } from "@/components/alert-delete";
import {
  AddProductDialogForm,
  UpdateProductDialogForm,
  useUpdateProductFormDialog,
} from "@/components/dialogs/product-form-dialog";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-action-dialog";
import { DataTableProduct } from "@/components/tables/table-product";
import { useDeleteProduct } from "@/hooks/mutations";
import type { SelectProduct } from "@/server/db";

interface ProductClientPageProps {
  data?: SelectProduct[];
  categories?: { id: number; name: string }[];
}
export const ProductClientPage: React.FC<ProductClientPageProps> = ({
  data = [],
  categories = [],
}) => {
  const mutation = useDeleteProduct();
  const updateFormRef = useUpdateProductFormDialog();
  const deleteDialogRef = useDeleteDialog();

  const onDeleteConfirm = (value: string) => {
    mutation.mutate(value, {
      onSuccess() {
        console.log("Deletation success");
      },
    });
  };
  return (
    <div className="space-y-5">
      <UpdateProductDialogForm categories={categories} ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as string)}
      />
      {mutation.isPending && <AlertDelete />}
      <DataTableProduct
        data={data}
        rightHeader={<AddProductDialogForm categories={categories} />}
        cellActions={{
          onDelete(row) {
            deleteDialogRef.current?.delete(row.original.id);
          },
          onEdit(row) {
            updateFormRef.current?.update(row.original);
          },
        }}
      />
    </div>
  );
};
