import { AddCategoryDialog } from "@/components/dialogs/add-category";
import { getCategories } from "@/server/actions/items";
import { DataTableCategory } from "@/components/tables/table-category";

export default async function Page() {
  const queries = await getCategories({});
  return (
    <div className="">
      <h1>Categories</h1>
      <DataTableCategory
        data={queries?.data}
        rightHeader={<AddCategoryDialog />}
      />
    </div>
  );
}
