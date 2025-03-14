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
import { useForm, type HookSafeActionFnSubmiter } from "@/hooks/form";
import {
  LoginCredentialSchemas,
  type LoginCredential,
} from "@/lib/schemas/accounts";

const DEFAULT_VALUES: LoginCredential = { username: "", password: "" };
interface LoginFormProps {
  onSubmit: HookSafeActionFnSubmiter<typeof LoginCredentialSchemas>;
}

export const LoginForm: React.FC<React.PropsWithChildren<LoginFormProps>> = ({
  onSubmit,
  children,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: LoginCredentialSchemas,
    options: {
      formProps: { defaultValues: DEFAULT_VALUES },
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom utilisateur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Mot de passe</FormLabel>
                  </div>

                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {children}
          </div>
        </div>
      </form>
    </Form>
  );
};
