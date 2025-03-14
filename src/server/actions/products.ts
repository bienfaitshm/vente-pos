"use server";
import * as schemas from "@/lib/schemas/products";

import { actionClient } from "./base";
import * as queries from "../db/queries";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getCategories = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {
    return await queries.getCategories();
  });

export const createCategory = actionClient
  .schema(schemas.CategorySchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createCategory(values);
    revalidatePath("/");
    return data;
  });

export const updateCategory = actionClient
  .schema(
    schemas.CategorySchemas.merge(
      z.object({
        id: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput }) => {
    const data = await queries.updateCategory(parsedInput);
    revalidatePath("/");
    return data;
  });

export const deleteCategory = actionClient
  .schema(z.object({ id: z.string().nonempty() }))
  .action(async ({ parsedInput }) => {
    const data = await queries.deleteCategory(parsedInput);
    revalidatePath("/");
    return data;
  });

// Products

export const getProducts = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {
    return await queries.getProducts();
  });

export const createProduct = actionClient
  .schema(schemas.ProductSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createProduct(values);
    revalidatePath("/");
    return data;
  });

export const updateProduct = actionClient
  .schema(
    schemas.ProductSchemas.merge(
      z.object({
        id: z.string().nonempty(),
      })
    )
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updateProduct(values);
    revalidatePath("/");
    return data;
  });

export const deleteProduct = actionClient
  .schema(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteProduct(values);
    revalidatePath("/");
    return data;
  });

// TODO: add functionnality
export const changeProductQuantity = actionClient
  .schema(z.object({}))
  .action(async ({ parsedInput: {} }) => {});
