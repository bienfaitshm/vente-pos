import { PageProps } from "@/app/type";
import { DataTableStockHistory } from "@/components/tables/stock-history-table";
import { getStockHistoriesOfSeller } from "@/server/actions";

export default async function HistoryStockPage({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const stockHistories = await getStockHistoriesOfSeller({ sellerId });
  return (
    <div>
      <DataTableStockHistory data={stockHistories?.data} />
    </div>
  );
}
