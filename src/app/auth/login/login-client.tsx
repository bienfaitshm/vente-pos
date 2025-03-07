"use client";
import { ButtonLoader } from "@/components/button-loader";
import { LoginForm } from "@/components/forms/login-form";
import { useLoginUser } from "@/hooks/mutations";
import { useRouter } from "next/navigation";

export const LoginClient = () => {
  const router = useRouter();
  const mutation = useLoginUser({
    onSuccess() {
      router.replace("/");
    },
  });
  return (
    <LoginForm onSubmit={mutation.mutateAsync}>
      <ButtonLoader isLoading={mutation.isPending} loadingText="Login...">
        Login
      </ButtonLoader>
    </LoginForm>
  );
};
