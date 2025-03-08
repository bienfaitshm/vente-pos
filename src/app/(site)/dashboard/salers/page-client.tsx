"use client";
import { AlertDelete } from "@/components/alert-delete";
import {
  DialogDeleteAction,
  useDeleteDialog,
} from "@/components/dialogs/delete-action-dialog";
import {
  SalerCreateFormDialog,
  SalerUpdateFormDialog,
  useUpdateSalerFormDialog,
} from "@/components/dialogs/saler-form-dialog";
import { DataTableSaler } from "@/components/tables/salers-table";
import { useDeleteProduct } from "@/hooks/mutations";
import { PencilIcon, Trash2 } from "lucide-react";
import type { SelectUser } from "@/server/db/schemas";
import type { SalerColumnDefType } from "@/components/tables/salers-table/columns";
import type { Row } from "@tanstack/react-table";

export const PageClient: React.FC<{ data?: SelectUser[] }> = ({
  data = [],
}) => {
  const mutation = useDeleteProduct();
  const updateFormRef = useUpdateSalerFormDialog();
  const deleteDialogRef = useDeleteDialog();

  const onDeleteConfirm = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <SalerUpdateFormDialog ref={updateFormRef} />
      <DialogDeleteAction
        ref={deleteDialogRef}
        onConfirm={(value) => onDeleteConfirm(value as string)}
      />
      {mutation.isPending && <AlertDelete />}
      <DataTableSaler
        data={data as SalerColumnDefType[]}
        rightHeader={<SalerCreateFormDialog />}
        menus={[
          {
            name: "Renflouer le stock",
            action(row?: Row<SalerColumnDefType>) {
              console.log(row?.original);
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
            action: () => {},
          },
        ]}
      />
    </div>
  );
};
