"use client";

import { AddCategoryDialog } from "@/components/dialogs/add-category";
import { DataTableCategory } from "@/components/tables/table-category";

interface CategoryClientPageProps {
  data?: { id: number; name: string }[];
}
export const CategoryClientPage: React.FC<CategoryClientPageProps> = ({
  data = [],
}) => {
  return (
    <div>
      <DataTableCategory data={data} rightHeader={<AddCategoryDialog />} />
    </div>
  );
};
