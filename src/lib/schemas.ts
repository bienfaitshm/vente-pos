import { z } from "zod";
export const NoEmptyStringSchemas = z
  .string()
  .min(1, { message: "Ce Chant est requis" });
export const IDSchemas = z.union([NoEmptyStringSchemas.trim(), z.number()]);
export const EmptyObjet = z.object({});
export const IdObjectSchems = z.object({
  id: IDSchemas,
});

export const UserSchemas = z.object({
  id: IDSchemas.optional(),
  name: NoEmptyStringSchemas,
  username: NoEmptyStringSchemas,
  email: z.string().email(),
  image: z.string().url().optional(),
  password: NoEmptyStringSchemas,
  isAdmin: z.boolean().optional(),
});

export type User = z.infer<typeof UserSchemas>;

export const LoginCredentialSchemas = z.object({
  username: NoEmptyStringSchemas,
  password: NoEmptyStringSchemas.min(6, {
    message: "Le mot de passe doit containir plus de 6 caracteres",
  }),
});
export type LoginCredential = z.infer<typeof LoginCredentialSchemas>;

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

export type RegistrationCredential = z.infer<
  typeof RegistrationCredentialSchemas
>;

export const CategorySchemas = z.object({
  id: IDSchemas.optional(),
  name: NoEmptyStringSchemas,
});

export type Category = z.infer<typeof CategorySchemas>;

export const ProductSchemas = z.object({
  id: IDSchemas.optional(),
  name: NoEmptyStringSchemas,
  category: IDSchemas,
  quantity: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
});

export type Product = z.infer<typeof ProductSchemas>;

export const ProductQuantitySchemas = z.object({
  product: ProductSchemas,
  quantity: z.coerce.number().min(0),
  reason: NoEmptyStringSchemas.optional(),
});

export type ProductQuantity = z.infer<typeof ProductQuantitySchemas>;

export const PointOfSaleSchemas = z.object({
  id: IDSchemas.optional(),
  name: NoEmptyStringSchemas,
  description: z.string().optional(),
  address: NoEmptyStringSchemas,
  phoneNumber: NoEmptyStringSchemas,
  statut: z.enum(["OPEN", "CLOSE", "RENOVATION"]),
});
