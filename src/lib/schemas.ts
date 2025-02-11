import { z } from "zod";
export const NoEmptyStringSchemas = z
  .string()
  .min(1, { message: "Ce Chant est requis" });
export const IDSchemas = z.union([NoEmptyStringSchemas.trim(), z.number()]);

export const UserSchemas = z.object({
  id: IDSchemas.optional(),
  username: NoEmptyStringSchemas,
  email: z.string().email(),
  password: NoEmptyStringSchemas,
  isAdmin: z.boolean().optional(),
});

export const LoginCredentialSchemas = z.object({
  username: NoEmptyStringSchemas,
  password: NoEmptyStringSchemas.min(6, {
    message: "Le mot de passe doit containir plus de 6 caracteres",
  }),
});

export const RegistrationCredentialSchemas = UserSchemas.merge(
  LoginCredentialSchemas
)
  .extend({
    confirm: NoEmptyStringSchemas,
  })
  .refine((schema) => !(schema.password !== schema.confirm), {
    message: "mot de passe n'est pas le meme",
    path: ["confirm"],
  });
