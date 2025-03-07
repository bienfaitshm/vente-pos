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
