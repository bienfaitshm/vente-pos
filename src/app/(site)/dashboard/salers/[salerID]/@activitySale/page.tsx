import { PageProps } from "@/app/type";
import { DataTableActivity } from "@/components/tables/activities-table";
import { getSalerActivities } from "@/server/actions";

export default async function SaleActivitySale({
  params,
}: PageProps<{ salerID: string }>) {
  const { salerID } = await params;
  const activities = await getSalerActivities({ saler: salerID });
  console.log(JSON.stringify(activities?.data, null, 4));
  return (
    <div>
      <DataTableActivity data={activities?.data} />
    </div>
  );
}
