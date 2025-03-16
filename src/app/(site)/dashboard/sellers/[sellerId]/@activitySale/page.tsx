import { PageProps } from "@/app/type";
import { DataTableActivity } from "@/components/tables/activities-table";
import { getSellerActivities } from "@/server/actions";

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
