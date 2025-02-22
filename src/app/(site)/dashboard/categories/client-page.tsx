"use client";

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
  return (
    <div>
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
      <UpdateCategoryDialogForm ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => {
          console.log("Confirme delete", value);
        }}
      />
    </div>
  );
};
