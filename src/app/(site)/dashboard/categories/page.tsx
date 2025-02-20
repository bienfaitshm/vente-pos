import { AddCategoryDialog } from "@/components/dialogs/add-category";
import { getCategories } from "@/server/actions/items";

export default async function Page() {
  const queries = await getCategories({});
  console.log({ queries });
  return (
    <div>
      <h1>Categories</h1>
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <AddCategoryDialog />
        </div>
      </div>
    </div>
  );
}
