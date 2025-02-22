export function formatCurrency(
  amount: number,
  currencyCode: string = "CDF", // Default to CDF
  locale: string = "fr-CD" // Use browser/system locale if undefined
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
