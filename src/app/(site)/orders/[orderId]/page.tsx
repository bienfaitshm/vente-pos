import { PageProps } from "@/app/type";
import Invoice from "@/components/invoice";
import { getDefaultStringValue } from "@/lib/formater";
import { getOrderWithDetails } from "@/server/actions";
import { ButtonInvoice } from "./button-invoice";

/**
 * Asynchronous React Server Component that renders the order details page.
 *
 * @param {PageProps<{ orderId: string }>} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters object.
 * @param {string} props.params.orderId - The unique identifier for the order.
 *
 * @returns {Promise<JSX.Element>} A JSX element representing the order details page.
 *
 * @description
 * This component fetches the order details using the provided `orderId` parameter
 * and displays the order information, including an invoice and customer details.
 * It also includes a button to generate an invoice for the order.
 *
 * @example
 * ```tsx
 * // Example usage in a route:
 * <Page params={{ orderId: "12345" }} />
 * ```
 *
 * @remarks
 * - The `getOrderWithDetails` function is used to fetch the order data.
 * - The `Invoice` component is used to display the order details in a structured format.
 * - Utility functions like `getDefaultStringValue` are used to handle optional or missing data gracefully.
 *
 * @component
 */
export default async function Page({ params }: PageProps<{ orderId: string }>) {
  const { orderId } = await params;
  const order = await getOrderWithDetails({ orderId });
  return (
    <div className="max-w-screen-lg mx-auto space-y-5">
      {/*  */}
      <ButtonInvoice orderId={orderId} />
      <div className="lg:p-8 bg-muted-foreground/10 flex items-center justify-center">
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
