"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useForm, type HookSafeActionFnSubmiter } from "@/hooks/form";
import { StockSchemas, type Stock } from "@/lib/schemas/activities";
import { PlusCircleIcon } from "lucide-react";

const DEFAULT_VALUE: Partial<Stock> = { action: "ADD", quantity: 0 };
export interface StockFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof StockSchemas>;
  defaultValues?: Partial<Stock>;
  type?: "UPDATE" | "CREATE";
  pointOfSales?: { id: string; name: string }[];
  products?: { id: string; name: string }[];
}

/**
 * A React functional component that renders a stock management form.
 * This form allows users to perform actions such as adding or removing products
 * from stock, selecting a point of sale, and specifying product quantities.
 *
 * @component
 * @param {Object} props - The props for the StockForm component.
 * @param {function} props.onSubmit - Callback function triggered when the form is submitted.
 * @param {React.ReactNode} [props.children] - Optional child components to render within the form.
 * @param {Object} [props.defaultValues] - Default values for the form fields.
 * @param {"CREATE" | "UPDATE"} [props.type="CREATE"] - The type of form operation, either "CREATE" or "UPDATE".
 * @param {Array<{ id: string; name: string }>} [props.pointOfSales=[]] - List of available points of sale.
 * @param {Array<{ id: string; name: string }>} [props.products=[]] - List of available products.
 *
 * @returns {JSX.Element} The rendered StockForm component.
 *
 * @example
 * ```tsx
 * <StockForm
 *   onSubmit={(data) => console.log(data)}
 *   defaultValues={{ action: "ADD", quantity: 10 }}
 *   pointOfSales={[{ id: "1", name: "Store A" }]}
 *   products={[{ id: "101", name: "Product X" }]}
 * >
 *   <button type="submit">Submit</button>
 * </StockForm>
 * ```
 */
export const StockForm: React.FC<React.PropsWithChildren<StockFormProps>> = ({
  onSubmit,
  children,
  defaultValues,
  type = "CREATE",
  pointOfSales = [],
  products = [],
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: StockSchemas,
    options: {
      formProps: { defaultValues: { ...defaultValues, ...DEFAULT_VALUE } },
      actionProps: {
        onSuccess() {
          form.reset(DEFAULT_VALUE);
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
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action Produit</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem
                      value="ADD"
                      className="h-20 w-full rounded-xl"
                    >
                      <PlusCircleIcon />
                      <span>Ajouts</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="REMOVE"
                      className="h-20 w-full rounded-xl"
                    >
                      Retrait
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormDescription>
                  « Ajouts » sert à faire entrer des produits dans votre stock,
                  tandis que « Retraits » sert à en faire sortir.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="posId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point de ventes</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Point de vente" />
                      </SelectTrigger>
                      <SelectContent>
                        {pointOfSales.map((pos) => (
                          <SelectItem key={pos.id} value={pos.id}>
                            {pos.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produits</FormLabel>
                  <FormControl>
                    <Select
                      disabled={type === "UPDATE"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Selectionne le produit" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((pos) => (
                          <SelectItem key={pos.id} value={pos.id}>
                            {pos.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantites</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
