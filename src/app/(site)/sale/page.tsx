import { getProducts } from "@/server/actions";
import { SaleClientPage } from "./client-page";

export default async function Page() {
  const products = await getProducts({});
  return (
    <div className="w-full">
      <div className="max-w-screen-md mx-auto space-y-5">
        <h1>Vente</h1>
        <SaleClientPage products={products?.data} />
      </div>
    </div>
  );
}
