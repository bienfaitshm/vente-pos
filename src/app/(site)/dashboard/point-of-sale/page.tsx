import { PointOfSaleClientPage } from "./client-page";
import { getPointOfSales } from "@/server/actions/activities";

export const dynamic = "force-dynamic";

export default async function Page() {
  const queries = await getPointOfSales({});
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1>Point de vente</h1>
      <PointOfSaleClientPage data={queries?.data} />
    </div>
  );
}
