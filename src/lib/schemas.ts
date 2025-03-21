import { z } from "zod";

// Schemas
export const NoEmptyStringSchemas = z
  .string()
  .min(1, { message: "Ce Chant est requis" });
export const IDSchemas = NoEmptyStringSchemas;
export const EmptyObjet = z.object({});
export const IdObjectSchems = z.object({ id: IDSchemas });

export const UserSchemas = z.object({
  name: NoEmptyStringSchemas,
  username: NoEmptyStringSchemas,
  email: z.string().email().optional(),
  phoneNumber: z.string().nonempty(),
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
  .extend({ confirm: NoEmptyStringSchemas })
  .refine((schema) => schema.password === schema.confirm, {
    message: "mot de passe n'est pas le meme",
    path: ["confirm"],
  });

export type RegistrationCredential = z.infer<
  typeof RegistrationCredentialSchemas
>;

export const CategorySchemas = z.object({
  name: NoEmptyStringSchemas,
});

export type Category = z.infer<typeof CategorySchemas>;

export const ProductSchemas = z.object({
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
  name: NoEmptyStringSchemas,
  description: z.string().optional(),
  address: NoEmptyStringSchemas,
  phoneNumber: NoEmptyStringSchemas,
  statut: z.enum(["OPEN", "CLOSE", "RENOVATION"]),
});

export type PointOfSale = z.infer<typeof PointOfSaleSchemas>;

export const ClientSchemas = z.object({
  name: NoEmptyStringSchemas,
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export type Client = z.infer<typeof ClientSchemas>;

export const CommandItemSchemas = z.object({
  quantity: z.coerce.number().min(1),
  product: z.object({
    id: IDSchemas,
    name: NoEmptyStringSchemas,
    category: IDSchemas,
    price: z.coerce.number(),
    commission: z.coerce.number(),
  }),
});

export type CommandItem = z.infer<typeof CommandItemSchemas>;

export const InvoiceSchemas = z
  .object({
    client: ClientSchemas.merge(IdObjectSchems).nullable(),
    items: z
      .array(CommandItemSchemas)
      .min(1, { message: "Minimum de produit requis" })
      .superRefine((val, ctx) => {
        if (val.length !== new Set(val.map((item) => item.product?.id)).size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Produit dupliqué non autorisé.",
          });
        }
      }),
    saler: IDSchemas,
  })
  .refine((schema) => schema.client !== null, {
    message: "Veiller ajouter le client",
    path: ["client"],
  });

export type Invoice = z.infer<typeof InvoiceSchemas>;

export const ItemsSelectSchemas = z.object({
  items: z.array(CommandItemSchemas).min(1),
});

export type ItemsSelect = z.infer<typeof ItemsSelectSchemas>;
