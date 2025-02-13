"use server";
import { returnValidationErrors } from "next-safe-action";
import {
  CategorySchemas,
  ProductSchemas,
  ProductQuantitySchemas,
} from "@/lib/schemas";

import { actionClient } from "./base";
import {} from "../db/queries";

export const getCategorie = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: { name } }) => {});

export const createCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: { name } }) => {});

export const updateCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: { id, name } }) => {});

export const deleteCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: { id } }) => {});

//

export const getProducts = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: { name } }) => {});

export const createProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: { name } }) => {});

export const updateProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: { id, name } }) => {});

export const deleteProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: { id } }) => {});

export const changeProductQuantity = actionClient
  .schema(ProductQuantitySchemas)
  .action(async ({ parsedInput: {} }) => {});
