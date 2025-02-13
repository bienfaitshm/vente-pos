"use client";
import { ButtonLoader } from "@/components/button-loader";
import { LoginForm } from "@/components/forms/login-form";
import { useLoginUser } from "@/hooks/mutations";

export const LoginClient = () => {
  const mutation = useLoginUser();
  return (
    <LoginForm onSubmit={mutation.mutateAsync}>
      <ButtonLoader isLoading={mutation.isPending} loadingText="Login...">
        Login
      </ButtonLoader>
    </LoginForm>
  );
};
