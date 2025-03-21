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
import { ProductSchemas, type Product } from "@/lib/schemas/products";
import { SelectCombobox } from "../fields/select-combobox";
import { Textarea } from "../ui/textarea";

export type TProductDefaultValue = Product;
const DEFAULT_VALUES: TProductDefaultValue = {
  name: "",
  categoryId: "",
  quantity: 0,
  unitPrice: 0,
  commission: 10,
  description: "",
};

interface ProductProps {
  onSubmit: HookSafeActionFnSubmiter<typeof ProductSchemas>;
  categories?: Required<{ id: string; name: string }>[];
  initialValues?: Partial<TProductDefaultValue>;
  isUpdateForm?: boolean;
}

/**
 * ProductForm Component
 *
 * A reusable form component for managing product data. This component is designed to handle both
 * creation and update operations for products. It integrates with a custom `useForm` hook for
 * form state management and validation.
 *
 * @component
 * @template ProductProps
 * @param {Object} props - The props object.
 * @param {(data: any) => void} props.onSubmit - Callback function triggered when the form is submitted.
 * @param {React.ReactNode} [props.children] - Optional child components to render within the form.
 * @param {boolean} props.isUpdateForm - Indicates whether the form is in update mode. If true, certain fields (e.g., quantity) are disabled.
 * @param {Array<{ name: string; id: string }>} [props.categories=[]] - List of categories to populate the category selection dropdown.
 * @param {Object} [props.initialValues=DEFAULT_VALUES] - Initial values for the form fields. Defaults to `DEFAULT_VALUES`.
 *
 * @returns {React.ReactElement} The rendered ProductForm component.
 *
 * @example
 * ```tsx
 * const categories = [
 *   { name: "Electronics", id: "1" },
 *   { name: "Clothing", id: "2" },
 * ];
 *
 * const handleSubmit = (data) => {
 *   console.log("Form submitted:", data);
 * };
 *
 * <ProductForm
 *   onSubmit={handleSubmit}
 *   isUpdateForm={false}
 *   categories={categories}
 *   initialValues={{ name: "Laptop", quantity: 10 }}
 * >
 *   <button type="submit">Submit</button>
 * </ProductForm>
 * ```
 */
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
            name="categoryId"
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
              name="unitPrice"
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
                    La commission en pourcentage (%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
