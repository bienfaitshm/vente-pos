import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale'; // Importez les paramètres régionaux français

export function getMonthNameWithDateFns(monthNumber: number): string | undefined {
  if (monthNumber >= 1 && monthNumber <= 12) {
    const date = parse(monthNumber.toString(), 'M', new Date()); // Crée une date à partir du numéro de mois
    return format(date, 'MMMM', { locale: fr }); // Formate la date en utilisant les paramètres régionaux français
  } else {
    return undefined;
  }
}

/**
 * Formats a given amount into a currency string based on the specified currency code and locale.
 *
 * @param amount - The numeric value to format as currency.
 * @param currencyCode - The ISO 4217 currency code (e.g., "USD", "EUR"). Defaults to "CDF".
 * @param locale - The locale string for formatting (e.g., "en-US", "fr-CD"). Defaults to "fr-CD".
 * @returns A formatted currency string.
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "CDF",
  locale: string = "fr-CD"
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });
    return formatter.format(amount);
  } catch (error: unknown) {
    console.warn("Currency formatting failed:", error);
    // Fallback to a simple string representation if formatting fails
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

/**
 * Returns a trimmed string value if provided, or a fallback value if the input is undefined or empty.
 *
 * @param input - The input string to process.
 * @param fallback - The fallback string to return if the input is undefined or empty. Defaults to "-".
 * @returns The trimmed input string or the fallback value.
 */
export function getDefaultStringValue(
  input?: string | null,
  fallback: string = "-"
): string {
  return input?.trim() || fallback;
}