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
import { LoginCredentialSchemas, type LoginCredential } from "@/lib/schemas";
import { HookSafeActionFn } from "next-safe-action/hooks";
import Link from "next/link";
import { ZodType, ZodTypeDef } from "zod";

const defaultValues: LoginCredential = { username: "", password: "" };
interface LoginFormProps {
  onSubmit: HookSafeActionFn<
    unknown,
    typeof LoginCredentialSchemas,
    readonly ZodType<unknown, ZodTypeDef, unknown>[],
    unknown,
    unknown,
    unknown
  >;
}

export const LoginForm: React.FC<React.PropsWithChildren<LoginFormProps>> = ({
  onSubmit,
  children,
}) => {
  const { form, handleSubmitWithAction } = useForm({
    action: onSubmit,
    schemas: LoginCredentialSchemas,
    options: {
      formProps: { defaultValues },
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
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
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
