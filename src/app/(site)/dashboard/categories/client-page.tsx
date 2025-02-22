"use client";

import { AlertDelete } from "@/components/alert-delete";
import {
  AddCategoryDialogForm,
  UpdateCategoryDialogForm,
  useUpdateCategoryFormDialog,
} from "@/components/dialogs/category-form-dialog";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-action-dialog";
import { DataTableCategory } from "@/components/tables/table-category";

interface CategoryClientPageProps {
  data?: { id: number; name: string }[];
}
export const CategoryClientPage: React.FC<CategoryClientPageProps> = ({
  data = [],
}) => {
  const updateFormRef = useUpdateCategoryFormDialog();
  const deleteDialogRef = useDeleteDialog();

  const onDeleteConfirm = (value: number) => {};
  return (
    <div className="space-y-5">
      <UpdateCategoryDialogForm ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as number)}
      />
      <AlertDelete />
      <DataTableCategory
        data={data}
        rightHeader={<AddCategoryDialogForm />}
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
