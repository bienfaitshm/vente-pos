"use client";
import { ButtonLoader } from "@/components/button-loader";
import { LoginForm } from "@/components/forms/login-form";
import { useLoginUser } from "@/hooks/mutations";
import type { LoginCredential } from "@/lib/schemas";

export const LoginClient = () => {
  const mutation = useLoginUser();
  const handlerSubmit = (value: LoginCredential) => {
    mutation.mutate(value, {
      onSuccess: (value) => {
        console.log("Login success", value);
      },
      onError: (error) => {
        console.log("Login failed", error);
      },
    });
  };
  return (
    <LoginForm onSubmit={handlerSubmit}>
      <ButtonLoader loadingText="Login...">Login</ButtonLoader>
    </LoginForm>
  );
};
