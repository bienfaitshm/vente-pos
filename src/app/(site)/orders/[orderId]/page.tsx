import { PageProps } from "@/app/type";
import Invoice from "@/components/invoice";
import { Button } from "@/components/ui/button";
import { getDefaultStringValue } from "@/lib/formater";
import { getOrderWithDetails } from "@/server/actions";
import { DownloadCloudIcon, Share2Icon } from "lucide-react";

export default async function Page({ params }: PageProps<{ orderId: string }>) {
  const { orderId } = await params;
  const order = await getOrderWithDetails({ orderId });
  return (
    <div className="max-w-screen-lg mx-auto space-y-5">
      <div className="flex items-center justify-end gap-4">
        <Button className="rounded-full">
          <Share2Icon />
          <span>Partager</span>
        </Button>
        <Button className="rounded-full">
          <DownloadCloudIcon />
          <span>Telecharger la facture</span>
        </Button>
      </div>
      <div className="p-4 lg:p-8 bg-muted-foreground/10 flex items-center justify-center">
        {order?.data && (
          <Invoice
            details={order?.data?.orderDetails || []}
            order={{
              orderNumber: getDefaultStringValue(order?.data?.id),
              totalAmount: order.data.totalAmount,
              subTotalAmount: order.data.totalAmount,
              date: order.data.createdAt || new Date(),
            }}
            customer={{
              name: getDefaultStringValue(order.data.name),
              address: getDefaultStringValue(order.data.address),
              phoneNumber: getDefaultStringValue(order.data.phoneNumber),
              email: getDefaultStringValue(order.data.email),
            }}
          />
        )}
      </div>
    </div>
  );
}
