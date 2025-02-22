import { getCategories } from "@/server/actions/items";
import { CategoryClientPage } from "./client-page";

export default async function Page() {
  const queries = await getCategories({});
  return (
    <div className="space-y-5">
      <h1>Produits</h1>
      <CategoryClientPage data={queries?.data} />
    </div>
  );
}
