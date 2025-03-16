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
import { DataTableProduct } from "@/components/tables/product-table";
import { useDeleteProduct } from "@/hooks/mutations";
import type { SelectProduct } from "@/server/db";
import { PencilIcon, Trash2 } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import { ColumnProductType } from "@/components/tables/product-table/columns";

interface ProductClientPageProps {
  data?: (SelectProduct & { categoryName: string | null })[];
  categories?: { id: string; name: string }[];
}
/**
 * `ProductClientPage` is a React functional component that renders a product management page.
 * It provides functionalities for displaying, updating, and deleting products, as well as adding new ones.
 *
 * @component
 * @param {ProductClientPageProps} props - The props for the component.
 * @param {ColumnProductType[]} [props.data=[]] - The array of product data to be displayed in the table.
 * @param {CategoryType[]} [props.categories=[]] - The array of product categories used in forms and dialogs.
 *
 * @returns {JSX.Element} The rendered product management page.
 *
 * @remarks
 * - This component uses several custom hooks and components to manage product-related actions:
 *   - `useDeleteProduct`: Handles the deletion of products.
 *   - `useUpdateProductFormDialog`: Manages the update product form dialog.
 *   - `useDeleteDialog`: Manages the delete confirmation dialog.
 * - The `DataTableProduct` component is used to display the product data in a table format.
 * - The `UpdateProductDialogForm` and `AddProductDialogForm` components are used for updating and adding products, respectively.
 * - The `DialogDeleteAction` component is used to confirm product deletions.
 *
 * @example
 * ```tsx
 * <ProductClientPage
 *   data={[
 *     { id: '1', name: 'Product A', category: 'Category 1' },
 *     { id: '2', name: 'Product B', category: 'Category 2' },
 *   ]}
 *   categories={[
 *     { id: '1', name: 'Category 1' },
 *     { id: '2', name: 'Category 2' },
 *   ]}
 * />
 * ```
 */
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
        menus={[
          {
            name: "Modifier",
            shortcut: <PencilIcon className="h-4 w-4" />,
            action: (row?: Row<ColumnProductType>) => {
              if (row) {
                updateFormRef.current?.update({
                  ...row.original,
                  description: row.original.description ?? undefined,
                });
              }
            },
            separator: true,
          },
          {
            name: "Suprimer",
            shortcut: <Trash2 className="h-4 w-4" />,
            action: (row?: Row<ColumnProductType>) => {
              if (row) {
                deleteDialogRef.current?.delete(row?.original.id);
              }
            },
          },
        ]}
      />
    </div>
  );
};
