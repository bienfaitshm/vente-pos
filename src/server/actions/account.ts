"use server";
import { returnValidationErrors } from "next-safe-action";
import {
  LoginCredentialSchemas,
  RegistrationCredentialSchemas,
} from "@/lib/schemas";
import { actionClient } from "./base";
import { createUser } from "../db/queries";
import { hashPassword } from "@/lib/encrypt";
import { signIn, ErrorCode, AuthError } from "@/auth";

const valuesError: { [key: string]: any } = {
  [ErrorCode.InvalidUsername]: {
    username: {
      _errors: ["Invalid username"],
    },
  },
  [ErrorCode.InvalidPassword]: {
    password: {
      _errors: ["Invalid password"],
    },
  },
};
export const loginUser = actionClient
  .schema(LoginCredentialSchemas)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      await signIn("credentials", { username, password });
    } catch (e: any) {
      if (e instanceof AuthError) {
        console.log("AuthError", e.code);
        if (e.code === ErrorCode.InvalidUsername) {
          returnValidationErrors(LoginCredentialSchemas, {
            username: {
              _errors: ["ce compte n'existe pas"],
            },
          });
        }
        if (e.code === ErrorCode.InvalidPassword) {
          returnValidationErrors(LoginCredentialSchemas, {
            password: {
              _errors: ["mot de passe incorrect"],
            },
          });
        }

        if (e.code === ErrorCode.InvalidCredentials) {
          returnValidationErrors(LoginCredentialSchemas, {
            password: {
              _errors: ["informations d'identification incorrectes"],
            },
            username: {
              _errors: ["informations d'identification incorrectes"],
            },
          });
        }
      }
    }
  });

export const signinUser = actionClient
  .schema(RegistrationCredentialSchemas)
  .action(
    async ({
      parsedInput: { confirm, name, email, password, username, image },
    }) => {
      await createUser({
        isAdmin: true,
        name,
        email,
        username,
        password: await hashPassword(password),
      });
    }
  );
