export function formatCurrency(
  amount: number,
  currencyCode: string = "USD", // Default to USD
  locale?: string // Use browser/system locale if undefined
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });
    return formatter.format(amount);
  } catch (error: unknown) {
    // Fallback to a simple string representation if formatting fails
    console.warn(error);
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}
