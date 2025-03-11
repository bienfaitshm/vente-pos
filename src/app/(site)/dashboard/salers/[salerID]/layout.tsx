import React from "react";
import { DatePickerWithPresets } from "@/components/calendar-preset";
import { TypographyH3 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, HistoryIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";
import { getPointOfSales, getProducts } from "@/server/actions";

export default async function Layout({
  children,
  activityHistory,
  stock,
}: {
  children: React.ReactNode;
  activityHistory: React.ReactNode;
  stock: React.ReactNode;
}) {
  const [pointOfSales, products] = await Promise.all([
    getPointOfSales({}),
    getProducts({}),
  ]);

  return (
    <div className="m-auto max-w-screen-lg space-y-5">
      <div className="p-4 bg-muted/15 rounded-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-primary pl-3">
            <TypographyH3>Detail Vendeur</TypographyH3>
          </div>
          <DatePickerWithPresets />
        </div>
        <div>{children}</div>
      </div>
      <div className="p-4 bg-muted/15 rounded-xl">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="flex items-center justify-between bg-transparent">
            <div>
              <TabsTrigger value="activities">
                <Activity className="h-4 w-4 mr-2" />
                <span>Activites</span>
              </TabsTrigger>
              <TabsTrigger value="stocks" className="rounded-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Stocks</span>
              </TabsTrigger>
              <TabsTrigger value="stock-histories" className="rounded-full">
                <HistoryIcon className="h-4 w-4 mr-2" />
                <span>Historiques du stock</span>
              </TabsTrigger>
            </div>
            <StockFormDialog
              defaultValues={{ saler: "1bc14f8b-8fe8-46bd-9b53-13bffa2db540" }}
              pointOfSales={pointOfSales?.data}
              products={products?.data}
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </StockFormDialog>
          </TabsList>
          <TabsContent value="stock-histories" className="mt-10">
            {activityHistory}
          </TabsContent>
          <TabsContent value="activities">
            Make changes to your activities here.
            {JSON.stringify("", null, 4)}
          </TabsContent>
          <TabsContent value="stocks" className="mt-10">
            {stock}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
