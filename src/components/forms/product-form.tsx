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
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/form";
import { ProductSchemas, type Product, type Category } from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import { ZodType, ZodTypeDef } from "zod";
import { SelectCombobox } from "../fields/select-combobox";

export type TProductDefaultValue = Product;
const defaultValues: TProductDefaultValue = {
  name: "",
  category: "",
  quantity: 0,
  price: 0,
};

interface ProductProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof ProductSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
  categories?: Required<Category>[];
  initialValues?: TProductDefaultValue;
  isUpdateForm?: boolean;
}

export const ProductForm: React.FC<React.PropsWithChildren<ProductProps>> = ({
  onSubmit,
  children,
  isUpdateForm,
  categories = [],
  initialValues = defaultValues,
}) => {
  const _cats: { label: string; value: string | number }[] = categories.map(
    (item) => ({
      label: item.name,
      value: item.id,
    })
  );
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: ProductSchemas,
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
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorie</FormLabel>
                <FormControl>
                  <SelectCombobox
                    selections={_cats}
                    value={field.value}
                    onChangeValue={field.onChange}
                    placeholder="Choisir une cat...."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantite</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isUpdateForm} {...field} />
                  </FormControl>
                  <FormDescription>Quantites du stock</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix unitaire</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {children}
        </div>
      </form>
    </Form>
  );
};
