import { getProducts, getCustomers } from "@/server/actions";
import { SaleClientPage } from "./client-page";
import { auth } from "@/auth";

export default async function Page() {
  const [products, customers, session] = await Promise.all([
    getProducts({}),
    getCustomers({}),
    auth(),
  ]);

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto space-y-5">
        <h1>Vente</h1>
        <SaleClientPage
          products={products?.data}
          customers={customers?.data}
          sellerId={session?.user.id as string}
        />
      </div>
    </div>
  );
}
