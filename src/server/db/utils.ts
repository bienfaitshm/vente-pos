/**
 * Calculates the amount from a given percentage of a price.
 *
 * @param pourcent - The percentage to calculate.
 * @param price - The price to apply the percentage to.
 * @returns The calculated amount, rounded to two decimal places.
 */
export function getAmountPercentage(pourcent: number, price: number): number {
  return parseFloat(((pourcent / 100) * price).toFixed(2));
}

export function calculateSubTotal<T>(
  items: T[],
  predicate: (value: T, index?: number, array?: T[]) => number
): number {
  return items.reduce((acc, item) => acc + predicate(item), 0);
}
