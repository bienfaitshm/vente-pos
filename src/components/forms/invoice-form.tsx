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
  ButtonItemQuantity,
  ProductSelectDialog,
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleOpenInputProductInput}
                    >
                      <PlusCircle />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Ajouter un produit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                    <div className="w-full grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <small>Produit</small>
                        <p className="capitalize">{item.product.name}</p>
                      </div>

                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => {
                          return (
                            <FormItem className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col items-center">
                                <small className="text-center">Quantite</small>
                                {/* Quantity */}
                                <FormControl>
                                  <div className="flex items-center gap-5">
                                    <ButtonItemQuantity
                                      onClick={() =>
                                        field.onChange(field.value - 1)
                                      }
                                      tooltipText="Diminuer la quantite"
                                      icon={<MinusCircle className="h-4 w-4" />}
                                    />
                                    <div>
                                      <p>{field.value}</p>
                                    </div>
                                    <ButtonItemQuantity
                                      onClick={() =>
                                        field.onChange(field.value + 1)
                                      }
                                      tooltipText="Augmenter la quantite"
                                      icon={<PlusCircle className="h-4 w-4" />}
                                    />
                                  </div>
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
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <ButtonItemQuantity
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
