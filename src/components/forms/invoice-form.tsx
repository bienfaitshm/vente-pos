"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  type HookSafeActionFnSubmiter,
  TFormReturn,
  useForm,
} from "@/hooks/form";
import { InvoiceSchemas, type Invoice } from "@/lib/schemas";
import React from "react";
import { Button } from "../ui/button";
import { MinusCircle, PlusCircle, X } from "lucide-react";
import {
  ButtonTooltip,
  ProductSelectDialog,
  QuantityIncreaser,
  useProductSelectDialog,
} from "../fields/product-item-input";
import { SelectProduct } from "@/server/db";
import { useFieldArray } from "react-hook-form";
import { formatCurrency } from "@/lib/formater";

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
  InvoicePropsWithForm & { products?: SelectProduct[] }
> = ({ form, products = [] }) => {
  const productSelectDialogRef = useProductSelectDialog();
  const arrayAction = useFieldArray({
    control: form.control,
    name: "items",
  });
  const handleOpenInputProductInput = () => {
    productSelectDialogRef.current?.openDialog();
  };
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="client"
        render={({}) => (
          <FormItem>
            <FormLabel>Client</FormLabel>
            <FormControl>
              {/* <Input {...field} /> */}
              <h1>Input client</h1>
            </FormControl>
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
            <div>
              <ProductSelectDialog
                ref={productSelectDialogRef}
                products={products}
                items={field.value}
                onChange={field.onChange}
              />
              <div className="space-y-2">
                {field.value.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="p-2 rounded-md border flex items-center justify-between"
                  >
                    <div className="w-full grid grid-cols-3 gap-2 ">
                      <div className="col-span-1">
                        <small>Produit</small>
                        <p className="capitalize">{item.product.name}</p>
                      </div>

                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => {
                          return (
                            <FormItem className="col-span-2">
                              {/* Quantity */}
                              <div className="grid grid-cols-2 gap-2 bg-yellow-300">
                                <div>
                                  <small className="text-center">
                                    Quantite
                                  </small>
                                  <FormControl>
                                    <QuantityIncreaser
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                </div>
                                <div>
                                  <small>Prix total</small>
                                  <div>
                                    {formatCurrency(
                                      item.product.price * field.value
                                    )}
                                  </div>
                                </div>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <ButtonTooltip
                      onClick={() => arrayAction.remove(index)}
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
> = ({ onSubmit, children, initialValues = defaultValues, products = [] }) => {
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
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <InputInvoiceForm products={products} form={form} />
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
