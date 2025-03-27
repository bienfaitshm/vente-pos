import { auth } from "@/auth";
import { DataTableStockHistory } from "@/components/tables/stock-history-table";
import { getStockHistoriesOfSeller } from "@/server/actions";

export default async function HistoryStockPage() {
  const session = await auth();
  const stockHistories = await getStockHistoriesOfSeller({
    sellerId: session?.user.id ?? "",
  });
  console.log(stockHistories?.data);
  return (
    <div>
      <DataTableStockHistory data={stockHistories?.data} />
    </div>
  );
}
