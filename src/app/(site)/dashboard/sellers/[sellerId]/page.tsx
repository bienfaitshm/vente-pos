import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TypographyH2,
  TypographyLarge,
  TypographyLead,
  TypographySmall,
} from "@/components/ui/typography";

import { formatCurrency } from "@/lib/formater";
import {
  ChartNoAxesCombinedIcon,
  Landmark,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { PageProps } from "@/app/type";
import { getSeller, getSellerActivities } from "@/server/actions";

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
        "py-2 pl-2 pr-10 flex items-center gap-4 rounded-xl bg-muted-foreground/5 w-fit",
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
      className={cn("bg-muted-foreground/10 p-2 rounded-full", className)}
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

export default async function Page({
  params,
}: PageProps<{ sellerId: string }>) {
  const { sellerId } = await params;
  const [seller, activities] = await Promise.all([
    getSeller({ sellerId }),
    getSellerActivities({ sellerId }),
  ]);

  const summury = calculateSummary(activities?.data || []);
  return (
    <div className="m-auto max-w-screen-lg space-y-5">
      <div className="flex items-center gap-5">
        <Avatar className="text-white h-28 w-28">
          <AvatarFallback className="h-28 w-28 bg-primary text-lg">
            {seller?.data?.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <TypographyH2>{seller?.data?.name}</TypographyH2>
          <div className="flex items-center gap-5">
            <ItemContainerCardInfo>
              <ItemSubTextCardInfo>Role</ItemSubTextCardInfo>
              <ItemTitleCardInfo>
                {seller?.data?.role === "ADMIN" ? "Administrateur" : "Vandeur"}
              </ItemTitleCardInfo>
            </ItemContainerCardInfo>
            <ItemContainerCardInfo>
              <ItemSubTextCardInfo>Adresse Email</ItemSubTextCardInfo>
              <ItemTitleCardInfo>{seller?.data?.email}</ItemTitleCardInfo>
            </ItemContainerCardInfo>
            <ItemContainerCardInfo>
              <ItemSubTextCardInfo>Tel.</ItemSubTextCardInfo>
              <ItemTitleCardInfo>{seller?.data?.phoneNumber}</ItemTitleCardInfo>
            </ItemContainerCardInfo>
            <ItemContainerCardInfo>
              <ItemSubTextCardInfo>Username</ItemSubTextCardInfo>
              <ItemTitleCardInfo>{seller?.data?.username}</ItemTitleCardInfo>
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
            <TypographyLarge>
              {formatCurrency(summury.totalPrice)}
            </TypographyLarge>
            <ItemActivitySubTextCard>Total vendu</ItemActivitySubTextCard>
          </ItemActivityContentCard>
        </ItemActivityCard>
        <ItemActivityCard>
          <ItemActivityIconContainerCard>
            <ChartNoAxesCombinedIcon className="h-5 w-5" />
          </ItemActivityIconContainerCard>
          <ItemActivityContentCard>
            <TypographyLarge>
              {formatCurrency(summury.totalCommission)}
            </TypographyLarge>
            <ItemActivitySubTextCard>Commissions</ItemActivitySubTextCard>
          </ItemActivityContentCard>
        </ItemActivityCard>
        <ItemActivityCard className="hidden md:flex">
          <ItemActivityIconContainerCard>
            <ShoppingBasket className="h-5 w-5" />
          </ItemActivityIconContainerCard>
          <ItemActivityContentCard>
            <TypographyLarge>{summury.quantitySum}</TypographyLarge>
            <ItemActivitySubTextCard>
              Total produits vendus
            </ItemActivitySubTextCard>
          </ItemActivityContentCard>
        </ItemActivityCard>
      </div>
    </div>
  );
}

type TCalculateSummaryReturn = {
  totalPrice: number;
  totalCommission: number;
  quantitySum: number;
};

function calculateSummary<T extends TCalculateSummaryReturn>(
  items: T[]
): TCalculateSummaryReturn {
  return items.reduce(
    (prev, cur) => ({
      quantitySum: prev.quantitySum + cur.quantitySum,
      totalCommission: prev.totalCommission + cur.totalCommission,
      totalPrice: prev.totalPrice + cur.totalPrice,
    }),
    {
      quantitySum: 0,
      totalCommission: 0,
      totalPrice: 0,
    } as TCalculateSummaryReturn
  );
}
