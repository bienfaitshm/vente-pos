"use server";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "./base";
import { hashPassword } from "@/lib/encrypt";
import { signIn, ErrorCode, AuthError } from "@/auth";
import * as queries from "@/server/db/queries";
import * as schemas from "@/lib/schemas/accounts";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ValidatationErrors = { [key: string]: { _errors: string[] } };
type CreateUserReturn =
  | { isError: true; errors: ValidatationErrors }
  | { isError: false; user: { id: string } };

/**
 * Creates a new user with the provided details.
 *
 * @param {Object} params - The user details.
 * @param {string} params.name - The name of the user.
 * @param {string} params.username - The username of the user.
 * @param {string} params.password - The password of the user.
 * @param {string} [params.email] - The email of the user (optional).
 * @param {string} params.phoneNumber - The phone number of the user.
 * @param {"ADMIN" | "SELLER"} [params.role="ADMIN"] - The role of the user (default is "ADMIN").
 * @returns {Promise<CreateUserReturn>} A promise that resolves to an object indicating success or failure, and the created user or validation errors.
 *
 * @throws {Error} If there is an issue with the database queries.
 */
export async function createUser({
  name,
  password,
  phoneNumber,
  username,
  email,
  role = "ADMIN",
}: {
  name: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber: string;
  role: "ADMIN" | "SELLER";
}): Promise<CreateUserReturn> {
  const errors: ValidatationErrors = {};

  //1. check if email exist
  if (email) {
    const isExistEmail = await queries.isEmailExist(email);
    if (isExistEmail) {
      errors.email = {
        _errors: ["Already exist email"],
      };
    }
  }
  // 2. check if username exist
  const isExistUsername = await queries.isUsernameExist(username);
  if (isExistUsername) {
    errors.username = {
      _errors: ["Already exist username", "Please use an another username"],
    };
  }
  // 3. check if phoneNumber exist
  const isExistPhoneNumber = await queries.isPhoneNumberExist(username);
  if (isExistPhoneNumber) {
    errors.phoneNumber = {
      _errors: [
        "Already exist phoneNumber",
        "Please use an another phoneNumber",
      ],
    };
  }
  if (Object.keys(errors).length === 0) {
    const passwordHashed = await hashPassword(password);

    // 5. create new user
    const user = await queries.createUser({
      role,
      name,
      email,
      phoneNumber,
      username,
      password: passwordHashed,
    });

    return { isError: false, user };
  }

  return { isError: true, errors };
}

/**
 * Logs in a user using the provided credentials.
 *
 * @param {Object} parsedInput - The parsed input containing the username and password.
 * @param {string} parsedInput.username - The username of the user.
 * @param {string} parsedInput.password - The password of the user.
 * @returns {Promise<Object>} The response object containing the login response.
 * @throws {AuthError} Throws an authentication error if the login fails.
 *
 * @example
 * const response = await loginUser({
 *   parsedInput: {
 *     username: 'exampleUser',
 *     password: 'examplePassword'
 *   }
 * });
 * if (response) {
 *   console.log('Login successful:', response);
 * }
 */
export const loginUser = actionClient
  .schema(schemas.LoginCredentialSchemas)
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
        const errors: ValidatationErrors = {};
        if (e.code === ErrorCode.InvalidUsername) {
          errors.username = {
            _errors: ["ce compte n'existe pas"],
          };
        }
        if (e.code === ErrorCode.InvalidPassword) {
          errors.password = {
            _errors: ["mot de passe incorrect"],
          };
        }

        if (e.code === ErrorCode.InvalidCredentials) {
          errors.password = {
            _errors: ["informations d'identification incorrectes"],
          };
          errors.username = {
            _errors: ["informations d'identification incorrectes"],
          };
        }
        returnValidationErrors(schemas.LoginCredentialSchemas, errors);
      }
    }
  });

export const signinUser = actionClient
  .schema(schemas.RegistrationCredentialSchemas)
  .action(
    async ({
      parsedInput: { name, email, password, username, phoneNumber, role },
    }) => {
      const result = await createUser({
        name,
        email,
        password,
        username,
        phoneNumber,
        role,
      });
      if (!result.isError) {
        return result.user;
      }
      return returnValidationErrors(
        schemas.RegistrationCredentialSchemas,
        result.errors
      );
    }
  );

//
/**
 * Retrieves a list of sellers from the database.
 *
 * This function uses the `actionClient` to define an action that fetches sellers.
 * The action schema expects an empty object as input.
 *
 * @returns {Promise<any>} A promise that resolves to the list of sellers.
 */
export const getSellers = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {
    return await queries.getSellers();
  });

/**
 * Deletes a seller based on the provided ID.
 *
 * @remarks
 * This function uses the `actionClient` to define a schema and an action.
 * The schema requires an object with a non-empty string `id`.
 * The action asynchronously deletes the seller using the `queries.deleteSeller` method
 * and then revalidates the path to the root ("/").
 *
 * @param parsedInput - The input object containing the seller's ID.
 * @returns The result of the `queries.deleteSeller` function.
 */
export const deleteSeller = actionClient
  .schema(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteSeller(values);
    revalidatePath("/");
    return data;
  });

/**
 * Updates the details of a seller.
 *
 * @param {Object} parsedInput - The parsed input object.
 * @param {string} parsedInput.username - The username of the seller.
 * @param {string} parsedInput.name - The name of the seller.
 * @param {string} parsedInput.phoneNumber - The phone number of the seller.
 * @param {string} [parsedInput.email] - The email of the seller (optional).
 * @param {string} parsedInput.sellerId - The unique identifier of the seller.
 * @returns {Promise<Object>} The result of the update operation.
 *
 * @throws {ValidationErrors} If validation errors occur.
 *
 * @example
 * const result = await updateSaler({
 *   parsedInput: {
 *     username: "newUsername",
 *     name: "New Name",
 *     phoneNumber: "1234567890",
 *     email: "newemail@example.com",
 *     sellerId: "seller123"
 *   }
 * });
 */
export const updateSaler = actionClient
  .schema(
    z.object({
      username: z.string().nonempty(),
      name: z.string().nonempty(),
      phoneNumber: z.string().nonempty(),
      email: z.string().email().optional(),
      sellerId: z.string().nonempty(),
    })
  )
  .action(
    async ({
      parsedInput: { name, phoneNumber, sellerId, username, email },
    }) => {
      const errors: ValidatationErrors = {};
      const seller = await queries.getSeller(sellerId);
      // 1. check username
      if (username !== seller?.username) {
        const isExistUsername = await queries.isUsernameExist(username);
        if (isExistUsername) {
          errors.username = {
            _errors: [
              "Already exist username",
              "Please use an another username",
            ],
          };
        }
      }

      // 2. check phoneNumber
      if (phoneNumber !== seller?.phoneNumber) {
        const isExistphoneNumber = await queries.isPhoneNumberExist(
          phoneNumber
        );
        if (isExistphoneNumber) {
          errors.phoneNumber = {
            _errors: [
              "Already exist phone Number",
              "Please use an another phone Number",
            ],
          };
        }
      }

      // 3. check email

      if (email && email !== seller?.email) {
        const isExistEmail = await queries.isEmailExist(email);
        if (isExistEmail) {
          errors.email = {
            _errors: ["Already exist email", "Please use an another email"],
          };
        }
      }

      if (Object.keys(errors).length === 0) {
        // 4. update user
        const result = await queries.updateSeller({
          id: sellerId,
          name,
          phoneNumber,
          username,
          email,
        });
        revalidatePath("/");
        return result;
      } else {
        return returnValidationErrors(
          schemas.RegistrationCredentialSchemas,
          errors
        );
      }
    }
  );
