import * as actions from "@/server/actions/account";
import { useMutation } from "@tanstack/react-query";
import type { LoginCredential, RegistrationCredential } from "@/lib/schemas";
import type { ParamsMutation } from "./types";

export function useLoginUser(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.loginUser>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["LOGIN"],
    mutationFn: (value: LoginCredential) => actions.loginUser(value),
    ...params,
  });
}

export function useSigninUser(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.signinUser>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["SIGNIN"],
    mutationFn: (value: RegistrationCredential) => actions.signinUser(value),
    ...params,
  });
}

export function useCreateUser(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.signinUser>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["CREATE_USER"],
    mutationFn: (value: RegistrationCredential) => actions.signinUser(value),
    ...params,
  });
}

export function useUpdateUser(
  params?: ParamsMutation<Awaited<ReturnType<typeof actions.updateSaler>>>
) {
  return useMutation({
    networkMode: "always",
    mutationKey: ["UPDATE_USER"],
    mutationFn: (
      value: Omit<RegistrationCredential, "password" | "confirm">
    ) => {
      console.log(value);
      return actions.updateSaler({ id: "1" });
    },
    ...params,
  });
}
