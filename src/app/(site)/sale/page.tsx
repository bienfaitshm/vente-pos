import { getProducts } from "@/server/actions";
import { SaleClientPage } from "./client-page";

export default async function Page() {
  const products = await getProducts({});
  return (
    <div className="w-full">
      <div className="max-w-screen-md mx-auto bg-muted">
        <SaleClientPage products={products?.data} />
      </div>
    </div>
  );
}
