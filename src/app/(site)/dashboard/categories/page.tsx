import { getCategories } from "@/server/actions/products";
import { CategoryClientPage } from "./client-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queries = await getCategories({});
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1>Categories</h1>
      <CategoryClientPage data={queries?.data} />
    </div>
  );
}
