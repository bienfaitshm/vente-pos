import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getById<T extends { id: number | string }>(
  items: T[],
  id?: number | string
): T | null {
  return items.find((item) => item.id.toString() === id?.toString()) ?? null;
}

export function sumSubTotal<T>(
  items: T[],
  predicate: (value: T, index?: number, array?: T[]) => number
): number {
  return items.reduce((acc, item) => acc + predicate(item), 0);
}
