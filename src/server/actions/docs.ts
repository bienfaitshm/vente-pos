"use server";

import { actionClient } from "./base";
import { z } from "zod";
import { generateInvoiceDocument } from "@/lib/documents/invoice";
import { getOrderWithDetails } from "@/server/db/queries/activities";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/formater";

/**
 * Generates an invoice document for a given order ID.
 *
 * This function retrieves the order details, formats the data into an invoice structure,
 * and generates a downloadable `.docx` file.
 *
 * @example
 * ```typescript
 * const result = await generateInvoice({ orderId: "12345" });
 * console.log(result.name); // e.g., "JohnDoe12345_12_03_2023_10_15_30.docx"
 * ```
 *
 * @returns An object containing the generated invoice data and the file name.
 */
export const generateInvoice = actionClient
  .schema(
    z.object({
      orderId: z.string().nonempty("Order ID cannot be empty."),
    })
  )
  .action(async ({ parsedInput: { orderId } }) => {
    // Fetch order details
    const order = await getOrderWithDetails(orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    // Prepare invoice data
    const invoiceData = {
      invoiceNumber: order.id || "No number number Provided",
      invoiceDate: format(order.createdAt||new Date(), "dd-MM-yyyy"),
      totalAmount: formatCurrency(order.totalAmount || 0),
      subTotalAmount: formatCurrency(order.totalAmount || 0),
      taxeAmount: formatCurrency(0),
      customer: {
        name: order.name || "Unknown Customer",
        address: order.address || "No Address Provided",
        email: order.email || "No Email Provided",
        phoneNumber: order.phoneNumber || "No Phone Number Provided",
      },
      items: order.orderDetails.map((orderDetail) => ({
        description: orderDetail.productName || "No Description",
        quantity: orderDetail.quantity,
        unitPrice: formatCurrency(orderDetail.unitPrice),
        totalPrice: formatCurrency(orderDetail.quantity * orderDetail.unitPrice),
      })),
    };

    // Generate the invoice document
    const invoiceBuffer = await generateInvoiceDocument(invoiceData);

    // Generate a file name for the invoice
    const fileName = `${order.name || "Customer"}_${order.id}_${format(
      order.createdAt || new Date(),
      "dd_MM_yyyy_HH_mm_ss"
    )}.docx`;

    return {
      data: invoiceBuffer,
      name: fileName,
    };
  });