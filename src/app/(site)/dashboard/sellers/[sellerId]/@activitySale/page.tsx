import { PageProps } from "@/app/type";
import { DataTableActivity } from "@/components/tables/activities-table";
import { getSellerActivities } from "@/server/actions";

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
export default async function SaleActivitySale({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const activities = await getSellerActivities({ sellerId });
  return (
    <div>
      <DataTableActivity data={activities?.data} />
    </div>
  );
}
