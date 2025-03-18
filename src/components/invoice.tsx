import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyP } from "@/components/ui/typography";
import { formatCurrency } from "@/lib/formater";
import { format } from "date-fns";

interface InvoiceProps {
  order: {
    orderNumber: string;
    totalAmount?: number;
    taxeAmount?: number;
    subTotalAmount?: number;
    date: Date;
  };
  customer: {
    name: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
  };
  details: {
    id: string;
    productName: string | null;
    unitPrice: number;
    quantity: number;
  }[];
}
/**
 * Invoice component renders an invoice layout with customer, order, and product details.
 *
 * @component
 * @param {InvoiceProps} props - The props for the Invoice component.
 * @param {Object} props.customer - The customer information.
 * @param {string} props.customer.name - The name of the customer.
 * @param {string} [props.customer.address] - The address of the customer.
 * @param {string} [props.customer.phoneNumber] - The phone number of the customer.
 * @param {string} [props.customer.email] - The email address of the customer.
 * @param {Array<Object>} props.details - The list of order details.
 * @param {string} props.details[].id - The unique identifier for the product.
 * @param {string} [props.details[].productName] - The name of the product.
 * @param {number} props.details[].unitPrice - The unit price of the product.
 * @param {number} props.details[].quantity - The quantity of the product ordered.
 * @param {Object} props.order - The order information.
 * @param {string} props.order.orderNumber - The unique identifier for the order.
 * @param {Date} props.order.date - The date of the order.
 * @param {number} [props.order.subTotalAmount] - The subtotal amount of the order.
 * @param {number} [props.order.taxeAmount] - The tax amount applied to the order.
 * @param {number} [props.order.totalAmount] - The total amount of the order.
 *
 * @returns {JSX.Element} A JSX element representing the invoice layout.
 *
 * @example
 * ```tsx
 * const customer = {
 *   name: "John Doe",
 *   address: "123 Main St",
 *   phoneNumber: "123-456-7890",
 *   email: "johndoe@example.com"
 * };
 *
 * const details = [
 *   { id: "1", productName: "Product A", unitPrice: 10, quantity: 2 },
 *   { id: "2", productName: "Product B", unitPrice: 20, quantity: 1 }
 * ];
 *
 * const order = {
 *   orderNumber: "INV-001",
 *   date: new Date(),
 *   subTotalAmount: 40,
 *   taxeAmount: 4,
 *   totalAmount: 44
 * };
 *
 * <Invoice customer={customer} details={details} order={order} />;
 * ```
 */
const Invoice: React.FC<InvoiceProps> = ({ customer, details, order }) => {
  return (
    <div className="bg-white dark:bg-black/50 rounded-lg shadow-md w-full max-w-3xl p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="w-16 h-16 bg-gray-200 mb-2"></div>
          <h1 className="text-2xl font-semibold">Yummy foodyz</h1>
          <p className="text-sm text-gray-500">sale force</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold">INVOICE</h2>
          <p className="text-xs md:text-sm">Invoice no : {order.orderNumber}</p>
          <p className="text-xs md:text-sm">
            Date : {format(order.date, "dd/MM/yyyy")}
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Invoice To</h3>
          <p className="text-xs md:text-sm">Mr/Mme {customer.name}</p>
          <p className="text-xs md:text-sm">{customer?.address}</p>
          <p className="text-xs md:text-sm">{customer?.phoneNumber}</p>
          <p className="text-xs md:text-sm">{customer?.email}</p>
        </div>
        <div className="text-right">
          <p>Yummy foodyz sale force</p>
          <p className="text-xs md:text-sm">+243 388 289</p>
          <a
            href="https://vente-pos.vercel.app"
            className="text-blue-500 text-xs md:text-sm"
          >
            https://vente-pos.vercel.app
          </a>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descriptions</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="text-right">Quantité</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {details.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell className="text-xs md:text-sm">
                {detail.productName || detail.id}
              </TableCell>
              <TableCell className="text-right text-xs md:text-sm">
                {formatCurrency(detail.unitPrice)}
              </TableCell>
              <TableCell className="text-right text-xs md:text-sm">
                {detail.quantity}
              </TableCell>
              <TableCell className="text-right text-xs md:text-sm">
                {formatCurrency(detail.quantity * detail.unitPrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-right text-xs md:text-sm">
        <TypographyP>
          Sous Total : {formatCurrency(order.subTotalAmount || 0)}
        </TypographyP>
        <TypographyP className="mr-2">
          Taxe: {formatCurrency(order.taxeAmount || 0)}
        </TypographyP>
        <TypographyP className="font-semibold">
          Total : {formatCurrency(order.totalAmount || 0)}
        </TypographyP>
      </div>
    </div>
  );
};

export default Invoice;
