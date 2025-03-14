import { PageProps } from "@/app/type";
import { DataTableStockHistory } from "@/components/tables/stock-history-table";
import { getStockHistories } from "@/server/actions";

export default async function HistoryStockPage({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const stockHistories = await getStockHistories({ sellerId });
  return (
    <div>
      <DataTableStockHistory data={stockHistories?.data} />
    </div>
  );
}
