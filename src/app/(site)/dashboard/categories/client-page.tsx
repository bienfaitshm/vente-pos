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
import { DataTableCategory } from "@/components/tables/category-table";
import { useDeleteCategory } from "@/hooks/mutations";
import type { ColumnCategoryType } from "@/components/tables/category-table/columns";
import type { Row } from "@tanstack/react-table";
import { PencilIcon, Trash2 } from "lucide-react";

interface CategoryClientPageProps {
  /**
   * The data to be displayed in the category table.
   * Each item represents a category with its associated properties.
   */
  data?: ColumnCategoryType[];
}

/**
 * `CategoryClientPage` is a React functional component that renders a page
 * for managing categories. It includes functionality for adding, updating,
 * and deleting categories, as well as displaying them in a data table.
 *
 * @param {CategoryClientPageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const CategoryClientPage: React.FC<CategoryClientPageProps> = ({
  data = [],
}) => {
  // Mutation hook for deleting a category
  const mutation = useDeleteCategory();

  // Reference to the update category dialog form
  const updateFormRef = useUpdateCategoryFormDialog();

  // Reference to the delete confirmation dialog
  const deleteDialogRef = useDeleteDialog();

  /**
   * Handles the confirmation of a category deletion.
   *
   * @param {string} categoryId - The ID of the category to delete.
   */
  const onDeleteConfirm = (categoryId: string) => {
    mutation.mutate(categoryId, {
      onSuccess() {
        console.log("Deletion successful");
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Update Category Dialog */}
      <UpdateCategoryDialogForm ref={updateFormRef} />

      {/* Delete Confirmation Dialog */}
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(categoryId) => onDeleteConfirm(categoryId as string)}
      />

      {/* Alert displayed during deletion */}
      {mutation.isPending && <AlertDelete />}

      {/* Data Table for Categories */}
      <DataTableCategory
        data={data}
        rightHeader={<AddCategoryDialogForm />}
        menus={[
          {
            name: "Modifier",
            shortcut: <PencilIcon className="h-4 w-4" />,
            action: (row?: Row<ColumnCategoryType>) => {
              if (row) {
                // Open the update dialog with the selected row's data
                updateFormRef.current?.update({
                  ...row.original,
                  description: row.original.description ?? undefined,
                });
              }
            },
            separator: true,
          },
          {
            name: "Supprimer",
            shortcut: <Trash2 className="h-4 w-4" />,
            action: (row?: Row<ColumnCategoryType>) => {
              if (row) {
                // Open the delete confirmation dialog with the selected row's data
                deleteDialogRef.current?.delete(row?.original.id);
              }
            },
          },
        ]}
      />
    </div>
  );
};
