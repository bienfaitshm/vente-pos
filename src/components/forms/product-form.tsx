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
import { type HookSafeActionFnSubmiter, useForm } from "@/hooks/form";
import {
  ProductSchemas,
  type Product,
  type Category,
} from "@/lib/schemas/products";
import { SelectCombobox } from "../fields/select-combobox";

export type TProductDefaultValue = Product;
const DEFAULT_VALUES: TProductDefaultValue = {
  name: "",
  category: "",
  quantity: 0,
  price: 0,
  commission: 10,
};

interface ProductProps {
  onSubmit: HookSafeActionFnSubmiter<typeof ProductSchemas>;
  categories?: Required<Category & { id: string }>[];
  initialValues?: Partial<TProductDefaultValue>;
  isUpdateForm?: boolean;
}

export const ProductForm: React.FC<React.PropsWithChildren<ProductProps>> = ({
  onSubmit,
  children,
  isUpdateForm,
  categories = [],
  initialValues = DEFAULT_VALUES,
}) => {
  const _cats: { label: string; value: string }[] = categories.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: ProductSchemas,
    options: {
      formProps: { defaultValues: { ...DEFAULT_VALUES, ...initialValues } },
      actionProps: {
        onSuccess() {
          form.reset(DEFAULT_VALUES);
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
          <div className="grid grid-cols-3 gap-2">
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
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    La commission en pourcentage
                  </FormDescription>
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
