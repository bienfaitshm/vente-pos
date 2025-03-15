"use client";
import { ButtonLoader } from "@/components/button-loader";
import { SigninForm } from "@/components/forms/signin-form";
import { useSigninUser } from "@/hooks/mutations/accounts";
import { redirect } from "next/navigation";

export const SigninClient = () => {
  const mutation = useSigninUser({
    onSuccess(reponse) {
      if (reponse?.data) {
        redirect("/auth/login");
      }
    },
  });
  return (
    <SigninForm showPassword={true} onSubmit={mutation.mutateAsync}>
      <ButtonLoader isLoading={mutation.isPending} loadingText="Signin...">
        Signin
      </ButtonLoader>
    </SigninForm>
  );
};
