import { AddCategoryDialog } from "@/components/dialogs/add-category";

export default async function Page() {
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
