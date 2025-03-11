import { PageProps } from "@/app/type";
import { DataTableStockHistory } from "@/components/tables/stock-history-table";
import { getStockHistories } from "@/server/actions";

export default async function HistoryStockPage({
  params,
}: PageProps<{ salerID: string }>) {
  const { salerID } = await params;
  const stockHistories = await getStockHistories({ saler: salerID });
  return (
    <div>
      <DataTableStockHistory data={stockHistories?.data} />
    </div>
  );
}
