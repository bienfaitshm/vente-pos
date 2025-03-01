"use client";

import { ButtonLoader } from "@/components/button-loader";
import { InvoiceForm } from "@/components/forms/invoice-form";
import { useCommandProduct } from "@/hooks/mutations";
import { SelectClient, SelectProduct } from "@/server/db";
import { Banknote } from "lucide-react";

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
        initialValues={{ saler: "1" }}
        products={products}
        clients={clients}
        onSubmit={mutation.mutateAsync}
      >
        <ButtonLoader
          className="w-full"
          isLoading={mutation.isPending}
          loadingText="Creation de la facture encours...."
        >
          <Banknote />
          Etablir la facture
        </ButtonLoader>
      </InvoiceForm>
    </div>
  );
};
