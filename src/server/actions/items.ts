"use server";
// import { returnValidationErrors } from "next-safe-action";
import {
  CategorySchemas,
  ProductSchemas,
  ProductQuantitySchemas,
  EmptyObjet,
  IdObjectSchems,
} from "@/lib/schemas";

import { actionClient } from "./base";
import * as queries from "../db/queries";
import { revalidatePath } from "next/cache";

export const getCategories = actionClient
  .schema(EmptyObjet)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getCategories();
  });

export const createCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createCategory(values);
    revalidatePath("/");
    return data;
  });

export const updateCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: {} }) => {});

export const deleteCategory = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: {} }) => {});

//

export const getProducts = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: {} }) => {});

export const createProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: {} }) => {});

export const updateProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: {} }) => {});

export const deleteProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: {} }) => {});

export const changeProductQuantity = actionClient
  .schema(ProductQuantitySchemas)
  .action(async ({ parsedInput: {} }) => {});
