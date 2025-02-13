"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/form";
import {
  ProductQuantitySchemas,
  type Product,
  type ProductQuantity,
} from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import { ZodType, ZodTypeDef } from "zod";
import { Textarea } from "../ui/textarea";

const defaultValues: Omit<ProductQuantity, "product"> = {
  quantity: 0,
  reason: "",
};

interface ProductQuantityProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof ProductQuantitySchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  product: Required<Product>;
}

export const ProductQuantityForm: React.FC<
  React.PropsWithChildren<ProductQuantityProps>
> = ({ onSubmit, children, product }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: ProductQuantitySchemas,
    options: { formProps: { defaultValues: { ...defaultValues, product } } },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produit</FormLabel>
                <FormControl>
                  <h1>{field.value.name}</h1>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantite</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix unitaire</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}
        </div>
      </form>
    </Form>
  );
};
