"use client";
import { ButtonLoader } from "@/components/button-loader";
import { LoginForm } from "@/components/forms/login-form";
import { useLoginUser } from "@/hooks/mutations";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginClient = () => {
  const router = useRouter();
  const mutation = useLoginUser({
    onSuccess() {
      router.replace("/");
    },
  });
  return (
    <div>
      <LoginForm onSubmit={mutation.mutateAsync}>
        <ButtonLoader isLoading={mutation.isPending} loadingText="Login...">
          Login
        </ButtonLoader>
      </LoginForm>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signin" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
};
