"use client";

import { AddCategoryDialog } from "@/components/dialogs/add-category";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-dialog-action";
import { DataTableCategory } from "@/components/tables/table-category";

interface CategoryClientPageProps {
  data?: { id: number; name: string }[];
}
export const CategoryClientPage: React.FC<CategoryClientPageProps> = ({
  data = [],
}) => {
  const deleteDialogRef = useDeleteDialog();
  return (
    <div>
      <DataTableCategory
        data={data}
        rightHeader={<AddCategoryDialog />}
        cellActions={{
          onDelete(row) {
            const value = row.getValue("id");
            console.log("onDelete");
            deleteDialogRef.current?.delete(value);
          },
          onEdit(row) {
            console.log("onEdit", row.getValue("id"));
          },
        }}
      />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => {
          console.log("Confirme delete", value);
        }}
      />
    </div>
  );
};
