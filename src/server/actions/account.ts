"use server";

import {
  LoginCredentialSchemas,
  RegistrationCredentialSchemas,
} from "@/lib/schemas";
import { actionClient } from "./base";

export const loginUser = actionClient
  .schema(LoginCredentialSchemas)
  .action(async ({ parsedInput: { username, password } }) => {
    if (username === "johndoe" && password === "123456") {
      return {
        success: "Successfully logged in",
      };
    }

    return { failure: "Incorrect credentials" };
  });

export const signinUser = actionClient
  .schema(RegistrationCredentialSchemas)
  .action(async ({ parsedInput: { username, password } }) => {
    if (username === "johndoe" && password === "123456") {
      return {
        success: "Successfully logged in",
      };
    }

    return { failure: "Incorrect credentials" };
  });
