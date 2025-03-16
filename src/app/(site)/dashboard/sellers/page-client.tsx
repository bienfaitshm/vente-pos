"use client";
import { AlertDelete } from "@/components/alert-delete";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-action-dialog";
import {
  SalerCreateFormDialog,
  SalerUpdateFormDialog,
  useDeleteSellerFormDialog,
} from "@/components/dialogs/seller-form-dialog";
import { DataTableSaler } from "@/components/tables/salers-table";
import { useDeleteSeller } from "@/hooks/mutations/accounts";
import { PencilIcon, Trash2 } from "lucide-react";
import type { SelectUser } from "@/server/db/schemas";
import type { SalerColumnDefType } from "@/components/tables/salers-table/columns";
import type { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

/**
 * PageClient component
 *
 * This component renders the dashboard page for managing salers.
 * It includes dialogs for updating and deleting salers, and a data table for displaying salers.
 *
 * @param {Object} props - Component props
 * @param {SelectUser[]} [props.data=[]] - Array of saler data
 */
export const PageClient: React.FC<{ data?: SelectUser[] }> = ({
  data = [],
}) => {
  const updateFormRef = useDeleteSellerFormDialog();
  const deleteDialogRef = useDeleteDialog();
  const mutation = useDeleteSeller();
  const router = useRouter();

  /**
   * Handles the delete confirmation action
   *
   * @param {SalerColumnDefType} value - The saler data to be deleted
   */
  const onDeleteConfirm = async (value: SalerColumnDefType) => {
    await mutation.mutateAsync(value.id);
  };

  return (
    <div>
      <SalerUpdateFormDialog ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as SalerColumnDefType)}
      />
      {mutation.isPending && <AlertDelete />}
      <DataTableSaler
        data={data as SalerColumnDefType[]}
        rightHeader={<SalerCreateFormDialog />}
        menus={[
          {
            name: "Voir les stocks",
            action(row?: Row<SalerColumnDefType>) {
              router.push(`/dashboard/sellers/${row?.original.id}`);
            },
          },
          {
            name: "Modifier",
            shortcut: <PencilIcon className="h-4 w-4" />,
            action: (row?: Row<SalerColumnDefType>) => {
              if (row) {
                updateFormRef.current?.update(row.original);
              }
            },
            separator: true,
          },
          {
            name: "Suprimer",
            shortcut: <Trash2 className="h-4 w-4" />,
            action: (row?: Row<SalerColumnDefType>) => {
              if (row) {
                deleteDialogRef.current?.delete(row?.original);
              }
            },
          },
        ]}
      />
    </div>
  );
};
