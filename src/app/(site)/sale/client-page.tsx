"use client";

import { ButtonLoader } from "@/components/button-loader";
import { OrderForm } from "@/components/forms/order-form";
import { usePlaceOrder } from "@/hooks/mutations";
import { SelectCustomer, SelectProduct } from "@/server/db";
import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";

interface SaleClientPageProps {
  products?: SelectProduct[];
  customers?: SelectCustomer[];
  sellerId: string;
}

/**
 * SaleClientPage component is responsible for rendering the order form
 * and handling the submission of an order. It integrates with the
 * `usePlaceOrder` mutation to process the order asynchronously.
 *
 * @param {SaleClientPageProps} props - The props for the component.
 * @param {Product[]} props.products - The list of products available for the order.
 * @param {Customer[]} props.customers - The list of customers to select from.
 * @param {string} props.sellerId - The ID of the seller placing the order.
 *
 * @returns {JSX.Element} The rendered SaleClientPage component.
 *
 * @remarks
 * - The `OrderForm` component is used to collect order details and customer information.
 * - The `ButtonLoader` component provides a loading state while the order is being processed.
 * - The `usePlaceOrder` hook is used to handle the order placement logic.
 *
 * @example
 * ```tsx
 * <SaleClientPage
 *   products={productList}
 *   customers={customerList}
 *   sellerId="seller123"
 * />
 * ```
 */
export const SaleClientPage: React.FC<SaleClientPageProps> = ({
  products,
  customers,
  sellerId,
}) => {
  const route = useRouter();

  const mutation = usePlaceOrder({
    onSuccess(reponse) {
      console.log(reponse);
      if (reponse?.data) {
        route.push(`/orders/${reponse.data.order.id}`);
      }
    },
    onError(error) {
      console.log({ error });
    },
  });
  return (
    <OrderForm
      products={products}
      customers={customers}
      onSubmit={({ customerId, orderDetails }) =>
        mutation.mutateAsync({
          sellerId,
          customerId,
          orderDetails,
        })
      }
    >
      <ButtonLoader
        className="w-full"
        isLoading={mutation.isPending}
        loadingText="Creation de la facture encours...."
      >
        <Banknote />
        Etablir la facture
      </ButtonLoader>
    </OrderForm>
  );
};
