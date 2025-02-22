import { getCategories, getProducts } from "@/server/actions/items";
import { ProductClientPage } from "./client-page";

export default async function Page() {
  const [products, categories] = await Promise.all([
    getProducts({}),
    getCategories({}),
  ]);
  return (
    <div className="space-y-5">
      <h1>Produits</h1>
      <ProductClientPage categories={categories?.data} data={products?.data} />
    </div>
  );
}
