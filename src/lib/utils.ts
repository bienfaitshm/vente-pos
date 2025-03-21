import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and merges Tailwind CSS classes using `tailwind-merge`.
 * 
 * @param inputs - A list of class values to combine.
 * @returns A single string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

/**
 * Finds an item in an array by its `id` property.
 * 
 * @param items - The array of items to search.
 * @param id - The `id` to match.
 * @returns The item with the matching `id`, or `null` if not found.
 */
export function getById<T extends { id: number | string }>(
  items: T[],
  id?: number | string
): T | null {
  return items.find((item) => item.id.toString() === id?.toString()) ?? null;
}

/**
 * Calculates the subtotal of an array based on a predicate function.
 * 
 * @param items - The array of items to process.
 * @param predicate - A function that returns a numeric value for each item.
 * @returns The sum of all values returned by the predicate.
 */
export function calculateSubTotal<T>(
  items: T[],
  predicate: (value: T, index?: number, array?: T[]) => number
): number {
  return items.reduce((acc, item) => acc + predicate(item), 0);
}

/**
 * Triggers a download of a document file in the browser.
 * 
 * @param documentFile - An object containing the file data and name.
 */
export function downloadDocumentFile(documentFile: {
  data: Blob;
  name: string;
}): void {
  const url = URL.createObjectURL(documentFile.data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = documentFile.name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Converts a `Uint8Array` to a `Blob` object.
 * 
 * @param uint8Array - The byte array to convert.
 * @param contentType - The MIME type of the resulting `Blob`.
 * @returns A `Blob` object containing the byte array data.
 */
export function byteArrayToBlob(
  uint8Array: Uint8Array<ArrayBufferLike>,
  contentType: string
): Blob {
  return new Blob([uint8Array], { type: contentType });
}

/**
 * Copies a string to the clipboard.
 * 
 * @param text - The text to copy.
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error("Failed to copy text to clipboard:", err);
  });
}