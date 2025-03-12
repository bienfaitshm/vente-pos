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
import { useForm, HookSafeActionFnSubmiter } from "@/hooks/form";
import { CategorySchemas, type Category } from "@/lib/schemas/products";

export type TCategoryDefaultValue = Category;
const DEFAULT_VALUES: TCategoryDefaultValue = {
  name: "",
};
interface CategoryProps {
  onSubmit: HookSafeActionFnSubmiter<typeof CategorySchemas>;
  initialValues?: Partial<TCategoryDefaultValue>;
}

export const CategoryForm: React.FC<React.PropsWithChildren<CategoryProps>> = ({
  onSubmit,
  children,
  initialValues = DEFAULT_VALUES,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: CategorySchemas,
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
          {children}
        </div>
      </form>
    </Form>
  );
};
