"use client";
import { ButtonLoader } from "@/components/button-loader";
import { SigninForm } from "@/components/forms/signin-form";
import { useSigninUser } from "@/hooks/mutations";

export const SigninClient = () => {
  const mutation = useSigninUser();
  return (
    <SigninForm onSubmit={mutation.mutateAsync}>
      <ButtonLoader isLoading={mutation.isPending} loadingText="Signin...">
        Signin
      </ButtonLoader>
    </SigninForm>
  );
};
