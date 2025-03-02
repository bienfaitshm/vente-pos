import { getProducts, getClients } from "@/server/actions";
import { SaleClientPage } from "./client-page";
import { auth } from "@/auth";

export default async function Page() {
  const [products, clients, session] = await Promise.all([
    getProducts({}),
    getClients({}),
    auth(),
  ]);

  console.log(JSON.stringify(session, null, 4));

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto space-y-5">
        <h1>Vente</h1>
        <SaleClientPage
          products={products?.data}
          clients={clients?.data}
          saler={session?.user.id}
        />
      </div>
    </div>
  );
}
