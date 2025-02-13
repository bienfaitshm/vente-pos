"use server";
// import { returnValidationErrors } from "next-safe-action";
import {
  CategorySchemas,
  ProductSchemas,
  ProductQuantitySchemas,
} from "@/lib/schemas";

import { actionClient } from "./base";
import {} from "../db/queries";

export const getCategorie = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: {} }) => {});

export const createCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: {} }) => {});

export const updateCategory = actionClient
  .schema(CategorySchemas)
  .action(async ({ parsedInput: {} }) => {});

export const deleteCategory = actionClient
  .schema(CategorySchemas)
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
