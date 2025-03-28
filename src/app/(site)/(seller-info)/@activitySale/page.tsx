import { auth } from "@/auth";
import { MonthSalesView } from "@/components/month-sales-view";
import { DataTableActivity } from "@/components/tables/activities-table";
import {
  getSellerActivities,
  getMonthlySellerCommissions,
} from "@/server/actions";

/**
 * Asynchronous React component that fetches and displays the activity data
 * for a specific seller based on their ID.
 *
 * @param {PageProps<{ sellerId: string }>} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.sellerId - The unique identifier of the seller.
 * @returns {Promise<JSX.Element>} A JSX element that renders a data table with the seller's activities.
 *
 * @async
 */
export default async function SaleActivitySale() {
  const session = await auth();
  const [activities, mounthlySellerCommissions] = await Promise.all([
    getSellerActivities({
      sellerId: session?.user.id ?? "",
    }),
    getMonthlySellerCommissions({
      sellerId: session?.user.id ?? "",
    }),
  ]);
  return (
    <div className="max-w-screen-sm lg:max-w-screen-lg m-auto">
      <DataTableActivity
        data={activities?.data}
        mainHeader={<MonthSalesView data={mounthlySellerCommissions?.data} />}
      />
    </div>
  );
}
