"use client";
import { ButtonLoader } from "@/components/button-loader";
import { SigninForm } from "@/components/forms/signin-form";
import { useSigninUser } from "@/hooks/mutations";
import type { RegistrationCredential } from "@/lib/schemas";

export const SigninClient = () => {
  const mutation = useSigninUser();
  const handlerSubmit = (value: RegistrationCredential) => {
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
    <SigninForm onSubmit={handlerSubmit}>
      <ButtonLoader loadingText="Login...">Login</ButtonLoader>
    </SigninForm>
  );
};
