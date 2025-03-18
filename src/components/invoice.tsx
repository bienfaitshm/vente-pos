import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formater";

interface InvoiceProps {
  totalAmount: number;
  details: {
    id: string;
    productName: string | null;
    unitPrice: number;
    quantity: number;
  }[];
}
const Invoice: React.FC<InvoiceProps> = ({ details, totalAmount }) => {
  return (
    <div className="p-4 lg:p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="w-16 h-16 bg-gray-200 mb-2"></div>
            <h1 className="text-2xl font-semibold">Yummy foodyz</h1>
            <p className="text-sm text-gray-500">sale force</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold">INVOICE</h2>
            <p className="text-sm">Invoice no :</p>
            <p className="text-sm">Date : 01/01/2020</p>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Invoice To</h3>
            <p>Mr Bienfait shomari</p>
            <p>New york</p>
            <p>+243 973888289</p>
          </div>
          <div className="text-right">
            <p>Yummy foodyz sale force</p>
            <p>+243 388 289</p>
            <a href="https://vente-pos.vercel.app" className="text-blue-500">
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
                <TableCell>{detail.productName || detail.id}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(detail.unitPrice)}
                </TableCell>
                <TableCell className="text-right">{detail.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(detail.quantity * detail.unitPrice)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-4 text-right">
          <p>Sous Total</p>
          <div className="flex justify-end items-center">
            <p className="mr-2">Taxe</p>
            <p>0 FC</p>
          </div>
          <p className="font-semibold">Total : {totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
