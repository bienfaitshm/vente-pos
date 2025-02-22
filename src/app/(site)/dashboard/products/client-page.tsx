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
import { DataTableCategory } from "@/components/tables/table-category";
import { useDeleteCategory } from "@/hooks/mutations";

interface ProductClientPageProps {
  data?: { id: number; name: string }[];
  categories?: { id: number; name: string }[];
}
export const ProductClientPage: React.FC<ProductClientPageProps> = ({
  data = [],
  categories = [],
}) => {
  const mutation = useDeleteCategory();
  const updateFormRef = useUpdateProductFormDialog();
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
      <UpdateProductDialogForm categories={categories} ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as number)}
      />
      {mutation.isPending && <AlertDelete />}
      <DataTableCategory
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
