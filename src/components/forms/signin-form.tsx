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
  RegistrationCredentialSchemas,
  type RegistrationCredential,
} from "@/lib/schemas/accounts";

const DEFAULT_VALUES: RegistrationCredential = {
  username: "",
  password: "",
  confirm: "",
  email: "",
  name: "",
  phoneNumber: "",
  role: "ADMIN",
};
interface SigninProps {
  onSubmit: HookSafeActionFnSubmiter<typeof RegistrationCredentialSchemas>;
  showPassword?: boolean;
  defaultValues?: Partial<RegistrationCredential>;
}

export const SigninForm: React.FC<React.PropsWithChildren<SigninProps>> = ({
  onSubmit,
  children,
  showPassword,
  defaultValues,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: RegistrationCredentialSchemas,
    options: {
      formProps: { defaultValues: { ...DEFAULT_VALUES, ...defaultValues } },
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
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tel.</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>

            {showPassword && (
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
            )}
            {showPassword && (
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Confirmation mot de passe</FormLabel>
                    </div>

                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {children}
          </div>
        </div>
      </form>
    </Form>
  );
};
