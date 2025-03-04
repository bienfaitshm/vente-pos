"use server";
import { returnValidationErrors } from "next-safe-action";
import {
  LoginCredentialSchemas,
  RegistrationCredentialSchemas,
} from "@/lib/schemas";
import { actionClient } from "./base";
import { createUser, isEmailExist, isUsernameExist } from "../db/queries";
import { hashPassword } from "@/lib/encrypt";
import { signIn, ErrorCode, AuthError } from "@/auth";
import { redirect } from "next/navigation";

const AUTH_LOGIN_ROUTE = "/auth/login";

export const loginUser = actionClient
  .schema(LoginCredentialSchemas)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      const reponse = await signIn("credentials", {
        username,
        password,
        redirectTo: "/",
        redirect: false,
      });
      if (reponse) return { reponse };
    } catch (e: unknown) {
      if (e instanceof AuthError) {
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
  .action(async ({ parsedInput: { name, email, password, username } }) => {
    //1. check if email exist
    const isExistEmail = await isEmailExist(email);
    if (isExistEmail) {
      returnValidationErrors(RegistrationCredentialSchemas, {
        email: {
          _errors: ["Already exist email"],
        },
      });
    }
    // 2. check if username exist
    const isExistUsername = await isUsernameExist(username);
    if (isExistUsername) {
      returnValidationErrors(RegistrationCredentialSchemas, {
        username: {
          _errors: ["Already exist username", "Please use an another username"],
        },
      });
    }
    // 3. hash password
    const passwordHashed = await hashPassword(password);

    // 4. create new user
    const newUser = await createUser({
      isAdmin: true,
      name,
      email,
      username,
      password: passwordHashed,
    });
    if (newUser) {
      redirect(AUTH_LOGIN_ROUTE);
    }
  });

// export const getSalers = actionClient.schema
