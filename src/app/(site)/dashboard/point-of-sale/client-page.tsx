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
import { DataTablePointOfSale } from "@/components/tables/pos-table";
import { useDeletePointOfSale } from "@/hooks/mutations";
import type { ColumnPointOfSaleType } from "@/components/tables/pos-table/columns";
import { PencilIcon, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

interface PointOfSaleClientPageProps {
  /**
   * The data to be displayed in the Point of Sale table.
   * Each item in the array represents a row in the table.
   */
  data?: ColumnPointOfSaleType[];
}

/**
 * PointOfSaleClientPage Component
 *
 * This component renders the Point of Sale management page, including a data table
 * with actions for updating and deleting Point of Sale entries. It also includes
 * dialogs for adding, updating, and confirming deletion of entries.
 *
 * @param {PointOfSaleClientPageProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered Point of Sale management page.
 */
export const PointOfSaleClientPage: React.FC<PointOfSaleClientPageProps> = ({
  data = [],
}) => {
  // Mutation hook for deleting a Point of Sale entry
  const mutation = useDeletePointOfSale();

  // Ref for managing the update Point of Sale dialog
  const updateFormRef = useUpdatePointOfSaleFormDialog();

  // Ref for managing the delete confirmation dialog
  const deleteDialogRef = useDeleteDialog();

  /**
   * Handles the confirmation of a delete action.
   *
   * @param {string} posId - The ID of the Point of Sale entry to delete.
   */
  const onDeleteConfirm = (posId: string) => {
    mutation.mutate(posId, {
      onSuccess() {
        console.log("Deletion successful");
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Update Point of Sale Dialog */}
      <UpdatePointOfSaleDialogForm ref={updateFormRef} />

      {/* Delete Confirmation Dialog */}
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as string)}
      />

      {/* Alert displayed during deletion */}
      {mutation.isPending && <AlertDelete />}

      {/* Data Table for Point of Sale entries */}
      <DataTablePointOfSale
        data={data}
        rightHeader={<AddPointOfSaleDialogForm />}
        menus={[
          {
            name: "Modifier",
            shortcut: <PencilIcon className="h-4 w-4" />,
            action: (row?: Row<ColumnPointOfSaleType>) => {
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
            action: (row?: Row<ColumnPointOfSaleType>) => {
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
