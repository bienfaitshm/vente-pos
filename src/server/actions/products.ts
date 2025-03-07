"use server";
// import { returnValidationErrors } from "next-safe-action";
import {
  CategorySchemas,
  ProductSchemas,
  ProductQuantitySchemas,
  EmptyObjet,
  IdObjectSchems,
  PointOfSaleSchemas,
  ClientSchemas,
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
  .schema(CategorySchemas.merge(IdObjectSchems))
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createCategory(values);
    revalidatePath("/");
    return data;
  });

export const updateCategory = actionClient
  .schema(CategorySchemas.merge(IdObjectSchems))
  .action(async ({ parsedInput }) => {
    const data = await queries.updateCategory(parsedInput);
    revalidatePath("/");
    return data;
  });

export const deleteCategory = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput }) => {
    const data = await queries.deleteCategory(parsedInput);
    revalidatePath("/");
    return data;
  });

// Products

export const getProducts = actionClient
  .schema(EmptyObjet)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getProducts();
  });

export const createProduct = actionClient
  .schema(ProductSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createProduct(values);
    revalidatePath("/");
    return data;
  });

export const updateProduct = actionClient
  .schema(ProductSchemas.merge(IdObjectSchems))
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updateProduct(values);
    revalidatePath("/");
    return data;
  });

export const deleteProduct = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteProduct(values);
    revalidatePath("/");
    return data;
  });

// TODO: add functionnality
export const changeProductQuantity = actionClient
  .schema(ProductQuantitySchemas)
  .action(async ({ parsedInput: {} }) => {});

// Point of sales

export const getPointOfSales = actionClient
  .schema(EmptyObjet)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getPointOfSales();
  });

export const createPointOfSale = actionClient
  .schema(PointOfSaleSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createPointOfSale(values);
    revalidatePath("/");
    return data;
  });

export const updatePointOfSale = actionClient
  .schema(PointOfSaleSchemas.merge(IdObjectSchems))
  .action(async ({ parsedInput: values }) => {
    const data = await queries.updatePointOfSale(values);
    revalidatePath("/");
    return data;
  });

export const deletePointOfSale = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deletePointOfSale(values);
    revalidatePath("/");
    return data;
  });

// Client
export const getClients = actionClient
  .schema(EmptyObjet)
  .action(async ({ parsedInput: {} }) => {
    return await queries.getClients();
  });

export const createClient = actionClient
  .schema(ClientSchemas)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.createClient(values);
    revalidatePath("/");
    return data;
  });

export const updateClient = actionClient
  .schema(ClientSchemas.merge(IdObjectSchems))
  .action(async ({ parsedInput: { address, phoneNumber, ...values } }) => {
    const data = await queries.updateClient({
      ...values,
      address: address || "",
      phoneNumber: phoneNumber || "",
    });
    revalidatePath("/");
    return data;
  });

export const deleteClient = actionClient
  .schema(IdObjectSchems)
  .action(async ({ parsedInput: values }) => {
    const data = await queries.deleteClient(values);
    revalidatePath("/");
    return data;
  });
