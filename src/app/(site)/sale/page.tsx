import { getProducts, getClients } from "@/server/actions";
import { SaleClientPage } from "./client-page";

export default async function Page() {
  const [products, clients] = await Promise.all([
    getProducts({}),
    getClients({}),
  ]);
  return (
    <div className="w-full">
      <div className="max-w-screen-md mx-auto space-y-5">
        <h1>Vente</h1>
        <SaleClientPage products={products?.data} clients={clients?.data} />
      </div>
    </div>
  );
}
