import { z } from "zod";
import { NoEmptyStringSchemas } from "../schemas";

/**
 * Schema for validating password fields.
 */
export const PasswordSchemas = z.object({
  password: NoEmptyStringSchemas,
});

/**
 * Schema for validating username fields.
 */
export const UsernameSchemas = z.object({
  username: NoEmptyStringSchemas,
});

/**
 * Schema for validating user fields.
 */
export const UserSchemas = z
  .object({
    name: NoEmptyStringSchemas,
    email: z.string().email().optional(),
    image: z.string().url().optional(),
    phoneNumber: z.string().nonempty(),
    role: z.enum(["ADMIN", "SELLER"]).optional().default("ADMIN"),
  })
  .merge(UsernameSchemas);

/**
 * Type for User based on UserSchemas.
 */
export type User = z.infer<typeof UserSchemas>;

/**
 * Schema for validating login credentials.
 */
export const LoginCredentialSchemas = UsernameSchemas.merge(PasswordSchemas);

/**
 * Type for LoginCredential based on LoginCredentialSchemas.
 */
export type LoginCredential = z.infer<typeof LoginCredentialSchemas>;

/**
 * Schema for validating registration credentials.
 * Includes password confirmation and ensures passwords match.
 */
export const RegistrationCredentialSchemas = UserSchemas.merge(PasswordSchemas)
  .extend({ confirm: NoEmptyStringSchemas })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

/**
 * Type for RegistrationCredential based on RegistrationCredentialSchemas.
 */
export type RegistrationCredential = z.infer<
  typeof RegistrationCredentialSchemas
>;
