import { PageProps } from "@/app/type";
import { DataTableActivity } from "@/components/tables/activities-table";
import { getSellerActivities } from "@/server/actions";

export default async function SaleActivitySale({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const activities = await getSellerActivities({ sellerId });
  console.log(JSON.stringify(activities?.data, null, 4));
  return (
    <div>
      <DataTableActivity data={[]} />
    </div>
  );
}
