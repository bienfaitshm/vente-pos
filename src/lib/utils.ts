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

export function calculateSubTotal<T>(
  items: T[],
  predicate: (value: T, index?: number, array?: T[]) => number
): number {
  return items.reduce((acc, item) => acc + predicate(item), 0);
}

export function downloadDocumentFile(documentFile: {
  data: Blob;
  name: string;
}) {
  const url = URL.createObjectURL(documentFile.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = documentFile.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function byteArrayToBlob(uint8Array: Uint8Array<ArrayBufferLike>, contentType: string) {
  return new Blob([uint8Array], { type: contentType });
}