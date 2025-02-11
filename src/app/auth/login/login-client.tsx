"use client";
import { ButtonLoader } from "@/components/button-loader";
import { LoginForm } from "@/components/forms/login-form";

export const LoginClient = () => {
  return (
    <LoginForm>
      <ButtonLoader loadingText="Login...">Login</ButtonLoader>
    </LoginForm>
  );
};
