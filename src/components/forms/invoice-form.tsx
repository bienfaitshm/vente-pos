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
import { type HookSafeActionFnSubmiter, useForm } from "@/hooks/form";
import { CategorySchemas, type Category } from "@/lib/schemas";

export type TCategoryDefaultValue = Category;
const defaultValues: TCategoryDefaultValue = {
  name: "",
};
interface InvoiceFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof CategorySchemas>;
  initialValues?: Partial<TCategoryDefaultValue>;
}

export const InvoiceForm: React.FC<
  React.PropsWithChildren<InvoiceFormProps>
> = ({ onSubmit, children, initialValues = defaultValues }) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: CategorySchemas,
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
          {children}
        </div>
      </form>
    </Form>
  );
};
