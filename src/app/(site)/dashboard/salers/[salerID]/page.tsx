import { DatePickerWithPresets } from "@/components/calendar-preset";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TypographyH2,
  TypographyH3,
  TypographyLarge,
  TypographyLead,
  TypographySmall,
} from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatCurrency } from "@/lib/formater";
import {
  Activity,
  ChartNoAxesCombinedIcon,
  HistoryIcon,
  Landmark,
  PencilIcon,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StockFormDialog } from "@/components/dialogs/stock-form-dialog";

const ItemContainerCardInfo: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return <div className={cn("flex flex-col", className)} {...props} />;
};

const ItemTitleCardInfo: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TypographyLead className="text-sm text-inherit">{children}</TypographyLead>
  );
};

const ItemSubTextCardInfo: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <TypographySmall className="text-muted-foreground text-xs">
      {children}
    </TypographySmall>
  );
};

//

const ItemActivityCard: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "py-2 pl-2 pr-10 flex items-center gap-4 rounded-xl bg-muted-foreground/10 w-fit",
        className
      )}
      {...props}
    />
  );
};

const ItemActivityIconContainerCard: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={cn("bg-muted-foreground/20 p-2 rounded-full", className)}
      {...props}
    />
  );
};

const ItemActivityContentCard: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return <div className={cn("flex flex-col", className)} {...props} />;
};

const ItemActivitySubTextCard: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <TypographySmall className="text-muted-foreground text-xs">
      {children}
    </TypographySmall>
  );
};
//

const arrs = new Array(10).fill(0).map((_, index) => index);
export default async function Page(params: unknown) {
  const value = await params;
  return (
    <div className="m-auto max-w-screen-lg space-y-5">
      <div className="p-4 bg-muted rounded-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-primary pl-3">
            <TypographyH3>Detail Vendeur</TypographyH3>
          </div>
          <DatePickerWithPresets />
        </div>
        <div className="flex items-center gap-5">
          <Avatar className="text-white h-28 w-28">
            <AvatarFallback className="h-28 w-28 bg-primary">V</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <TypographyH2>Bienfait shomari</TypographyH2>
            <div className="flex items-center gap-5">
              <ItemContainerCardInfo>
                <ItemSubTextCardInfo>Role</ItemSubTextCardInfo>
                <ItemTitleCardInfo>Vendeur</ItemTitleCardInfo>
              </ItemContainerCardInfo>
              <ItemContainerCardInfo>
                <ItemSubTextCardInfo>Adresse Email</ItemSubTextCardInfo>
                <ItemTitleCardInfo>bienfaitshm@gmail.com</ItemTitleCardInfo>
              </ItemContainerCardInfo>
              <ItemContainerCardInfo>
                <ItemSubTextCardInfo>Username</ItemSubTextCardInfo>
                <ItemTitleCardInfo>bienfaitshm</ItemTitleCardInfo>
              </ItemContainerCardInfo>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ItemActivityCard>
            <ItemActivityIconContainerCard>
              <Landmark className="h-5 w-5" />
            </ItemActivityIconContainerCard>
            <ItemActivityContentCard>
              <TypographyLarge>{formatCurrency(309)}</TypographyLarge>
              <ItemActivitySubTextCard>Total vendu</ItemActivitySubTextCard>
            </ItemActivityContentCard>
          </ItemActivityCard>
          <ItemActivityCard>
            <ItemActivityIconContainerCard>
              <ChartNoAxesCombinedIcon className="h-5 w-5" />
            </ItemActivityIconContainerCard>
            <ItemActivityContentCard>
              <TypographyLarge>{formatCurrency(1500)}</TypographyLarge>
              <ItemActivitySubTextCard>Commissions</ItemActivitySubTextCard>
            </ItemActivityContentCard>
          </ItemActivityCard>
          <ItemActivityCard className="hidden md:flex">
            <ItemActivityIconContainerCard>
              <ShoppingBasket className="h-5 w-5" />
            </ItemActivityIconContainerCard>
            <ItemActivityContentCard>
              <TypographyLarge>40</TypographyLarge>
              <ItemActivitySubTextCard>
                Total produits vendus
              </ItemActivitySubTextCard>
            </ItemActivityContentCard>
          </ItemActivityCard>
        </div>
      </div>
      <div className="p-4 bg-muted rounded-xl">
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="flex items-center justify-between">
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
            <StockFormDialog>
              <Button variant="outline" size="icon" className="rounded-full">
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </StockFormDialog>
          </TabsList>
          <TabsContent value="activities">
            Make changes to your activities here.
            {JSON.stringify(value, null, 4)}
          </TabsContent>
          <TabsContent value="stocks" className="mt-10">
            <div className="grid gap-2 md:grid-cols-4 md:gap-4">
              {arrs.map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-3 rounded-xl bg-muted-foreground/10"
                >
                  <div className="flex items-center justify-between">
                    <TypographySmall className="text-muted-foreground text-xs">
                      Product Name
                    </TypographySmall>
                    <Badge className="text-xs rounded-full">Enstock</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <TypographyH3>90</TypographyH3>
                    <StockFormDialog type="UPDATE">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </StockFormDialog>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
