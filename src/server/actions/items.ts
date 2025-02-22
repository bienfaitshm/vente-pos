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
  .action(async ({ parsedInput: { name, id } }) => {
    const data = await queries.updateCategory({
      id: id as number,
      name,
    });
    revalidatePath("/");
    return data;
  });

export const deleteCategory = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: { id } }) => {
    const data = await queries.deleteCategory({
      id: id as number,
    });
    revalidatePath("/");
    return data;
  });

//

export const getProducts = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getProducts();
  });

export const createProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createProduct({
      ...values,
      category: values.category as number,
    });
    revalidatePath("/");
    return data;
  });

export const updateProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: { id, category, name, price, quantity } }) => {
    const data = await queries.updateProduct({
      id: id as number,
      category: category as number,
      name,
      price,
      quantity,
    });
    revalidatePath("/");
    return data;
  });

export const deleteProduct = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: { id } }) => {
    const data = await queries.deleteProduct({
      id: id as number,
    });
    revalidatePath("/");
    return data;
  });

export const changeProductQuantity = actionClient
  .schema(ProductQuantitySchemas)
  .action(async ({ parsedInput: {} }) => {});
