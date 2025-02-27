"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type HookSafeActionFnSubmiter,
  TFormReturn,
  useForm,
} from "@/hooks/form";
import { InvoiceSchemas, type Invoice } from "@/lib/schemas";
import React from "react";
import { PlusCircle, UserRoundPlus, X } from "lucide-react";
import {
  ButtonTooltip,
  ProductDisplay,
  ProductDisplayContent,
  ProductDisplayTitle,
  ProductSelectDialog,
  QuantityIncreaser,
  useProductSelectDialog,
} from "../fields/product-item-input";
import { SelectClient, SelectProduct } from "@/server/db";
import { formatCurrency } from "@/lib/formater";
import { ClientInput } from "../fields/client-input";

export type TInvoiceDefaultValue = Invoice;
const defaultValues: TInvoiceDefaultValue = {
  client: null,
  items: [],
  saler: 1,
};
interface InvoiceFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof InvoiceSchemas>;
  initialValues?: Partial<TInvoiceDefaultValue>;
  products?: SelectProduct[];
  clients?: SelectClient[];
}

interface InvoicePropsWithForm {
  form: TFormReturn<typeof InvoiceSchemas>;
}

/**
 *
 * @param param0
 * @returns
 */
const InputInvoiceForm: React.FC<
  InvoicePropsWithForm & {
    products?: SelectProduct[];
    clients?: SelectClient[];
  }
> = ({ form, products = [], clients = [] }) => {
  const productSelectDialogRef = useProductSelectDialog();
  const handleOpenInputProductInput = () => {
    productSelectDialogRef.current?.openDialog();
  };
  console.log({ clients });
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="client"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Client</FormLabel>
            <FormControl>
              <ClientInput
                clients={clients}
                value={field.value as SelectClient}
                onChange={field.onChange}
              />
            </FormControl>
            <FormDescription>
              <span>
                {" "}
                Pour sélectionner un client existant, choisissez-le dans la
                liste ci-dessous. Si vous souhaitez ajouter un nouveau client,
                veuillez cliquer sur le bouton
              </span>{" "}
              <UserRoundPlus className="h-3 w-3 inline-flex mb-2" />
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="items"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Produit</FormLabel>
              <ButtonTooltip
                icon={<PlusCircle />}
                tooltipText="Ajouter de produits"
                onClick={handleOpenInputProductInput}
              />
            </div>
            <FormDescription>
              Pour ajouter un produit, cliquez sur le bouton{" "}
              <PlusCircle className="h-3 w-3 inline-flex" />. Une fois le
              produit ajouté, vous pourrez modifier la quantité souhaitée.
            </FormDescription>
            <div>
              <FormControl>
                <ProductSelectDialog
                  ref={productSelectDialogRef}
                  products={products}
                  items={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-2">
                {field.value.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="p-2 rounded-md border flex items-center justify-between"
                  >
                    <div className="w-full grid grid-cols-3 gap-2 mr-5">
                      <ProductDisplay>
                        <ProductDisplayTitle>Produit</ProductDisplayTitle>
                        <ProductDisplayContent>
                          {item.product.name}
                        </ProductDisplayContent>
                      </ProductDisplay>
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => {
                          return (
                            <FormItem className="col-span-2">
                              {/* Quantity */}
                              <div className="flex flex-row justify-between">
                                <ProductDisplay className="items-center">
                                  <ProductDisplayTitle>
                                    Quantite
                                  </ProductDisplayTitle>
                                  <FormControl>
                                    <QuantityIncreaser
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                </ProductDisplay>
                                <ProductDisplay className="items-end">
                                  <ProductDisplayTitle>
                                    Prix total
                                  </ProductDisplayTitle>
                                  <ProductDisplayContent>
                                    {formatCurrency(
                                      item.product.price * field.value
                                    )}
                                  </ProductDisplayContent>
                                </ProductDisplay>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <ButtonTooltip
                      onClick={() => {
                        const newArray = field.value.filter(
                          (_item) => _item.product.id !== item.product.id
                        );
                        field.onChange(newArray);
                      }}
                      tooltipText="Retirer de la selection"
                      icon={<X className="h-4 w-4" />}
                    />
                  </div>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const InvoiceFormReviewView: React.FC<InvoicePropsWithForm> = ({}) => {
  return (
    <div>
      <h1>Somaire</h1>
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({
  onSubmit,
  children,
  initialValues = defaultValues,
  products = [],
  clients = [],
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: InvoiceSchemas,
    options: {
      formProps: { defaultValues: initialValues },
      actionProps: {
        onSuccess() {
          form.reset(defaultValues);
        },
      },
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="col-span-2">
            <InputInvoiceForm
              clients={clients}
              products={products}
              form={form}
            />
          </div>
          <div className="col-span-1">
            <InvoiceFormReviewView form={form} />
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
};
