"use client";

import { InvoiceForm } from "@/components/forms/invoice-form";
import { useCommandProduct } from "@/hooks/mutations";
import { SelectClient, SelectProduct } from "@/server/db";

interface SaleClientPageProps {
  products?: SelectProduct[];
  clients?: SelectClient[];
}

export const SaleClientPage: React.FC<SaleClientPageProps> = ({
  products,
  clients,
}) => {
  const mutation = useCommandProduct();
  return (
    <div>
      <InvoiceForm
        products={products}
        clients={clients}
        onSubmit={mutation.mutateAsync}
      />
    </div>
  );
};
