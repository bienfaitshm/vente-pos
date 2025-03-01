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
import { PlusCircle, UserRoundPlus, X } from "lucide-react";
import { SelectClient, SelectProduct } from "@/server/db";
import { ClientInput } from "../fields/client-input";
import { Separator } from "../ui/separator";
import {
  ButtonAddProduct,
  ItemProductSelect,
  ItemQuantityInput,
} from "../fields/item-quatity-input";
import { Input } from "../ui/input";
import { Control, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";

export type TInvoiceDefaultValue = Invoice;
const defaultValues: Partial<TInvoiceDefaultValue> = {
  items: [],
  client: null,
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

const InvoiceFormFields: React.FC<
  InvoicePropsWithForm & {
    products?: SelectProduct[];
    clients?: SelectClient[];
  }
> = ({ form, products = [], clients = [] }) => {
  const arrayFields = useFieldArray({
    control: form.control,
    name: "items",
  });

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
            <FormMessage />
            <FormDescription>
              <span>
                Pour sélectionner un client existant, choisissez-le dans la
                liste ci-dessous. Si vous souhaitez ajouter un nouveau client,
                veuillez cliquer sur le bouton
              </span>
              <UserRoundPlus className="h-3 w-3 inline-flex mb-2" />
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="items"
        render={() => (
          <FormItem>
            <FormLabel>Produits</FormLabel>
            <FormDescription>
              Pour ajouter un produit, cliquez sur le bouton{" "}
              <PlusCircle className="h-3 w-3 inline-flex" />. Une fois le
              produit ajouté, vous pourrez modifier la quantité souhaitée.
            </FormDescription>
            <div>
              <FormControl>
                <div className="space-y-2">
                  {arrayFields.fields.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`items.${index}`}
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <ProductQuantityInput
                              control={form.control}
                              index={index}
                              products={products}
                              onRemove={() => {
                                arrayFields.remove(index);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <ButtonAddProduct
                    onChange={() =>
                      arrayFields.append({ product: null, quantity: 0 })
                    }
                  />
                </div>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const ProductQuantityInput: React.FC<{
  control: Control<TInvoiceDefaultValue, unknown>;
  products: SelectProduct[];
  index: number;
  onRemove?: () => void;
}> = ({ control, index, products, onRemove }) => {
  return (
    <ItemQuantityInput>
      <div className="w-full grid grid-cols-3 gap-2 mr-5">
        <FormField
          control={control}
          name={`items.${index}.product`}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-xs text-muted-foreground">
                Produit
              </FormLabel>
              <FormControl>
                <ItemProductSelect
                  products={products}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Quantité
              </FormLabel>
              <FormControl>
                <Input className="text-sm h-8" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              className="h-7 w-7 rounded-full absolute right-1 top-1"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Retirer de la liste</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ItemQuantityInput>
  );
};

const InvoiceSummary: React.FC<InvoicePropsWithForm> = ({}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center bg-primary text-muted p-4 rounded-md">
        <h1 className="text-lg">Sommaire</h1>
      </div>
      <div className="text-xs">
        <div className="grid grid-cols-11 gap-2">
          <p className="col-span-1">1</p>
          <p className="col-span-2">Quantité</p>
          <p className="col-span-4">Désignation</p>
          <p className="col-span-2">PU</p>
          <p className="col-span-2">Total</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border rounded-md p-2 text-sm capitalize">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Sous total</p>
          <p className="font-black">20FC</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Taxe</p>
          <p className="font-black">20FC</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Total</p>
          <p className="font-black">1220FC</p>
        </div>
      </div>
    </div>
  );
};

export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({ onSubmit, children, initialValues, products = [], clients = [] }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: InvoiceSchemas,
    options: {
      formProps: { defaultValues: { ...defaultValues, ...initialValues } },
      actionProps: {
        onSuccess(response) {
          console.log({ response });
          // form.reset(defaultValues);
        },
      },
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction}>
          <div className="grid md:grid-cols-5 gap-28">
            <div className="col-span-3">
              <InvoiceFormFields
                clients={clients}
                products={products}
                form={form}
              />
            </div>
            <div className="col-span-2 space-y-5">
              <InvoiceSummary form={form} />
              {children}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
