"use server";
import { returnValidationErrors } from "next-safe-action";
import {
  LoginCredentialSchemas,
  RegistrationCredentialSchemas,
} from "@/lib/schemas";
import { actionClient } from "./base";
import { hashPassword } from "@/lib/encrypt";
import { signIn, ErrorCode, AuthError } from "@/auth";
import * as queries from "@/server/db/queries";
import * as schemas from "@/lib/schemas";
import { revalidatePath } from "next/cache";

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
    const isExistEmail = await queries.isEmailExist(email);
    if (isExistEmail) {
      returnValidationErrors(RegistrationCredentialSchemas, {
        email: {
          _errors: ["Already exist email"],
        },
      });
    }
    // 2. check if username exist
    const isExistUsername = await queries.isUsernameExist(username);
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
    const newUser = await queries.createUser({
      isAdmin: true,
      name,
      email,
      username,
      password: passwordHashed,
    });

    return newUser;
    // if (newUser) {
    //   redirect(AUTH_LOGIN_ROUTE);
    // }
  });

//
export const getSalers = actionClient
  .schema(schemas.EmptyObjet)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getSalers();
  });

export const deleteSaler = actionClient
  .schema(schemas.IdObjectSchems)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteSaler(values);
    revalidatePath("/");
    return data;
  });

export const updateSaler = actionClient
  .schema(schemas.IdObjectSchems)
  .action(async ({ parsedInput: values }) => {
    console.log("update saler", values);
    revalidatePath("/");
  });
