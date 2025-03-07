"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  RegistrationCredentialSchemas,
  type RegistrationCredential,
} from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import Link from "next/link";
import { ZodType, ZodTypeDef } from "zod";

const defaultValues: RegistrationCredential = {
  username: "",
  password: "",
  confirm: "",
  email: "",
  name: "",
};
interface SigninProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof RegistrationCredentialSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
}

export const SigninForm: React.FC<React.PropsWithChildren<SigninProps>> = ({
  onSubmit,
  children,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: RegistrationCredentialSchemas,
    options: { formProps: { defaultValues } },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Creation compte admin</CardTitle>
              <CardDescription>
                Enter your email and username below to create to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                {children}
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
