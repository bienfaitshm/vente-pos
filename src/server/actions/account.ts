"use server";
import { CredentialsSignin, AuthError } from "next-auth";
import { returnValidationErrors } from "next-safe-action";
import {
  LoginCredentialSchemas,
  RegistrationCredentialSchemas,
} from "@/lib/schemas";
import { actionClient } from "./base";
import { createUser } from "../db/queries";
import { hashPassword } from "@/lib/encrypt";
import { signIn } from "@/auth";

export const loginUser = actionClient
  .schema(LoginCredentialSchemas)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      await signIn("credentials", { username, password });
    } catch (e: any) {
      if (e instanceof CredentialsSignin) {
        if (e.code === "invalid_username") {
          returnValidationErrors(LoginCredentialSchemas, {
            username: {
              _errors: ["Invalid username"],
            },
          });
        }
        if (e.code === "invalid_password") {
          returnValidationErrors(LoginCredentialSchemas, {
            password: {
              _errors: ["Invalid password"],
            },
          });
        }
        returnValidationErrors(LoginCredentialSchemas, {
          _errors: [
            "Invalid credentials",
            "Veillez vérifier vos informations ou la connexion internet",
          ],
        });
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
